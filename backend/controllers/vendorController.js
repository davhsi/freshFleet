const Vendor = require('../models/Vendor');

exports.signup = async (req, res) => {
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
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(404).json({ message: 'Email does not exist' });
    }
    if (vendor.password !== password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    res.status(200).json({ message: 'Vendor signed in successfully', vendorId: vendor._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

