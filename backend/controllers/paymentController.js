import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
export const createPayment = async (req, res) => {
  try {
        console.log("Incoming payment request:", req.body); // Add this

    const { bookingId, userId, amount, accountNumber, bankName } = req.body;

    // Manual validation
    if (!accountNumber || accountNumber.length < 10) {
      return res.status(400).json({ message: "Invalid account number" });
    }
    if (!bankName || bankName.length < 3) {
      return res.status(400).json({ message: "Invalid bank name" });
    }

    const payment = new Payment({
      bookingId,
      userId,
      amount,
      accountNumber,
      bankName,
    });


        // ✅ Safe way to update booking
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    booking.paymentStatus = "paid";
    await booking.save();
    await payment.save();


    res.status(200).json({ message: "Payment recorded", payment });
  } catch (err) {
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
};
