import React from "react";
import "./FlightDetails.css";
import { Button } from "react-bootstrap";
import { FaPlaneDeparture } from "react-icons/fa";
import img1 from "../../assets/img/flightDetails/ethad.jpg";
export default function FlightDetails() {
  return (
    <div className="container flight-card p-3 mb-3 shadow-sm">
      <div className="row align-items-center">
        {/* Airline Logo & Name */}
        <div className="col-md-3 col-12 d-flex align-items-center">
          <img src={img1} alt="Etihad" className="airline-logo me-3 bg-body" />
          <div>
            <h6 className="m-0 fw-bold">Etihad Airways</h6>
            <small className="text-muted">Operated by Emirates</small>
          </div>
        </div>

        {/* Flight Date */}
        <div className="col-md-2 col-6 text-center mt-2 mt-md-0">
          <div className="fw-bold">Thursday, Jun 16</div>
        </div>

        {/* Departure Time & Location */}
        <div className="col-md-2 col-6 text-center mt-2 mt-md-0">
          <div className="fw-bold time">12:55</div>
          <div className="text-muted">DAC</div>
        </div>

        {/* Flight Duration & Stops */}
        <div className="col-md-2 col-6 text-center mt-2 mt-md-0">
          <div>22h</div>
          <div className="text-muted">2 Stops</div>
        </div>

        {/* Price & Select Button */}
        <div className="col-md-3 col-12 text-center mt-2 mt-md-0 price-section">
          <div className="fw-bold text-danger">US$ 1,056.40</div>
          <Button variant="warning" className="mt-2">
            Select <FaPlaneDeparture />
          </Button>
          <div>
            <small className="text-muted">
              Price per person (incl. taxes & fees)
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
