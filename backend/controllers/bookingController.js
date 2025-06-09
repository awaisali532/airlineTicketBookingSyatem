import Booking from "../models/Booking.js";

// ✅ Create a new booking
export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    console.log("Incoming booking data:", req.body);

    await newBooking.save();
    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    console.error("❌ Booking creation failed:", error); // <-- Add this
    res.status(500).json({ success: false, message: "Booking failed", error });
  }
};

// ✅ Get all bookings for a user
export const getBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ userId }).populate("flightId");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings", error });
  }
};


// ✅ Get booking by ID (for payment page etc.)
export const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findById(bookingId).populate("flightId");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ success: false, message: "Failed to fetch booking", error });
  }
};
