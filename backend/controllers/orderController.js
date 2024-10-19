const Order = require('../models/Order');
const Cart = require('../models/Cart'); // Assuming you have a Cart model

// Create a new order from cart details
exports.createOrder = async (req, res) => {
  const { customerId, items, totalAmount } = req.body;

  try {
    // Create a new order entry
    const newOrder = new Order({
      customerId,
      items,
      totalAmount,
    });

    await newOrder.save();

    // Clear the cart after placing an order
    await Cart.findOneAndDelete({ customerId });

    res.status(201).json({
      message: 'Order placed successfully!',
      order: newOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      message: 'Error placing order',
      error: error.message
    });
  }
};

// Fetch all orders for a specific customer
exports.getOrdersByCustomerId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ customerId: userId }).populate('items.product');

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this customer' });
    }

    res.status(200).json({
      message: 'Orders retrieved successfully',
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      message: 'Error fetching orders',
      error: error.message
    });
  }
};
