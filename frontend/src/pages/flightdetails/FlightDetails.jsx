import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import flightData from "../../data/Flightdetails"; // Import the flight data
import "./FlightDetails.css";
import { FaPlaneDeparture } from "react-icons/fa";

const FlightDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get the booking data from previous page
  const { bookingData } = state || {}; // Destructure the booking data

  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    // Set the flight data from the imported JSON
    setFlights(flightData);
  }, []);

  useEffect(() => {
    if (bookingData) {
      const { from, to, startDate } = bookingData;

      // Filter flights based on the "from", "to", and "startDate" from the booking data
      const filtered = flights.filter((flight) => {
        const flightDate = new Date(flight.departureTime).toDateString();
        const selectedDate = new Date(startDate).toDateString();

        return (
          flight.departureCity.toLowerCase() === from.toLowerCase() &&
          flight.arrivalCity.toLowerCase() === to.toLowerCase() &&
          flightDate === selectedDate
        );
      });

      setFilteredFlights(filtered); // Update filtered flights
    }
  }, [bookingData, flights]); // Run the effect when bookingData or flights changes

  const handleClick = (id) => {
    const flight = filteredFlights.find((flight) => flight.id === id);
    if (flight) {
      // Navigate to the Passenger Count Page with the selected flight data
      navigate("/passenger-count", { state: { flight } });
    }
  };

  return (
    <div className="container">
      {/* Check if there are any filtered flights */}
      {filteredFlights.length > 0 ? (
        filteredFlights.map((flight) => (
          <div className="booking-list-item mb-3" key={flight.id}>
            <div className="booking-list-item-inner container mt-3 mb-3">
              <div className="booking-list-top d-flex align-items-start flex-wrap">
                <div className="flight-airway">
                  <div className="flight-logo">
                    <img
                      src={flight.logo}
                      alt={`${flight.airline} Logo`}
                      className="logo"
                    />
                    <h5 className="title">{flight.airline}</h5>
                  </div>
                  <span>Operated by {flight.airline}</span>
                </div>

                <div className="flight-info">
                  <ul className="d-flex flex-wrap">
                    <li>
                      {new Date(flight.departureTime).toLocaleString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </li>
                    <li className="time">
                      <span>
                        {new Date(flight.departureTime).toLocaleTimeString()}
                      </span>{" "}
                      DAC
                    </li>
                    <li>
                      {flight.duration} <span>{flight.stops} Stops</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <span className="departure">{flight.departureCity}</span>
                      <FaPlaneDeparture className="plane-icon" />
                      <span className="arrival">{flight.arrivalCity}</span>
                    </li>
                  </ul>
                </div>

                <div className="flight-price">
                  <h4 className="title">US$ {flight.price.adult.toFixed(2)}</h4>
                  <button
                    onClick={() => handleClick(flight.id)}
                    className="btn custom_btn"
                  >
                    Select <FaPlaneDeparture className="plane-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No flights available based on your selected criteria.</p> // Display message if no flights match the criteria
      )}
    </div>
  );
};

export default FlightDetails;
