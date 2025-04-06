import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BookingContent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Bookingcontent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="tab-content-wrap bg-white p-4">
      <form className="booking-form-horizontal">
        <div className="row g-0 align-items-center">
          {/* From */}
          <div className="col">
            <div className="form-grp">
              <label>From</label>
              <input type="text" placeholder="City or Airport" />
            </div>
          </div>

          {/* To with exchange icon */}
          <div className="col position-relative">
            <div className="form-grp">
              <label>To</label>
              <input
                type="text"
                placeholder="City or Airport"
                className="position-relative"
                style={{ zIndex: 1 }}
              />
              <button type="button" className="exchange-icon">
                <i className="bi bi-arrow-left-right"></i>
              </button>
            </div>
          </div>

          {/* Trip Type */}
          <div className="col">
            <div className="form-grp">
              <label>Trip</label>
              <select className="w-100 bg-transparent border-0">
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
              <label>Depart</label>
              <DatePicker
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
              <label>Return</label>
              <DatePicker
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
              <label>Passenger/Class</label>
              <input type="text" placeholder="1 Passenger, Economy" />
            </div>
          </div>
        </div>
      </form>
      <div className="booking-footer">
        <a href="#" className="promo-code">
          + Add Promo Code
        </a>
        <Link to={"/flightdetails"} className="custom_btn ">
          Show Flights <i className="bi bi-airplane ms-1"></i>
        </Link>
      </div>
    </div>
  );
};

export default Bookingcontent;
