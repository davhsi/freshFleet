const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = Vendor;
