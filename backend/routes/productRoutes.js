const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyVendor } = productController;

router.post('/add',productController.addProduct);
router.get('/products', productController.getAllProducts);


module.exports = router;
