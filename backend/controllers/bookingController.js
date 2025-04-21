import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { photographerId, date, eventType } = req.body;
    const newBooking = new Booking({
      userId: req.user.id,
      photographerId,
      date,
      eventType
    });
    await newBooking.save();
    res.status(200).json({ message: "Booking created" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate("photographerId", "username");
  res.json(bookings);
};

export const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    await Booking.findByIdAndUpdate(id, { status });
    res.json({ message: "Booking status updated" });
  };
  
  export const getAllBookings = async (req, res) => {
    const bookings = await Booking.find().populate("userId photographerId", "username");
    res.json(bookings);
  };
  
  export const updateStatus = async (req, res) => {
    const { status } = req.body; // "accepted" or "rejected"
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
  
    booking.status = status;
    await booking.save();
    res.json({ message: "Status updated" });
  };