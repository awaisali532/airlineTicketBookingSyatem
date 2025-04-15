import React, { useState } from "react";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <SimpleHeader />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded shadow-sm bg-light"
            >
              <h4 className="mb-4 text-center">Reset Your Password</h4>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="e.g. user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  placeholder="Enter the OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn custom_btn w-100">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
