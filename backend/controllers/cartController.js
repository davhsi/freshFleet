
// Add item to cart
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
exports.addToCart = async (req, res) => {
  const { userId, product } = req.body;

  if (!userId || !product || !product.productId || !product.quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if the product exists
    const foundProduct = await Product.findById(product.productId);
    if (!foundProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Find or create the cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ ...product, name: foundProduct.name, pricePerKg: foundProduct.pricePerKg, vendorName: foundProduct.vendorId.name }] });
    } else {
      // Check if the product is already in the cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === product.productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += product.quantity;
      } else {
        cart.items.push({ ...product, name: foundProduct.name, pricePerKg: foundProduct.pricePerKg, vendorName: foundProduct.vendorId.name });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ error: 'Error adding item to cart' });
  }
};


// Get cart items for a user
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const formattedItems = cart.items.map(item => {
      const product = item.productId || {};
      return {
        name: product.name || 'Unknown',
        pricePerKg: product.pricePerKg || 'N/A',
        vendorName: product.vendorId ? product.vendorId.name : 'Unknown',
        quantity: item.quantity || 0
      };
    });

    res.status(200).json({ items: formattedItems });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the product by productId
    cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Error removing item from cart' });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate({ userId: req.params.userId }, { items: [] }, { new: true });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Error clearing cart' });
  }
};
