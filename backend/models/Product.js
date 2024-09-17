const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['ingredients'] },
  totalQuantityWeight: { type: Number, required: true },
  pricePerKg: { type: Number, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
