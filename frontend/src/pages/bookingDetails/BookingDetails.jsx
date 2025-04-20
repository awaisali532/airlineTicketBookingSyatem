import React, { useState } from "react";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";
import { useLocation } from "react-router-dom";
import "./BookingDetails.css";
import bank_img from "../../assets/img/payment/bank.png";
import jazzcash_img from "../../assets/img/payment/jazzcash.png";
import easypesa_img from "../../assets/img/payment/easypesa.png";
import paypal_img from "../../assets/img/payment/Paypal.png";

const BookingDetails = () => {
  const { state } = useLocation();
  const flight = state.flight;
  const passengers = state.passengers; // Make sure to include this line
  const [selectedGender, setSelectedGender] = useState("male");

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  const tax = 35;
  const discount = 10;

  const passengerTypes = Object.entries(passengers);

  const fareDetails = passengerTypes.map(([type, count]) => {
    const unitPrice = flight.price[type] || 0;
    const total = count * unitPrice;
    return { type, count, unitPrice, total };
  });

  const totalBaseFare = fareDetails.reduce((sum, f) => sum + f.total, 0);
  const taxPerPassenger = 35;
  const totalTax =
    taxPerPassenger * passengerTypes.reduce((sum, [, count]) => sum + count, 0);
  const totalAirfare = totalBaseFare + totalTax;
  const totalPayable = totalAirfare - discount;

  return (
    <div>
      <SimpleHeader />
      <section className="customer-details-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="customer-details-content">
                <div className="icon">
                  <img
                    src={flight.logo}
                    alt={`${flight.airline} Logo`}
                    className="logo"
                  />
                </div>
                <div className="content">
                  <h2 className="title">
                    Customer Details: Please fill in with valid information.
                  </h2>
                  <div className="customer-progress-wrap">
                    <div className="progress">
                      <div
                        className="progress-bar w-50"
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="customer-progress-step">
                      <ul>
                        <li>
                          <span>1</span>
                          <p>Guest Information</p>
                        </li>
                        <li>
                          <span>2</span>
                          <p>Payment</p>
                        </li>
                        <li>
                          <span>3</span>
                          <p>Confirmation</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="booking-details-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-73">
              {Array.from(
                {
                  length:
                    passengers.adult + passengers.child + passengers.disabled,
                },
                (_, index) => (
                  <div key={index} className="mb-4">
                    <div className="primary-contact">
                      <i className="bi bi-person"></i>
                      <h2 className="title">Passenger {index + 1}:</h2>
                    </div>
                    <div className="booking-details-wrap">
                      <form action="#">
                        <div className="form-grp select-form">
                          <div className="icon">
                            <i className="bi bi-person-plus"></i>
                          </div>
                          <div className="form">
                            <label htmlFor="shortBy">
                              Select Travellers from your Favourties List
                            </label>
                            <select
                              id="shortBy"
                              name="select"
                              className="form-select"
                            >
                              <option value="">Select One..</option>
                              <option>Select Two..</option>
                              <option>Select Three..</option>
                              <option>Select Four..</option>
                              <option>Select Five..</option>
                            </select>
                          </div>
                        </div>
                        <ul>
                          <li>
                            <div className="form-grp">
                              <div className="icon">
                                <i className="bi bi-person-fill"></i>
                              </div>
                              <div className="form">
                                <select
                                  id="title"
                                  name="select"
                                  className="form-select"
                                >
                                  <option value="">Mr.</option>
                                  <option>Mrs.</option>
                                  <option>Others..</option>
                                </select>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="form-grp">
                              <input type="text" placeholder="Give Name" />
                            </div>
                          </li>
                          <li>
                            <div className="form-grp">
                              <input type="text" placeholder="Sur Name *" />
                            </div>
                          </li>
                        </ul>
                        <div className="gender-select">
                          <h2 className="title">Select Your Gender*</h2>
                          <ul>
                            <li
                              className={
                                selectedGender === "male" ? "active" : ""
                              }
                              onClick={() => handleGenderClick("male")}
                            >
                              <i className="bi bi-gender-male"></i> Male
                            </li>
                            <li
                              className={
                                selectedGender === "female" ? "active" : ""
                              }
                              onClick={() => handleGenderClick("female")}
                            >
                              <i className="bi bi-gender-female"></i> Female
                            </li>
                          </ul>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-grp">
                              <div className="icon">
                                <i className="bi bi-globe"></i>
                              </div>
                              <div className="form">
                                <label htmlFor="nationality">Nationality</label>
                                <select
                                  id="nationality"
                                  name="select"
                                  className="form-select"
                                >
                                  <option value="">Bangladesh</option>
                                  <option>United States</option>
                                  <option>Dubai</option>
                                  <option>Saudi Arabia</option>
                                  <option>Australia</option>
                                  <option>South Africa</option>
                                  <option>Pakistan</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-grp">
                              <div className="icon">
                                <i className="bi bi-telephone-outbound"></i>
                              </div>
                              <div className="form">
                                <input
                                  type="number"
                                  placeholder="Mobile Number *"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-grp">
                              <div className="icon">
                                <i className="bi bi-calendar3"></i>
                              </div>
                              <div className="form">
                                <label htmlFor="shortBy">Date of Birth</label>
                                <input
                                  type="text"
                                  className="date"
                                  placeholder="Select Date"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-grp">
                              <div className="icon">
                                <i className="bi bi-house"></i>
                              </div>
                              <div className="form">
                                <input type="text" placeholder="Post Code *" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-grp">
                              <div className="icon">
                                <i className="bi bi-envelope-at"></i>
                              </div>
                              <div className="form">
                                <label htmlFor="email">Your Email</label>
                                <input
                                  type="email"
                                  id="email"
                                  placeholder="youinfo@gmail.com"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-grp">
                              <div className="icon">
                                <i className="bi bi-star-fill text-warning"></i>
                              </div>
                              <div className="form">
                                <input
                                  type="text"
                                  placeholder="FlyerNumber :  98265"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="optional-item">
                          <div className="form-grp">
                            <div className="form">
                              <select
                                id="optional"
                                name="select"
                                className="form-select"
                              >
                                <option value="">
                                  Select meal type ( optional )
                                </option>
                                <option>Select meal type ( optional )</option>
                                <option>Select meal type ( optional )</option>
                                <option>Select meal type ( optional )</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-grp">
                            <div className="form">
                              <select
                                id="optionalTwo"
                                name="select"
                                className="form-select"
                              >
                                <option value="">
                                  Request wheelchair ( optional )
                                </option>
                                <option>Request wheelchair ( optional )</option>
                                <option>Select meal type ( optional )</option>
                                <option>Select meal type ( optional )</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-grp checkbox-grp">
                          <input type="checkbox" id="checkbox" />
                          <label htmlFor="checkbox">
                            Add this person to passenger quick pick list
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="col-27">
              <aside className="booking-sidebar">
                <h2 className="main-title">Booking Info</h2>
                <div className="widget">
                  <ul className="flight-info">
                    <li>
                      <img
                        src={flight.logo}
                        alt={`${flight.airline} Logo`}
                        className="logo"
                      />
                      <p>
                        {new Date(flight.departureTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {flight.fly}
                        <span>{flight.departureCity}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        {new Date(flight.arrivalTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        {flight.arive}
                        <span>{flight.arrivalCity}</span>
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="widget">
                  <h2 className="widget-title heading-h2">
                    Select Discount Option
                  </h2>
                  <form action="#" className="discount-form">
                    <i className="bi bi-tag"></i>
                    <input type="text" placeholder="Enter Code" />
                    <button type="submit">
                      <i className="bi bi-check-circle-fill"></i>
                    </button>
                  </form>
                </div>

                <div className="widget">
                  <h2 className="widget-title heading-h2">
                    Your Preferred Bank
                  </h2>
                  <ul className="preferred-bank-wrap">
                    <li>
                      <a href="#">
                        <img src={bank_img} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={jazzcash_img} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={easypesa_img} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={paypal_img} alt="" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="widget">
                  <h2 className="widget-title heading-h2">
                    Your price summary
                  </h2>
                  <div className="price-summary-top">
                    <ul>
                      <li>Details</li>
                      <li>Amount</li>
                    </ul>
                  </div>
                  <div className="price-summary-detail">
                    <ul>
                      {fareDetails.map(({ type, count, unitPrice, total }) => (
                        <li key={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)} x{" "}
                          {count}
                          <span>${total.toFixed(2)}</span>
                        </li>
                      ))}
                      <li>
                        Tax x{" "}
                        {passengerTypes.reduce((sum, [, c]) => sum + c, 0)}
                        <span>${totalTax.toFixed(2)}</span>
                      </li>
                      <li>
                        Total Airfare: <span>${totalAirfare.toFixed(2)}</span>
                      </li>
                      <li>
                        Discount: <span>${discount.toFixed(2)}</span>
                      </li>
                      <li>
                        Total Payable<span>${totalPayable.toFixed(2)}</span>
                      </li>
                    </ul>
                    <a href="#" className="btn">
                      Pay now
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingDetails;
