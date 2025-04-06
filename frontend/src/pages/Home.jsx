import React from "react";
import Slider from "../components/slider/slider";
import Bookingarea from "../components/bookingArea/bookingarea";
// import Login from "./login/Login";
// import FlightDetails from "./flightdetails/FlightDetails";
import FeatureArea from "../components/featurearea/FeatureArea";

const Home = () => {
  return (
    <div className="homepage-wrapper">
      <Slider />
      <Bookingarea />
      <FeatureArea />
    </div>
  );
};

export default Home;
