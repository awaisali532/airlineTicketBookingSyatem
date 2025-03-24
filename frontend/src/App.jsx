import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Checkin from "./pages/Checkin";
import Confirmation from "./pages/Confirmation";
import Contact from "./pages/Contact";
import FlightDetails from "./pages/FlightDetails";
import FlightSearch from "./pages/FlightSearch";
import FlightTracking from "./pages/FlightDetails";
import Auth from "./pages/Auth";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkin" element={<Checkin />} />
        <Route path="confirmation" element={<Confirmation />} />"
        <Route path="contactus" element={<Contact />} />
        <Route path="/flightdetails" element={<FlightDetails />} />
        <Route path="/flightsearch" element={<FlightSearch />} />
        <Route path="/flighttracking" element={<FlightTracking />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
