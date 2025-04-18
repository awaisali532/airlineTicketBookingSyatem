import React from "react";
import "./FeatureArea.css"; // Import the CSS file for styling
const FeatureArea = () => {
  return (
    <div>
      <section class="features-area">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-4 col-lg-6 col-sm-10">
              <div class="features-item">
                <div class="features-icon">
                  <i class="bi bi-question-circle"></i>
                </div>
                <div class="features-content">
                  <h6 class="title">We are now available</h6>
                  <p>Call +1 555 666 888 for contuct with us</p>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-sm-10">
              <div class="features-item">
                <div class="features-icon">
                  <i class="bi bi-airplane"></i>
                </div>
                <div class="features-content">
                  <h6 class="title">International Flight</h6>
                  <p>Call +1 555 666 888 for booking assistance</p>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-sm-10">
              <div class="features-item">
                <div class="features-icon">
                  <i class="bi bi-currency-dollar"></i>
                </div>
                <div class="features-content">
                  <h6 class="title">Check Refund</h6>
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
