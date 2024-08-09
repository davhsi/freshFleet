const mongoose = require('mongoose');

const vitaminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  netWeight: { type: Number, required: true },
  nutrients: {
    calories: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fiber: { type: Number, required: true },
    protein: { type: Number, required: true },
    vitamins: [vitaminSchema],
  },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }, 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
