import React from "react";
import "./FeatureArea.css"; // Import the CSS file for styling
const FeatureArea = () => {
  return (
    <div>
      <section className="features-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-6 col-sm-10">
              <div className="features-item">
                <div className="features-icon">
                  <i className="bi bi-question-circle"></i>
                </div>
                <div className="features-content">
                  <h6 className="title">We are now available</h6>
                  <p>Call +1 555 666 888 for contuct with us</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-10">
              <div className="features-item">
                <div className="features-icon">
                  <i className="bi bi-airplane"></i>
                </div>
                <div className="features-content">
                  <h6 className="title">International Flight</h6>
                  <p>Call +1 555 666 888 for booking assistance</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-10">
              <div className="features-item">
                <div className="features-icon">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="features-content">
                  <h6 className="title">Check Refund</h6>
                  <p>Call +1 555 666 888 for check refund status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureArea;
