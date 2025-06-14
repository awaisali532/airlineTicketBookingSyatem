import express from "express";
import {
  createBooking,
  getBookingById,
  getBookingsByUser,
} from "../controllers/bookingController.js";

const router = express.Router();

// ✅ POST: Create a new booking
router.post("/create", createBooking);

// ✅ GET: Get all bookings by user ID
router.get("/user/:userId", getBookingsByUser);
router.get("/:bookingId", getBookingById)
export default router;
