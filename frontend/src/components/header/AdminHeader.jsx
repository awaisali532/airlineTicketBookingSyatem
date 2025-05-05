import React, { useEffect, useContext } from "react"; // Import useContext
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import { UserContext } from "../../context/UserContext"; // Import UserContext

const AdminHeader = () => {
  const { isLogin, logout, userdata } = useContext(UserContext); // Correctly use UserContext
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || userdata?.role !== "admin") {
      logout();
      navigate("/login");
    }
  }, [logout, userdata, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand logo" to="/admin/dashboard">
          <img src="/logo_main.png" alt="Logo" width="100" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/flights">
                Manage Flights
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/bookings">
                All Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
                Users
              </Link>
            </li>
          </ul>

          {isLogin && userdata?.role === "admin" ? (
            <button onClick={handleLogout} className="btn custom_btn ms-3">
              Log out
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
