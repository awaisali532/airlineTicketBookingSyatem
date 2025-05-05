import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./header.css";
import "../../App.css";
import { UserContext } from "../../context/UserContext"; // Correct import

const Header = () => {
  const { isLogin, setIsLogin, setuserdata } = useContext(UserContext); // Correct destructuring
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogin(false);
      setuserdata(null);
    }
  }, [setIsLogin, setuserdata]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setuserdata(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand logo" to="/">
          <img src="./logo_main.png" alt="Logo" width="100" />
        </Link>

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

          {/* Show login/logout depending on isLogin */}
          {isLogin ? (
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
