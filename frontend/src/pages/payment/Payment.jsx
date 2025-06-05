import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../payment/Payment.css";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const { bookingId } = useParams(); // ✅ route param
  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const [amount, setAmount] = useState(0);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/bookings/${bookingId}`);
        const booking = res.data.data;
        setAmount(booking.totalAmount);
        setUserId(booking.userId);
      } catch (err) {
        console.error("Failed to fetch booking:", err);
        setMessage("Invalid booking ID or server error");
        navigate("/");
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/payments/create", {
        ...formData,
        bookingId,
        userId,
        amount,
      });

      setMessage(res.data.message);
    toast.success(res.data.message || "Payment successful");

    // Redirect after short delay (e.g. 2 seconds)
    setTimeout(() => {
      navigate("/");
    }, 2000);

  } catch (err) {
    const errorMsg = err.response?.data?.message || "Payment failed";
    setMessage(errorMsg);
    toast.error(errorMsg);
  }

  };

  return (
    <div className="payment-container">
      <h2>Make Your Payment</h2>
      <p className="amount-info">Amount to Pay: <strong>Rs. {amount}</strong></p>
      <form className="payment-form" onSubmit={handleSubmit}>
        <input name="accountHolderName" placeholder="Account Holder Name" onChange={handleChange} required />
        <input name="bankName" placeholder="Bank Name" onChange={handleChange} required />
        <input name="accountNumber" placeholder="Account Number" onChange={handleChange} required />
        <input name="ifscCode" placeholder="IFSC Code" onChange={handleChange} required />
        <button type="submit">Submit Payment</button>
      </form>
      {message && <p className="status">{message}</p>}
    </div>
  );
};

export default PaymentPage;
