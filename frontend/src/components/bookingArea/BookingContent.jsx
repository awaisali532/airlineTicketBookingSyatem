import React, { useState, useEffect } from "react";
import "./BookingContent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Bookingcontent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <div className="tab-content-wrap bg-white">
        <div className="content-top">
          <ul>
            <li>Flights</li>
            <li>
              <span>Just from $12</span>Geair Stopover
            </li>
          </ul>
        </div>

        {/* bOOKING fORM */}
        <form action="#" className="booking-form">
          <ul className="col-lg-12">
            <li>
              <div className="form-grp">
                <input type="text" placeholder="From" />
              </div>
            </li>
            <li>
              <div className="form-grp">
                <input type="text" placeholder="To" />
                <button className="exchange-icon">
                  <i className="bi bi-arrow-left-right"></i>
                </button>
              </div>
            </li>
            <li>
              <div className="form-grp select">
                <label htmlFor="shortBy">Trip</label>
                <select
                  id="shortBy"
                  name="select"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="">Tour type</option>
                  <option>Adventure Travel</option>
                  <option>Family Tours</option>
                  <option>Newest Item</option>
                  <option>Nature &amp; wildlife</option>
                </select>
              </div>
            </li>
            <li>
              <div className="form-grp date">
                <ul>
                  <li>
                    <label htmlFor="shortBy">Depart</label>
                    <DatePicker
                      className="data"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="yyyy-MM-dd"
                      onKeyDown={(e) => e.preventDefault()} // Prevent manual typing
                      
                    />
                  </li>
                  <li>
                    <label htmlFor="shortBy">Return</label>
                    <DatePicker
                      className="data"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="yyyy-MM-dd"
                      onKeyDown={(e) => e.preventDefault()} // Prevent manual typing
                      minDate={startDate} // End date cannot be before start date
                    />
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="form-grp economy position-relative">
                <label htmlFor="text" className="ms-0 ">Passenger/ className</label>
                <input
                  type="text"
                  id="text"
                  placeholder="1 Passenger, Economy"
                />
              </div>
            </li>
          </ul>
        </form>
        <div className="content-bottom">
          <a href="booking-details.html" className="promo-code">
            + Add Promo code
          </a>
          <a href="booking-details.html" className="btn btn-lg custom_btn">
            Show Flights <i class="bi bi-airplane"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bookingcontent;
