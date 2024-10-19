const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/orders', orderController.createOrder);

// Get order history for a specific customer
router.get('/orders/:userId', orderController.getOrdersByCustomerId);

module.exports = router;
