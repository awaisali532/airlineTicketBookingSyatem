import React from "react";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import "./BookingDetails.css"; // Assuming you have a CSS file for styles

const BookingDetails = () => {
  const location = useLocation(); // Get the location object
  const imageSrc = location.state?.image; // Access the image passed from FlightDetails

  return (
    <div>
      <SimpleHeader />
      {/* Progress bar for booking details */}
      <section className="customer-details-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="customer-details-content">
                {/* Display the passed image */}
                <div className="icon">
                  {imageSrc && <img src={imageSrc} alt="Flight Logo" />}
                </div>
                <div className="content">
                  <h2 className="title">
                    Customer Details: Please fill in with valid information.
                  </h2>
                  <div className="customer-progress-wrap">
                    <div className="progress">
                      <div
                        className="progress-bar w-50"
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="customer-progress-step">
                      <ul>
                        <li>
                          <span>1</span>
                          <p>Guest Information</p>
                        </li>
                        <li>
                          <span>2</span>
                          <p>Payment</p>
                        </li>
                        <li>
                          <span>3</span>
                          <p>Confirmation</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking getails of user  */}
    </div>
  );
};

export default BookingDetails;
