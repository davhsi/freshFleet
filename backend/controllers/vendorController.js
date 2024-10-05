const bcrypt = require('bcrypt');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product'); // Make sure to import your Product model

// Vendor signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log('Received signup request:', { name, email, password });

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      console.log('Email already exists');
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = new Vendor({ name, email, password: hashedPassword });
    await vendor.save();

    console.log('Vendor created successfully');
    res.status(201).json({ message: 'Vendor created successfully' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: err.message });
  }
};


// Vendor signin
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(404).json({ message: 'Email does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    console.log('Vendor found:', vendor);  // Debugging: Check if vendor object is correctly retrieved
    console.log('Vendor name:', vendor.name);  // Debugging: Check if vendor name is accessible

    res.status(200).json({ 
      message: 'Vendor signed in successfully', 
      vendorId: vendor._id,
      vendorName: vendor.name  // Ensure this field is returned
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Function to delete a product
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;  // Extract product ID from request params

  try {
      const product = await Product.findByIdAndDelete(productId); // Find and delete the product

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ message: 'Error deleting product' });
  }
};
