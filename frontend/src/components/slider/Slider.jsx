import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css";
import { Link } from "react-router-dom";
import "../../App.css";
import { useAuth } from "../../context/AuthContext"; // Access AuthContext

const SliderComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isLoggedIn } = useAuth(); // Get login status from AuthContext

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    beforeChange: (_, next) => setCurrentSlide(next),
    afterChange: () => {
      document
        .querySelectorAll(".slick-track [aria-hidden='true']")
        .forEach((el) => el.removeAttribute("aria-hidden"));
    },
  };

  const slides = [
    { id: 1, text: "A Lifetime of Discounts? It's Genius." },
    { id: 2, text: "Unlock Instant Savings on Your Travels." },
    { id: 3, text: "Book Now and Save More with FlyEase!" },
  ];

  // Update the return section with these changes
  return (
    <section className="slider-area">
      <Slider {...settings} className="slider-active">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`single-slider slide-${slide.id}`}>
            <div className="overlay"></div>
            <div className="container h-100">
              <div className="row align-items-center h-100 mx-0">
                {" "}
                {/* Added mx-0 to remove row margins */}
                <div className="col-12 px-3 px-md-4 text-white text-center text-md-left">
                  {" "}
                  {/* Added px-3 for mobile padding */}
                  <div
                    className={`slider-content ${
                      currentSlide === index ? "animate" : ""
                    }`}
                  >
                    <h2 className="display-5 display-md-4 fw-bold mb-3">
                      {slide.text}
                    </h2>
                    <p className="mb-4 d-none d-md-block">
                      Get rewarded for your travels – unlock instant savings of
                      10% or more with a free Geairinfo.com account.
                    </p>
                    <p className="mb-4 d-md-none mx-3">
                      {" "}
                      {/* Added mx-3 for better mobile spacing */}
                      Get rewarded for your travels with instant savings.
                    </p>
                    {/* Conditionally render the button based on the login status */}
                    {!isLoggedIn && (
                      <Link
                        to={"/login"}
                        className="btn custom_btn btn-lg px-4"
                      >
                        Sign In / Register
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default SliderComponent;
