import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Login.css";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const Login = () => {
  const { backendUrl } = useContext(UserContext); // Use UserContext for backend URL
  const { isLoggedIn, login, logout } = useAuth(); // Get login/logout and isLoggedIn from AuthContext
  const navigate = useNavigate();
  const validateForm = () => {
    // Simple email regex for validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Simple password strength check (minimum length)
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return false;
    }

    return true;
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(); // Call login function from AuthContext
    } else {
      logout(); // Call logout function from AuthContext
    }
  }, [login, logout]); // Add login and logout to the dependency array
  const [isSignUpMode, setIsSignUpMode] = useState(!isLoggedIn);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToggle = () => {
    setIsSignUpMode(!isSignUpMode); // Toggle between Sign Up and Login

    setName(""); // Reset name field
    setEmail(""); // Reset email field
    setPassword(""); // Reset password field
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (!isSignUpMode) {
        const { data } = await axios.post(
          backendUrl + "/api/auth/register",
          { name, email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("Registration response:", data);

        if (data.success) {
          localStorage.setItem("token", data.token);
          login(); // Call login function from AuthContext
          toast.success("Registration successful! You are now logged in.");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/auth/login",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("Login response data:", data);

        if (data.success) {
          localStorage.setItem("token", data.token);
          login(); // Call login function from AuthContext
          toast.success("Login Successfuly");
          navigate("/contact");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(
        "Login failed error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <SimpleHeader />
      <div className="container d-flex align-items-start justify-content-center mt-4">
        <div
          className="card p-4 shadow rounded-4 w-100"
          style={{ maxWidth: "400px" }}
        >
          <h2 className="text-center fw-bold mb-4">
            {isSignUpMode ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Keep all your existing form fields exactly the same */}
            {!isSignUpMode && (
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between mb-3">
              <Link
                to={"/forget-password"}
                className="text-decoration-none small"
              >
                Forgot password?
              </Link>
              <span className="small">
                {isSignUpMode ? (
                  <span>
                    New user?{" "}
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={handleToggle}
                    >
                      Create account
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={handleToggle}
                    >
                      Sign In
                    </button>
                  </span>
                )}
              </span>
            </div>

            <button
              type="submit"
              className="btn hover-btn custom_btn w-100 mt-3"
            >
              {isSignUpMode ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
