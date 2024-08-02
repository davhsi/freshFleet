const Product = require('../models/Product');

// Middleware to verify vendor
const verifyVendor = (req, res, next) => {
  if (req.user && req.user.role === 'vendor') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Only vendors can perform this action.' });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { productName, description, netWeight, price, nutritionFacts } = req.body;
    if (!req.user || !req.user.name) {
      return res.status(403).json({ message: 'Access denied: Only vendors can perform this action.' });
    }
    const vendorName = req.user.name; // Assuming the vendor's name is stored in the user object

    const newProduct = new Product({
      productName,
      description,
      netWeight,
      price,
      nutritionFacts,
      vendorName,
      createdAt: Date.now()
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products (for displaying in the customer page)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products by vendor (optional)
const getProductsByVendor = async (req, res) => {
  try {
    const vendorName = req.user.name;
    const products = await Product.find({ vendorName });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  verifyVendor,
  addProduct,
  getAllProducts,
  getProductsByVendor
};
