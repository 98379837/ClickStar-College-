import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

router.put("/update", verifyToken, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $set: {
      specialization: req.body.specialization,
      pricing: req.body.pricing,
      experience: req.body.experience
    }
  });
  res.json({ message: "Profile updated" });
});

router.post("/availability", verifyToken, async (req, res) => {
  const { dates } = req.body; // array of YYYY-MM-DD
  await User.findByIdAndUpdate(req.user.id, { availability: dates });
  res.json({ message: "Availability set" });
});

router.get("/:id/availability", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user.availability || []);
});


export default router;
