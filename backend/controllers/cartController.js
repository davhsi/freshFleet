const Cart = require('../models/Cart'); // Assuming you have a Cart model
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// controllers/cartController.js

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, product } = req.body;
    if (!userId || !product) {
      return res.status(400).json({ message: 'User ID and product are required' });
    }

    // Find customer and product
    const customer = await Customer.findById(userId);
    const productData = await Product.findById(product._id).populate('vendorId');

    if (!customer || !productData) {
      return res.status(404).json({ message: 'User or Product not found' });
    }

    // Prepare the cart item
    const cartItem = {
      product: productData._id,
      quantity: product.quantity,
      pricePerKg: product.pricePerKg,
      vendorId: productData.vendorId,
    };

    // Add product to cart
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $push: { items: cartItem } },
      { new: true, upsert: true }
    );

    return res.status(200).json({ message: 'Product added to cart', cart: updatedCart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const cart = await Cart.findOne({ userId })
      .populate('items.product', 'name pricePerKg')
      .populate('items.vendorId', 'name');
    
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update Cart Item Quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    
    const item = cart.items.find(item => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      return res.status(200).json({ message: "Cart item updated", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Remove Item from Cart
exports.removeCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    if (!userId || !itemId) {
      return res.status(400).json({ message: 'User ID and item ID are required' });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    if (!updatedCart) return res.status(404).json({ message: 'Item not found in cart' });

    res.json({ message: 'Item removed from cart', cart: updatedCart });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );

    if (!updatedCart) return res.status(404).json({ message: 'Cart not found' });

    res.json({ message: 'Cart cleared', cart: updatedCart });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
