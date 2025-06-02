import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔵 Import this at the top
import "../passengersCount/PassengersCount.css"; // optional custom CSS for a bit more style
import { useLocation, Navigate } from "react-router-dom"; // 🔵 Import this at the top
import { useAuth } from "../../context/UserContext";

const PassengerForm = () => {
  const { state } = useLocation(); // Get the data passed from the previous page
  const { flight } = state || {}; // Get the flight data (from FlightDetails)
  const [passengerType, setPassengerType] = useState("adult");
  const [passengerCount, setPassengerCount] = useState(0);
  const [counts, setCounts] = useState({
    adult: 1,
    child: 0,
    disabled: 0,
  });
  const { isLogin, loading } = useAuth(); // ✅ get auth status
  const navigate = useNavigate();
  if (loading) return <div>Loading...</div>;
  if (!isLogin) return <Navigate to="/login" replace />;
  const handleAddPassenger = () => {
    if (passengerCount > 0) {
      setCounts((prev) => ({
        ...prev,
        [passengerType]: prev[passengerType] + Number(passengerCount),
      }));
      setPassengerCount(0);
    }
  };
  const handleNext = () => {
    navigate("/select-seats", {
      state: {
        passengers: counts,
        total: counts.adult + counts.child + counts.disabled,
        flight: flight, // Pass the flight data as well
      },
    });
  };
  return (
    <div className="container py-5">
      <div className="header-box text-white text-center py-3 rounded mb-4">
        <h2 className="m-0 heading-h2 ">Add Passengers</h2>
      </div>

      <div className="row g-3 align-items-end mb-4">
        <div className="col-md-4">
          <label className="form-label">Select Passenger Type</label>
          <select
            className="form-select"
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Enter Number</label>
          <input
            type="number"
            min="0"
            className="form-control"
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <button className="btn custom_btn w-100" onClick={handleAddPassenger}>
            Add
          </button>
        </div>
      </div>

      <div className="passenger-summary p-4 rounded shadow-sm bg-light">
        <h5 className="mb-3">Passenger Summary</h5>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between">
            <span>Adult</span>
            <span>x {counts.adult}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Child</span>
            <span>x {counts.child}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Disabled</span>
            <span>x {counts.disabled}</span>
          </li>
        </ul>
        <div className="mt-3 fw-bold text-end">
          Total Passengers: {counts.adult + counts.child + counts.disabled}
        </div>
        <div className="text-end mt-3">
          <button className="btn custom_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
