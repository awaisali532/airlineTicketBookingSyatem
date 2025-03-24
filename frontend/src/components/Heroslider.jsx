import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./FlightSlider.css"; // Custom styling

const FlightSlider = () => {
  return (
    <div className="slider-container">
      <Carousel fade interval={3000}> {/* Auto slide every 3 sec */}
        <Carousel.Item>
          <img
            className="d-block w-100 slider-image h-3"
            src="https://media.istockphoto.com/id/1401029211/photo/stewardesses-serving-food-and-drinks-to-customer-on-the-airplane-during-flight.jpg?s=612x612&w=0&k=20&c=xKN-LTTh8LWLNDoah4z_k7ZNs7KRSjnk0UbCO9ohQtM="
            alt="Flight 1"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 slider-image"
            src="https://source.unsplash.com/1200x600/?airplane,airport"
            alt="Flight 2"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 slider-image"
            src="https://source.unsplash.com/1200x600/?airplane,clouds"
            alt="Flight 3"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 slider-image"
            src="https://source.unsplash.com/1200x600/?cockpit,airplane"
            alt="Flight 4"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 slider-image"
            src="https://source.unsplash.com/1200x600/?flight,cabin"
            alt="Flight 5"
          />
        </Carousel.Item>
      </Carousel>
      
      {/* Overlay */}
      <div className="overlay"></div>
    </div>
  );
};

export default FlightSlider;
