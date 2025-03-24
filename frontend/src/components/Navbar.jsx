import React from "react";
import { Link } from "react-router-dom";
// import "./Navbar.css"; // Import CSS for custom styles

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger custom-navbar">
      <div className="container">
        {/* Left: Logo */}
        <Link className="navbar-brand" to="/">
          <img src="logo.png" alt="Logo" width="40" />
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center: Menu Items */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Right: Buttons */}
        <div className="d-none d-lg-block">
          <button className="btn btn-outline-light btn-sm me-2">Login</button>
          <button className="btn btn-light btn-sm">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
