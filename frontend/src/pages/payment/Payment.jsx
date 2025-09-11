import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchAmount = async () => {
      const res = await fetch(
        `http://localhost:4000/api/bookings/${bookingId}`
      );
      const data = await res.json();
      setAmount(data.data.totalAmount);
    };
    if (bookingId) fetchAmount();
  }, [bookingId]);

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <PayPalButtons
        createOrder={async () => {
          const res = await fetch(
            "http://localhost:4000/api/paypal/create-order",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ totalAmount: amount }),
            }
          );
          const order = await res.json();
          return order.id;
        }}
        onApprove={async (data) => {
          const res = await fetch(
            "http://localhost:4000/api/paypal/capture-order",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID }),
            }
          );
          const paymentDetails = await res.json();

          // Update booking
          await fetch(
            `http://localhost:4000/api/bookings/update-payment-status/${bookingId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentStatus: "paid" }),
            }
          );

          alert("Payment successful!");
          setTimeout(() => {
            navigate("/payment-success"); // redirect to success page
          }, 2000);
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          alert("Payment failed!");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Payment;
