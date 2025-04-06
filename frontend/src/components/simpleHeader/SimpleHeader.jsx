import React from "react";
import { useLocation } from "react-router-dom";
import "./SimpleHeader.css";
import bgImage from "../../assets/img/simpleHeader/bg.png";
import bg2 from "../../assets/img/simpleHeader/about.webp";
import bg4 from "../../assets/img/simpleHeader/contact1.avif";
import bg3 from "../../assets/img/slider/slider_bg03.jpg";

const SimpleHeader = () => {
  const location = useLocation();

  const pageContent = {
    "/login": {
      title: "Login to Your Account",
      image: `url(${bgImage})`,
    },
    "/about": {
      title: "About Us",
      image: `url(${bg2})`,
    },
    "/contact": {
      title: "Contact Us",
      image: `url(${bg4})`,
    },
    "/booking-details": {
      title: "Booking Details",
      image: `url(${bg3})`,
    },
  };

  const currentContent = pageContent[location.pathname] || {
    title: "Welcome",
    image: `url(${bgImage})`,
  };

  return (
    <section
      className="simple-header-area"
      style={{
        backgroundImage: currentContent.image, // Apply the background image dynamically
      }}
    >
      <div className="container h-100">
        <div className="row align-items-center h-100 mx-0">
          <div className="col-12 text-white text-right">
            <div className="header-content">
              <h1 className="display-3 fw-bold mb-0">{currentContent.title}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleHeader;
