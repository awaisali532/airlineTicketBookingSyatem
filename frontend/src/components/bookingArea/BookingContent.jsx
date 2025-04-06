import React, { useState } from "react";
import "./BookingContent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
const Bookingcontent = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [trip, setTrip] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [passenger, setPassenger] = useState("");
  const [promoCode, setPromoCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      from,
      to,
      trip,
      startDate,
      endDate,
      passenger,
      promoCode,
    };

    console.log("Form Submitted:", bookingData);

    // TODO: Send to backend via fetch/axios
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
                onChange={(e) => setFrom(e.target.value)}
              />
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
                onChange={(e) => setTo(e.target.value)}
                className="position-relative"
                style={{ zIndex: 1 }}
              />
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
                className="w-100 bg-transparent border-0"
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
              />
            </div>
          </div>

          {/* Return Date */}
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
          </div>

          {/* Passenger/Class */}
          <div className="col">
            <div className="form-grp no-border">
              <label htmlFor="passenger">Passenger/Class</label>
              <input
                type="text"
                id="passenger"
                name="passenger"
                placeholder="1 Passenger, Economy"
                value={passenger}
                onChange={(e) => setPassenger(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
      {/* Promo Code & Submit Button */}
      <div className="booking-footer  mt-3 ">
        <a href="booking-details.html" class="promo-code">
          + Add Promo code
        </a>
        <Link to={"/flightdetails"} className="custom_btn">
          Show Flights <i className="bi bi-airplane ms-1"></i>
        </Link>
      </div>
    </div>
  );
};

export default Bookingcontent;
