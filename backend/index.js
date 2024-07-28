const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 
const Customer = require('./models/Customer');
const Vendor = require('./models/Vendor');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas:', err));

// Customer Sign Up
app.post('/api/customer/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const customer = new Customer({ name, email, password });
    await customer.save();
    res.status(201).json({ message: 'Customer created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Vendor Sign Up
app.post('/api/vendor/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const vendor = new Vendor({ name, email, password });
    await vendor.save();
    res.status(201).json({ message: 'Vendor created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Customer Sign In
app.post('/api/customer/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: 'Email does not exist' });
    }
    if (customer.password !== password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    res.status(200).json({ message: 'Customer signed in successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Vendor Sign In
app.post('/api/vendor/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(404).json({ message: 'Email does not exist' });
    }
    if (vendor.password !== password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    res.status(200).json({ message: 'Vendor signed in successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
