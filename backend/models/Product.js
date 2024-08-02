const mongoose = require('mongoose');

const vitaminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const nutritionFactsSchema = new mongoose.Schema({
  carbs: { type: Number, required: true },
  protein: { type: Number, required: true },
  vitamins: [vitaminSchema]
});

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  netWeight: { type: Number, required: true },
  price: { type: Number, required: true },
  nutritionFacts: { type: nutritionFactsSchema, required: true },
  vendorName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
