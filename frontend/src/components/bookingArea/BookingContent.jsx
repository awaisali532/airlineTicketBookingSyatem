import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingContent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom"; // 🟡 Added for navigation

const Bookingcontent = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [trip, setTrip] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [suggestions, setSuggestions] = useState([]); // To store suggestions
  const [activeField, setActiveField] = useState(""); // Track the active field
  const [cityList, setCityList] = useState([]);

  //Fetch data of cities from the backend
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/flight/cities`); // Fetch available cities
        setCityList(res.data); // set available cities
      } catch (err) {
        console.error("Failed to load cities:", err);
      }
    };

    fetchCities();
  }, []);

  const navigate = useNavigate(); // 🟡 Added for navigation

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    setActiveField("from");

    const filtered = cityList.filter((city) =>
      city.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    setActiveField("to");

    const filtered = cityList.filter((city) =>
      city.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelect = (value, field) => {
    if (field === "from") {
      setFrom(value);
    } else if (field === "to") {
      setTo(value);
    }

    // Clear suggestions and close the suggestion box
    setSuggestions([]);
    setActiveField(""); // Reset active field after selection
  };

  const isFormValid = () => {
    return from.trim() && to.trim() && trip && startDate && endDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill out all fields before proceeding.");
      return;
    }

    const bookingData = {
      from,
      to,
      trip,
      startDate,
      endDate,
      // promoCode,
    };

    console.log("Form Submitted:", bookingData);

    // 🟡 Use navigate to pass the booking data to flightdetails page
    navigate("/flightdetails", { state: { bookingData } }); // Pass data using state
  };

  const handleExchange = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="tab-content-wrap bg-white p-4">
      <form className="booking-form-horizontal" onSubmit={handleSubmit}>
        <div className="row g-0 align-items-center">
          {/* From */}
          <div className="col">
            <div className="form-grp">
              <label htmlFor="from">From</label>
              <input
                type="text"
                id="from"
                name="from"
                placeholder="City or Airport"
                value={from}
                onChange={handleFromChange}
              />
              {activeField === "from" && suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(suggestion, "from")}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* To with exchange icon */}
          <div className="col position-relative">
            <div className="form-grp">
              <label htmlFor="to">To</label>
              <input
                type="text"
                id="to"
                name="to"
                placeholder="City or Airport"
                value={to}
                onChange={handleToChange}
                className="position-relative"
                style={{ zIndex: 1 }}
              />
              {activeField === "to" && suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(suggestion, "to")}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                className="exchange-icon"
                aria-label="Exchange Locations"
                onClick={handleExchange}
              >
                <i className="bi bi-arrow-left-right"></i>
              </button>
            </div>
          </div>
          {/* Trip Type */}
          <div className="col">
            <div className="form-grp">
              <label htmlFor="trip">Trip</label>
              <select
                id="trip"
                name="trip"
                className="w-100 bg-transparent "
                value={trip}
                onChange={(e) => setTrip(e.target.value)}
              >
                <option value="">Tour type</option>
                <option>Adventure Travel</option>
                <option>Family Tours</option>
                <option>Newest Item</option>
                <option>Nature & wildlife</option>
              </select>
            </div>
          </div>
          {/* Depart Date */}
          <div className="col">
            <div className="form-grp">
              <label htmlFor="depart">Depart</label>
              <DatePicker
                id="depart"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-100 bg-transparent"
                dateFormat="MM/dd/yyyy"
                minDate={new Date()} // restrict to today or future
              />
            </div>
          </div>
          {/* Return Date
          <div className="col">
            <div className="form-grp">
              <label htmlFor="return">Return</label>
              <DatePicker
                id="return"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                className="w-100 bg-transparent"
                dateFormat="MM/dd/yyyy"
              />
            </div>
          </div> */}
        </div>

        {/* Submit Button */}
        <div className="booking-footer mt-3 d-flex justify-content-end align-items-center">
          <a href="#" className="promo-code">
            + Add Promo code
          </a>

          {/* Submit button */}
          <button
            type="submit"
            className="custom_btn"
            disabled={!isFormValid()}
            style={{
              opacity: isFormValid() ? 1 : 0.5,
              cursor: isFormValid() ? "pointer" : "not-allowed",
            }}
          >
            Show Flights <i className="bi bi-airplane ms-1"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Bookingcontent;
