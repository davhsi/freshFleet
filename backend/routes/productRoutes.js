const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/id/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/vendor/:vendorId', productController.getProductsByVendor);
router.get('/name/:name', productController.getProductDetailsByName);

module.exports = router;
