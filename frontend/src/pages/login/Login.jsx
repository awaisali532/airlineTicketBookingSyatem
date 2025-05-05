import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, isLogin, setIsLogin, setuserdata } =
    useContext(UserContext);

  const [isSignUpMode, setIsSignUpMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, [setIsLogin]);

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleToggle = () => {
    setIsSignUpMode(!isSignUpMode);
    setName("");
    setEmail("");
    setPassword("");
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
        // Registration
        const { data } = await axios.post(
          backendUrl + "/api/auth/register",
          { name, email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setIsLogin(true);
          setuserdata(data.user);
          toast.success("Registration successful! You are now logged in.");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        // Login
        const { data } = await axios.post(
          backendUrl + "/api/auth/login",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setIsLogin(true);
          setuserdata({ role: data.role });
          toast.success("Login Successfuly");

          console.log("Login response:", data); // ← Check this in browser console

          if (data.role === "admin") {
            navigate("/admin-home");
          } else {
            navigate("/");
          }
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(
        "Login/Register failed:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Something went wrong.");
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
