import React from "react";
import Slider from "../components/slider/slider";
import Bookingarea from "../components/bookingArea/bookingarea";
// import Login from "./login/Login";
// import FlightDetails from "./flightdetails/FlightDetails";
import FeatureArea from "../components/featurearea/FeatureArea";
import DestinationArea from "../components/destinationArea/DestinationArea";
import Footer from "../components/footer/Footer";
import BookingDetails from "./bookingDetails/BookingDetails";

const Home = () => {
  return (
    <div className="homepage-wrapper">
      {/* <BookingDetails /> */}
      <Slider />
      <Bookingarea />
      <FeatureArea />
      <DestinationArea />
      <Footer />
    </div>
  );
};

export default Home;
