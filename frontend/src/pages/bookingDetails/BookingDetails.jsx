import React, { useState, useEffect } from "react";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingDetails.css";
import bank_img from "../../assets/img/payment/bank.png";
import jazzcash_img from "../../assets/img/payment/jazzcash.png";
import easypesa_img from "../../assets/img/payment/easypesa.png";
import paypal_img from "../../assets/img/payment/Paypal.png";
import axios from "axios";

import { useAuth } from "../../context/UserContext"; // Adjust the import path as necessary
const BookingDetails = () => {
  const { userdata, loading } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const flight = state.flight;
  // console.log(state);
  const [selectedGender, setSelectedGender] = useState("");
  const passengers = state.passengers; // Make sure to include this line
  const selectedSeats = state.selectedSeats || [];
  const totalPassengers = Object.values(passengers).reduce(
    (sum, count) => sum + count,
    0
  );
  const [paymentMethod, setPaymentMethod] = useState("pay-now");
  const [passengerData, setPassengerData] = useState(() =>
    Array.from({ length: totalPassengers }, (_, index) => ({
      title: "",
      name: "",
      gender: "",
      nationality: "",
      mobileNumber: "",
      dateOfBirth: "",
      postalCode: "",
      email: "",
      mealType: "",
      seatNumber: selectedSeats[index]?.seatNumber || "",
      classType: selectedSeats[index]?.classType || "economy",
    }))
  );
  const handleTitleAndGenderChange = (index, title) => {
    const gender =
      title === "Mr"
        ? "Male"
        : title === "Mrs" || title === "Miss"
        ? "Female"
        : "";

    const updatedPassengerData = [...passengerData];
    updatedPassengerData[index].title = title;
    updatedPassengerData[index].gender = gender;
    setPassengerData(updatedPassengerData);
  };

  const handleChange = (index, field, value) => {
    const updated = [...passengerData];
    updated[index][field] = value;
    setPassengerData(updated);
  };

  // const handleGenderClick = (gender) => {
  //   setSelectedGender(gender.charAt(0).toUpperCase() + gender.slice(1));
  // };

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
  const totalAmount = totalAirfare - discount;
  const handleBookingSubmit = async (e) => {
    const backendUrl = "http://localhost:4000";
    e.preventDefault();
    const userId = userdata?.id; // Get user ID from UserContext
    console.log("User id found", userId);
    if (loading) {
      alert("Please wait, user data is still loading...");
      return;
    }

    if (!userId) {
      alert("User not logged in. Please log in to book a flight.");
      return;
    }

    // console.log("Booking form submitted with data:", passengerData);
    const bookingPayload = {
      userId: userId,
      flightId: flight._id,
      passengers: passengerData,
      selectedSeats,
      gender: selectedGender,
      totalAmount: totalAmount,
      paymentStatus: paymentMethod === "pay-now" ? "unpaid" : "unpaid",
      date: new Date(),
    };

    try {
      const res = await axios.post(
        `${backendUrl}/api/bookings/create`,
        bookingPayload
      );

      const data = res.data;
      console.log("Booking response:", data.data._id);

      if (paymentMethod === "pay-now") {
        console.log(userId);
        alert("Booking saved and redirecting to payment...");
        navigate(`/payment/${data.data._id}`);
      } else {
        alert("Booking saved. You can pay later from your dashboard.");
        navigate("/");
      }
    } catch (err) {
      console.error("Booking error:", err.response?.data);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };
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
                      <h2 className="title">
                        Passenger {index + 1} - Seat:{" "}
                        {selectedSeats[index]?.seatNumber || "Not assigned"} (
                        {selectedSeats[index]?.classType || "Not assigned"})
                      </h2>
                    </div>
                    <div className="booking-details-wrap">
                      <form onSubmit={handleBookingSubmit}>
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
                                  value={passengerData[index].title}
                                  onChange={(e) => {
                                    handleTitleAndGenderChange(
                                      index,
                                      e.target.value
                                    );
                                  }}
                                >
                                  <option value="">Select Tittle</option>
                                  <option value="Mr">Mr.</option>
                                  <option value="Mrs">Mrs.</option>
                                  <option value="Miss">Miss.</option>
                                  <option value="Others">Others..</option>
                                </select>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="form-grp">
                              <input
                                type="text"
                                placeholder="Enter Name"
                                value={passengerData[index].name}
                                onChange={(e) =>
                                  handleChange(index, "name", e.target.value)
                                }
                              />
                            </div>
                          </li>
                        </ul>
                        <div className="gender-select">
                          <h2 className="title">Select Your Gender*</h2>
                          <ul>
                            <li
                              className={
                                passengerData[index].gender === "Male"
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                handleChange(index, "gender", "Male")
                              }
                            >
                              <i className="bi bi-gender-male"></i> Male
                            </li>
                            <li
                              className={
                                passengerData[index].gender === "Female"
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                handleChange(index, "gender", "Female")
                              }
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
                                  name="nationality"
                                  className="form-select"
                                  value={passengerData[index].nationality}
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      "nationality",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select Country</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="United States">
                                    United States
                                  </option>
                                  <option value="Dubai">Dubai</option>
                                  <option value="Saudi Arabia">
                                    {" "}
                                    Saudi Arabia{" "}
                                  </option>
                                  <option value="Australia">Australia</option>
                                  <option value="South Africa">
                                    South Africa
                                  </option>
                                  <option value="Pakistan">Pakistan</option>
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
                                  value={passengerData[index].mobileNumber}
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      "mobileNumber",
                                      e.target.value
                                    )
                                  }
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
                                  type="date"
                                  className="date"
                                  placeholder="Select Date"
                                  value={passengerData[index].dateOfBirth}
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      "dateOfBirth",
                                      e.target.value
                                    )
                                  }
                                  max={new Date().toISOString().split("T")[0]}
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
                                <input
                                  type="number"
                                  placeholder="Post Code *"
                                  value={passengerData[index].postalCode}
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      "postalCode",
                                      e.target.value
                                    )
                                  }
                                />
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
                                  value={passengerData[index].email}
                                  onChange={(e) =>
                                    handleChange(index, "email", e.target.value)
                                  }
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
                                name="mealType"
                                className="form-select"
                                value={passengerData[index].mealType}
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    "mealType",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select Meal Preference</option>
                                <option value="Veg">Veg</option>
                                <option value="Non-Veg">Non-Veg</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Kosher">Kosher</option>
                                <option value="Halal">Halal</option>
                                <option value="None">None</option>
                              </select>
                            </div>
                          </div>
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
                        {passengerTypes.reduce(
                          (sum, [, count]) => sum + count,
                          0
                        )}
                        <span>${totalTax.toFixed(2)}</span>
                      </li>
                      <li>
                        Discount <span>-${discount.toFixed(2)}</span>
                      </li>
                      <li className="total">
                        Total <span>${totalAmount.toFixed(2)}</span>
                      </li>
                    </ul>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <button
                        className={`btn ${
                          paymentMethod === "pay-now" ? "active" : ""
                        }`}
                        onClick={() => setPaymentMethod("pay-now")}
                      >
                        Pay now
                      </button>
                      <button
                        className={`btn ${
                          paymentMethod === "pay-later" ? "active" : ""
                        }`}
                        onClick={() => setPaymentMethod("pay-later")}
                      >
                        Pay later
                      </button>
                    </div>

                    <a href="#" className="btn" onClick={handleBookingSubmit}>
                      {paymentMethod === "pay-now"
                        ? "Proceed to Payment"
                        : "Save and Pay Later"}
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
