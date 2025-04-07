import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import flightData from "../../data/Flightdetails"; // Import the flight data
import "./FlightDetails.css";
import { FaPlaneDeparture } from "react-icons/fa";

const FlightDetails = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    setFlights(flightData); // Set the flight data from the JSON
  }, []);

  const handleClick = (id) => {
    const flight = flights.find((flight) => flight.id === id);
    if (flight) {
      navigate("/booking-details", { state: { flight } });
    }
  };

  return (
    <div className="container">
      {flights.map((flight) => (
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
                  <li>
                    <span className="departure">{flight.departureCity}</span>
                    <FaPlaneDeparture className="plane-icon" />
                    <span className="arrival">{flight.arrivalCity}</span>
                  </li>
                </ul>
              </div>

              <div className="flight-price">
                <h4 className="title">US$ {flight.price.toFixed(2)}</h4>
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
      ))}
    </div>
  );
};

export default FlightDetails;
