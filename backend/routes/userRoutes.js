import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.put("/update", verifyToken, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, req.body);
  res.json({ message: "Profile updated" });
});

export default router;
