import React, { useState } from "react";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/new-password");
  };

  return (
    <>
      <SimpleHeader />
      <div className="container mt-5">
        {/* Header with Background */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded shadow-sm bg-light"
            >
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

              <button type="submit" className="btn custom_btn w-100">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
