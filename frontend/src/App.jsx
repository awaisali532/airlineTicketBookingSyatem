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
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkin" element={<Checkin/>} />
        <Route path="confirmation" element={<Confirmation />} />"
        <Route path="contactus" element={<Contact/>} />
        <Route path="/flightdetails" element={<FlightDetails />} />
      </Routes>
    </div>
  );
};

export default App;
