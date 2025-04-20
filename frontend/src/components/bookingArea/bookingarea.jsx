import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Bookingarea.css";
import Bookingcontent from "./BookingContent";
import { useNavigate } from "react-router-dom";

const Bookingarea = () => {
  const [signedIn, setSignedIn] = useState(false); // Track if the user is signed in
  const navigate = useNavigate();
  const handleSignIn = () => {
    setSignedIn(true); // Simulate a sign-in action
    navigate("/login");
  };

  return (
    <div>
      <div className="position-relative mt-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="booking-wrap">
                <ul
                  className="nav nav-tabs d-flex flex-column flex-md-row w-100"
                  id="myTab"
                  role="tablist"
                >
                  {/* Air Booking Tab */}
                  <li className="nav-item flex-fill" role="presentation">
                    <button
                      className="nav-link active d-flex align-items-center justify-content-center w-100 fw-semibold"
                      id="bOOKing-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#bOOKing-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="bOOKing-tab-pane"
                      aria-selected="true"
                    >
                      <i className="bi bi-airplane"></i>
                      air BOOKing
                    </button>
                  </li>

                  {/* My Trips Tab */}
                  <li className="nav-item flex-fill" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center justify-content-center w-100 fw-semibold"
                      id="trips-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#trips-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="trips-tab-pane"
                      aria-selected="false"
                    >
                      <i className="bi bi-file-text"></i>
                      my trips
                    </button>
                  </li>

                  {/* Check-in Tab */}
                  <li className="nav-item flex-fill" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center justify-content-center w-100 fw-semibold"
                      id="check-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#check-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="check-tab-pane"
                      aria-selected="false"
                    >
                      <i className="bi bi-check-circle"></i>
                      check-in
                    </button>
                  </li>

                  {/* Flight Status Tab */}
                  <li className="nav-item flex-fill" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center justify-content-center w-100 fw-semibold"
                      id="flight-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#flight-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="flight-tab-pane"
                      aria-selected="false"
                    >
                      <i className="bi bi-clock"></i>
                      Flight status
                    </button>
                  </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                  {/* Air Booking Tab Content */}
                  <div
                    className="tab-pane fade show active"
                    id="bOOKing-tab-pane"
                    role="tabpanel"
                    aria-labelledby="bOOKing-tab"
                  >
                    {/* Air Booking content is always visible */}
                    <Bookingcontent />
                  </div>

                  {/* My Trips Tab Content */}
                  <div
                    className="tab-pane fade"
                    id="trips-tab-pane"
                    role="tabpanel"
                    aria-labelledby="trips-tab"
                  >
                    {signedIn ? (
                      <div>Your trips details will show here.</div>
                    ) : (
                      <div className="sign-in-prompt">
                        <p>Please sign in to view your trips.</p>
                        <button
                          onClick={handleSignIn}
                          className="btn custom_btn"
                        >
                          Sign In
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Check-in Tab Content */}
                  <div
                    className="tab-pane fade"
                    id="check-tab-pane"
                    role="tabpanel"
                    aria-labelledby="check-tab"
                  >
                    {signedIn ? (
                      <div>Check-in details will show here.</div>
                    ) : (
                      <div className="sign-in-prompt">
                        <p>Please sign in to check-in.</p>
                        <button
                          onClick={handleSignIn}
                          className="btn custom_btn"
                        >
                          Sign In
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Flight Status Tab Content */}
                  <div
                    className="tab-pane fade"
                    id="flight-tab-pane"
                    role="tabpanel"
                    aria-labelledby="flight-tab"
                  >
                    {signedIn ? (
                      <div>Flight status details will show here.</div>
                    ) : (
                      <div className="sign-in-prompt">
                        <p>Please sign in to view flight status.</p>
                        <button
                          onClick={handleSignIn}
                          className="btn custom_btn"
                        >
                          Sign In
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookingarea;
