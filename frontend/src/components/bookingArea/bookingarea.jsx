
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Bookingarea.css";
import Bookingcontent from "./bookingcontent";

const Bookingarea = () => {
  return (
    <div >
      <div className="position-relative mt-2 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="booking-wrap ">
                <ul
                  className="nav nav-tabs d-flex flex-column flex-md-row w-100"
                  id="myTab"
                  role="tablist"
                >
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
                <Bookingcontent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookingarea;
