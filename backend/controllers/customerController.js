const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendResetPasswordEmail = require('../config/emailConfig');

// Customer signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({ name, email, password: hashedPassword });
    await customer.save();
    
    res.status(201).json({ 
      message: 'Customer created successfully', 
      customerName: customer.name, 
      customerId: customer._id 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Customer signin
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: 'Email does not exist' });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      message: 'Customer signed in successfully', 
      token,  // Return token to the client for future authenticated requests
      customerName: customer.name, 
      customerId: customer._id 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Forget Password
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Create a token valid for 1 hour
    const token = jwt.sign({ userId: customer._id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the reset password email
    await sendResetPasswordEmail(email, token);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;  // Make sure these are coming from the request

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const customer = await Customer.findById(decoded.userId);
    if (!customer) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    // Validate new password length (optional)
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Hash the new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    customer.password = hashedPassword;
    await customer.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Invalid or expired token' });
  }
};

