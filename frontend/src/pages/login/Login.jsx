import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Login.css";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";

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
    <div className="login-page" style={{ height: "100vh", overflow: "hidden" }}>
      <SimpleHeader />
      <div className="container d-flex align-items-start justify-content-center mt-4">
        <div className="card p-4 shadow rounded-4 w-100" style={{ maxWidth: "400px" }}>
          <h2 className="text-center fw-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
          <form onSubmit={handleSubmit}>
            {/* Keep all your existing form fields exactly the same */}
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label" htmlFor="name">Name:</label>
                <input
                  id="name"
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
              <label className="form-label" htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
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

            <button type="submit" className="btn custom_btn w-100">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;