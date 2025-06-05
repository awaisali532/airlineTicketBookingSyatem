import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // <-- install if needed
import "../selectSeats/SelectSeats.css";

const SeatSelection = () => {
  const { state } = useLocation();
  const flight = state?.flight;
  const passengers = state?.passengers;
  const totalPassengerCount = state?.total;
  const [selectedClass, setSelectedClass] = useState("economy");
  const [seatsData, setSeatsData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/seats/${flight.airline}`
        );
        setSeatsData(res.data); // Backend se aayi sari seats
      } catch (err) {
        console.error("Error fetching seat data:", err);
      }
    };

    if (flight?.airline) {
      fetchSeats();
    }
  }, [flight]);

  if (!flight || !passengers || !totalPassengerCount) {
    return <p>Error: Missing flight or passenger data.</p>;
  }

  const seats = seatsData.filter((seat) => seat.class === selectedClass);

  const handleSeatClick = (seat) => {
    if (
      !seat.isAvailable ||
      selectedSeats.some((s) => s.seatNumber === seat.seatNumber) ||
      lockedSeats.includes(seat.seatNumber)
    ) {
      return;
    }

    if (selectedSeats.length < totalPassengerCount) {
      setSelectedSeats([
        ...selectedSeats,
        { seatNumber: seat.seatNumber, classType: seat.class },
      ]);
      setLockedSeats([...lockedSeats, seat.seatNumber]);
    }
  };

  const handleNextPage = () => {
    if (selectedSeats.length < totalPassengerCount) {
      alert(`Please select ${totalPassengerCount} seat(s).`);
      return;
    }

    navigate("/booking-details", {
      state: { selectedSeats, passengers, flight },
    });
  };

  return (
    <div className="container">
      <h2 className="header-box heading-h2">Select Seats</h2>
      <div className="seat-selection-container py-4">
        <h5 className="text-muted mb-4 flight-airline">{flight.airline}</h5>

        <div className="mb-3 seat-class-buttons">
          {["economy", "business", "first"].map((cls) => (
            <button
              key={cls}
              className={`btn class-btn ${cls}-btn ${
                selectedClass === cls ? "active" : ""
              }`}
              onClick={() => setSelectedClass(cls)}
            >
              {cls.charAt(0).toUpperCase() + cls.slice(1)}
            </button>
          ))}
        </div>

        <div
          className="seat-grid d-flex flex-wrap"
          style={{ maxWidth: "800px" }}
        >
          {seats.length > 0 ? (
            seats.map((seat) => {
              const isSelected = selectedSeats.some(
                (s) => s.seatNumber === seat.seatNumber
              );
              const isDisabled = lockedSeats.includes(seat.seatNumber);
              return (
                <div
                  key={seat._id}
                  className={`seat border m-2 p-3 text-center seat-item
                    ${seat.isAvailable ? "available" : "unavailable"}
                    ${isSelected ? "selected" : ""}
                    ${isDisabled ? "disabled" : ""}
                  `}
                  style={{
                    width: "70px",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.5 : 1,
                    border: isSelected ? "3px solid #007bff" : "1px solid #ccc",
                  }}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.seatNumber}
                </div>
              );
            })
          ) : (
            <p>No seats available for the selected class.</p>
          )}
        </div>

        {/* Selected seats list */}
        <div className="mt-4">
          <h5>Selected Seats:</h5>
          {selectedSeats.length > 0 ? (
            <ul className="list-group">
              {selectedSeats.map((seat) => (
                <li
                  key={seat.seatNumber}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  Seat {seat.seatNumber} ({seat.classType})
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      setSelectedSeats(
                        selectedSeats.filter(
                          (s) => s.seatNumber !== seat.seatNumber
                        )
                      );
                      setLockedSeats(
                        lockedSeats.filter((s) => s !== seat.seatNumber)
                      );
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No seats selected yet.</p>
          )}
        </div>

        <div className="mt-4">
          <button className="btn btn-primary" onClick={handleNextPage}>
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
