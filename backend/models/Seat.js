import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    enum: ["economy", "business", "first"],
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Seat = mongoose.model("Seat", seatSchema);
export default Seat;
