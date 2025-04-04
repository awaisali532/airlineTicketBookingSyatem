import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Login.css"; // Optional custom styles
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow rounded-4 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center fw-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <a href="#" className="text-decoration-none small">Forgot password?</a>
            <span className="small">
              {isLogin ? (
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

          <Link  type="submit" className="btn custom_btn w-100">
            {isLogin ? "Login" : "Sign Up"}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
