import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/bookingArea/BookedTickets.css"; // You’ll create this for styling

const BookedTickets = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/bookings/user/${userId}`);
      console.log("API se data:", res.data); // ✅ YEH LINE ADD KARO
      setBookings(res.data.bookings); // isko adjust karenge agle step me
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };


    if (userId) fetchBookings();
  }, [userId]);

  return (
    <div className="ticket-list">
      {bookings.map((booking) =>
        booking.passengers.map((passenger, index) => (
          <div key={index} className="ticket-card">
            <div className="ticket-info">
              <h3>{passenger.name}</h3>
              <p><strong>Flight:</strong> {booking.flightId}</p>
              <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p><strong>Seat:</strong> {passenger.seatNumber}</p>
            </div>
            <div
              className={`ticket-status ${
                booking.paymentStatus === "paid" ? "paid" : "unpaid"
              }`}
            >
              {booking.paymentStatus.toUpperCase()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookedTickets;
