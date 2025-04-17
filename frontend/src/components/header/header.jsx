import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./header.css"; // Component-specific CSS
import "../../App.css"; // Global CSS
import { Link } from "react-router-dom";
// import Login from '../../pages/Login';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand logo" to="/">
          <img src="./logo_main.png" alt="Logo" width="100" />
        </Link>

        {/* Responsive Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <Link className="nav-link " to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/about"}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/contact"}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Sign-in Button */}
          <Link to={"/login"} className="btn custom_btn ms-3 signin ">
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
