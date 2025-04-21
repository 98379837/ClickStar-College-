import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:photographerId", getReviews);

export default router;
