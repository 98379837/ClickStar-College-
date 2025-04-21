import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { location, specialization, price, rating } = req.query;

  const filter = { role: "photographer" };
  if (location) filter.location = { $regex: location, $options: "i" };
  if (specialization) filter.specialization = { $regex: specialization, $options: "i" };
  if (price) filter.pricing = { $lte: parseInt(price) };
  if (rating) filter.averageRating = { $gte: parseFloat(rating) };

  const result = await User.find(filter);
  res.json(result);
});

export default router;
