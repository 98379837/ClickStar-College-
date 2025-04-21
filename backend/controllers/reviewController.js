import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const { photographerId, rating, comment } = req.body;
  const review = new Review({ customerId: req.user.id, photographerId, rating, comment });
  await review.save();
  res.json({ message: "Review submitted" });
};

export const getReviews = async (req, res) => {
  const reviews = await Review.find({ photographerId: req.params.photographerId });
  res.json(reviews);
};
