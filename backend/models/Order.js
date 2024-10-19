const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  pricePerKg: {
    type: Number,
    required: true
  }
});

const orderSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  items: [orderItemSchema], // Array of ordered items
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically add timestamp when the order is created
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
