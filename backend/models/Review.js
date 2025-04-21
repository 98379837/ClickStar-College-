import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photographerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  comment: String
});

export default mongoose.model("Review", reviewSchema);
