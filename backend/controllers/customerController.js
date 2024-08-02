const Customer = require('../models/Customer');

exports.signup = async (req, res) => {
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
};

exports.signin = async (req, res) => {
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
};
