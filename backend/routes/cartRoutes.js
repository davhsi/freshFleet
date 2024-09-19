// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add product to cart
router.post('/add', cartController.addToCart);

// Get user's cart
router.get('/:userId', cartController.getCart);

// Update item quantity in cart
router.put('/:userId/update/:productId', cartController.updateCartItem);


// Remove an item from cart
router.delete('/:userId/remove/:itemId', cartController.removeCartItem);

// Clear the cart
router.delete('/:userId/clear', cartController.clearCart);

module.exports = router;
