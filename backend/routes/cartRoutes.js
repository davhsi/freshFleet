const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to add item to cart
router.post('/add', cartController.addToCart);

// Route to get cart items
router.get('/:userId', cartController.getCart);

// Route to remove an item from the cart
router.post('/remove', cartController.removeFromCart);

// Route to clear the cart
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
