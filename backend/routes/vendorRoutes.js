const express = require('express');
const vendorController = require('../controllers/vendorController');
const router = express.Router();


router.post('/signup', vendorController.signup);
router.post('/signin', vendorController.signin);
router.delete('/products/:id', vendorController.deleteProduct); // Route for deleting a product

module.exports = router;
