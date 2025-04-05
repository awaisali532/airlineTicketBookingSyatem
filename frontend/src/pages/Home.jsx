import React from "react";
import Slider from "../components/slider/slider";
import Bookingarea from "../components/bookingArea/bookingarea";
import Login from "./login/Login";
import FlightDetails from "./flightdetails/FlightDetails";

const Home = () => {
  return (
    <div className="homepage-wrapper" style={{ minHeight: "100vh" }}>
      <Slider />
      <Bookingarea />
      <FlightDetails />
      <FlightDetails />
    </div>
  );
};

export default Home;
