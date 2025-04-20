import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./DestinationArea.css";
import "odometer/themes/odometer-theme-default.css";
import Odometer from "odometer";

const DestinationArea = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [satisfiedPercent, setSatisfiedPercent] = useState(0);

  const destinationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set the counts after the section is in view
            setCustomerCount(5830);
            setSatisfiedPercent(100);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (destinationRef.current) {
      observer.observe(destinationRef.current);
    }

    return () => {
      if (destinationRef.current) {
        observer.unobserve(destinationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Initialize Odometer manually when the counts change
    const odometers = document.querySelectorAll(".odometer");
    odometers.forEach((odometer) => {
      new Odometer({
        el: odometer,
        format: "(,ddd)", // You can change this based on your needs
      });
    });
  }, [customerCount, satisfiedPercent]);

  return (
    <div>
      <section className="destination-area destination-bg" ref={destinationRef}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title">
                <span className="sub-title">Offer Deals</span>
                <h2 className="title">Your Great Destination</h2>
              </div>
              <div className="destination-content">
                <p>
                  Get rewarded for your travels – unlock instant savings of 10%
                  or more with a free <span>FlyEase.com</span> account
                </p>
                <ul>
                  <li>
                    <div className="counter-item">
                      <div className="counter-content">
                        <h2 className="count">
                          <span
                            className="odometer odometer-auto-theme"
                            data-count={customerCount}
                          >
                            {customerCount}
                          </span>
                          +
                        </h2>
                        <p>Happy Customers</p>
                      </div>
                      <div className="counter-icon">
                        <i className="bi bi-people"></i>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="counter-item">
                      <div className="counter-content">
                        <h2 className="count">
                          <span
                            className="odometer odometer-auto-theme"
                            data-count={satisfiedPercent}
                          >
                            {satisfiedPercent}
                          </span>
                          %
                        </h2>
                        <p>Client Satisfied</p>
                      </div>
                      <div className="counter-icon">
                        <i className="bi bi-globe"></i>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="content-bottom">
                  <p>
                    Discover the latest offers &amp; news and start planning
                  </p>
                  <Link to={"/contact"}>Contact us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationArea;
