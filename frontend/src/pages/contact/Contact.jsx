import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleHeader from "../../components/simpleHeader/SimpleHeader";
import "./Contact.css";

const Contact = () => {
  const [userName, setUserName] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("http://localhost:4000/api/user/data", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          setUserName(data.userData.name); // Store the data directly (assuming response contains name, email, etc.)
          console.log("User data fetched successfully:", data.userData.name);
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [backendUrl]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div>
      <SimpleHeader />

      {/* Contact Form Section */}
      <section className="container py-4 d-flex justify-content-center">
        <div className="contact-card">
          <h2 className="text-center text-secondary-custom  fw-bold mb-3">
            Welcome, {userName || "Guest"}!
          </h2>
          <h3 className="text-center text-primary-custom fw-semibold mb-4">
            Contact Us
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Name Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label fw-semibold" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label fw-semibold" htmlFor="email">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label fw-semibold" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Subject Dropdown */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label fw-semibold" htmlFor="subject">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="form-select"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Ticket Inquiry">Ticket Inquiry</option>
                  <option value="Flight Change">Flight Change</option>
                  <option value="Refund Request">Refund Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Message Textarea (Full Width) */}
            <div className="mb-4">
              <label className="form-label fw-semibold" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows="4"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn  custom_btn hover-btn">
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
