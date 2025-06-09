const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "successful"],
    default: "pending",
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
