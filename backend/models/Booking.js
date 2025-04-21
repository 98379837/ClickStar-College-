import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photographerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  eventType: String,
  status: { type: String, default: "pending" }
});

export default mongoose.model("Booking", bookingSchema);
