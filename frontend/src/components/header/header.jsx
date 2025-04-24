import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook to navigate after log out
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./header.css"; // Component-specific CSS
import "../../App.css"; // Global CSS
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Access AuthContext

const Header = () => {
  const { isLoggedIn, logout } = useAuth(); // Access isLoggedIn and logout from context
  const navigate = useNavigate(); // Hook to navigate after log out

  useEffect(() => {
    // Check if there's a token in localStorage to determine login status
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, logout the user
      logout();
    }
  }, [logout]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage to log out
    logout(); // Call logout to update the state in AuthContext
    navigate("/"); // Redirect to homepage after log out
  };

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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
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

          {/* Conditionally Render "Sign in" or "Log out" Button */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn custom_btn ms-3">
              Log out
            </button>
          ) : (
            <Link to={"/login"} className="btn custom_btn ms-3 signin">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
