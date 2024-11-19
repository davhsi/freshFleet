const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const { userId, productId, orderId, rating, comment } = req.body;

    const newReview = new Review({
      userId,
      productId,
      orderId,
      rating,
      comment,
    });
    await newReview.save();

    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedReview)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    res.status(200).json({ success: true, review: updatedReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.fetchReviews = async (req, res) => {
    try {
      const { productId } = req.params;
      console.log("Fetching reviews for product ID:", productId); // Debug log
  
      const reviews = await Review.find({ productId }).populate("userId", "name");
  
      res.status(200).json({ success: true, reviews });
    } catch (error) {
      console.error("Error fetching reviews:", error.message); // Log the error
      res.status(500).json({ success: false, error: error.message });
    }
  };
  