const bcrypt = require('bcrypt');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const sendResetPasswordEmail = require('../config/emailConfig');

// Vendor signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = new Vendor({ name, email, password: hashedPassword });
    await vendor.save();

    res.status(201).json({ message: 'Vendor created successfully' });
  } catch (err) {
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

    // Generate token
    const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      message: 'Vendor signed in successfully', 
      token,  // Return the token to the client
      vendorId: vendor._id,
      vendorName: vendor.name
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
      res.status(500).json({ message: 'Error deleting product' });
  }
};

// Forget Password
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const token = jwt.sign({ userId: vendor._id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await sendResetPasswordEmail(email, token);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const vendor = await Vendor.findById(decoded.userId);
    if (!vendor) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    vendor.password = hashedPassword;
    await vendor.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Invalid or expired token' });
  }
};
