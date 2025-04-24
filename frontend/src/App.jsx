import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about/About";
import Checkin from "./pages/Checkin";
import Confirmation from "./pages/Confirmation";
import Contact from "./pages/contact/Contact";
import FlightDetails from "./pages/flightdetails/FlightDetails";
import FlightSearch from "./pages/FlightSearch";
import FlightTracking from "./pages/FlightTracking";
import Header from "./components/header/header.jsx";
import Login from "./pages/login/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BookingDetails from "./pages/bookingDetails/BookingDetails";
import PassengersCount from "./pages/passengersCount/PassengersCount.jsx";
import SelectSeats from "./pages/selectSeats/SelectSeats.jsx";
import Forget from "./pages/login/Forget.jsx";
import NewPassword from "./pages/login/NewPassword.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="confirmation" element={<Confirmation />} />"
          <Route path="contact" element={<Contact />} />
          <Route path="/flightdetails" element={<FlightDetails />} />
          <Route path="/booking-details" element={<BookingDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<Forget />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/passenger-count" element={<PassengersCount />} />
          <Route path="/select-seats" element={<SelectSeats />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
