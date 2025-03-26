import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css"; // Custom styles
import { Link } from "react-router-dom"; 
import '../../App.css'; // Global CSS
const SliderComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
        .forEach(el => el.removeAttribute("aria-hidden"));
    }
  };
<Slider {...settings}>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Slider>;
  const slides = [
    { id: 1, text: "A Lifetime of Discounts? It's Genius." },
    { id: 2, text: "Unlock Instant Savings on Your Travels." },
    { id: 3, text: "Book Now and Save More with FlyEase!" },
  ];

  return (
    <section className="slider-area">
      <Slider {...settings} className="slider-active">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`single-slider slide-${slide.id}`}>
            <div className="overlay"></div>  
            <div className="container h-100">
              <div className="row align-items-center h-100">
                <div className="col-lg-8 col-md-10 text-white">
                  <div className={`slider-content ${currentSlide === index ? "animate" : ""}`}>
                    <h2 className="display-4 fw-bold">{slide.text}</h2>
                    <p className="lead mb-4">
                      Get rewarded for your travels – unlock instant savings of 10% or more with a free Geairinfo.com account.
                    </p>
                    <Link to={"/contactus"} className="btn btn-lg custom_btn">Sign In / Register</Link>
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
