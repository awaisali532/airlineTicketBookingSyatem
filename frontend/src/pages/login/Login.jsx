import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Login.css";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { backendUrl, isLogin, setIsLogin } = useContext(UserContext); // Fixed: included `isLogin`
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
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
    try {
      if (!isLogin) {
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
          setIsLogin(true);
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
          setIsLogin(true);
          navigate("/");
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
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Keep all your existing form fields exactly the same */}
            {!isLogin && (
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

            <button
              type="submit"
              className="btn hover-btn custom_btn w-100 mt-3"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
