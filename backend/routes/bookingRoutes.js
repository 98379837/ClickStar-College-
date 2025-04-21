import express from "express";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { updateBookingStatus, getAllBookings, updateStatus } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", verifyToken, createBooking);
router.get("/my", verifyToken, getUserBookings);
router.put("/update/:id", verifyToken, updateBookingStatus);
router.get("/all", verifyToken, getAllBookings);
router.put("/status/:id", verifyToken, updateStatus);


export default router;
