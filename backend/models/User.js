import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['client', 'photographer'], default: 'client' }
});

export default mongoose.model("User", userSchema);
