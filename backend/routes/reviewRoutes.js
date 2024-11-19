const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.addReview);
router.put("/:reviewId", reviewController.updateReview);
router.delete("/:reviewId", reviewController.deleteReview);
router.get("/:productId", reviewController.fetchReviews);


module.exports = router;
