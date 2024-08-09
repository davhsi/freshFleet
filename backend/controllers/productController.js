const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    try {
      console.log(req.body);
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).send({ message: 'Product added successfully!' });
    } catch (error) {
      console.error('Failed to add product:', error.message);  // Log the error message
      res.status(500).send({ message: 'Failed to add product', error: error.message });
    }
  };
  