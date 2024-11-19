const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: false },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
