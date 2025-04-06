import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./FlightDetails.css";
import bgImage from "../../assets/img/flightDetails/ethad.jpg";
import { FaPlaneDeparture } from "react-icons/fa";

const FlightDetails = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    // Navigate to the booking details page and pass the image URL
    navigate("/booking-details", { state: { image: bgImage } });
  };

  return (
    <div className="booking-list-item mb-3">
      <div className="booking-list-item-inner container mt-3 mb-3">
        <div className="booking-list-top d-flex align-items-start flex-wrap">
          <div className="flight-airway">
            <div className="flight-logo">
              <img src={bgImage} alt="Etihad Airway Logo" className="logo" />
              <h5 className="title">Etihad Airway</h5>
            </div>
            <span>Operated by Emirates</span>
          </div>
          <ul className="flight-info">
            <li>
              Thursday, <span>Jun 16</span>
            </li>
            <li className="time">
              <span>12: 55</span> DAC
            </li>
            <li>
              22h <span>2 Stops</span>
            </li>
          </ul>
          <div className="flight-price">
            <h4 className="title">US$ 1,056.40</h4>
            <button onClick={handleClick} className="btn custom_btn">
              Select <FaPlaneDeparture className="plane-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
