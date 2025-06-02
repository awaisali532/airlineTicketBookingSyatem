import mongoose from "mongoose";
import passengerSchema from "./Passenger.js";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  bookingDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  passengers: [passengerSchema],
  totalAmount: { type: Number, required: true },
});

export default mongoose.model("Booking", bookingSchema);
