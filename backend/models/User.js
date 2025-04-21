import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['client', 'photographer'], default: 'client' },
  availability: [String],
  location: String,
  specialization: String,
  pricing: Number,
  experience: Number,
  averageRating: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
