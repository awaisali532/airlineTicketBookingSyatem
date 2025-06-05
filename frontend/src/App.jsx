import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/header";
import AdminHeader from "./components/header/AdminHeader";
import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import FlightDetails from "./pages/flightdetails/FlightDetails";
import BookingDetails from "./pages/bookingDetails/BookingDetails";
import PassengersCount from "./pages/passengersCount/PassengersCount";
import SelectSeats from "./pages/selectSeats/SelectSeats";
import Login from "./pages/login/Login";
import Forget from "./pages/login/Forget";
import NewPassword from "./pages/login/NewPassword";
import PaymentPage from "./pages/payment/payment";
import BookedTickets from "./components/bookingArea/BookedTickets";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./context/UserContext";
import "bootstrap-icons/font/bootstrap-icons.css";
const App = () => {
  const { userdata, loading, setIsLogin } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  const isAdmin = userdata?.role === "admin";

  return (
    <>
      <ToastContainer />
      {isAdmin ? <AdminHeader /> : <Header />}

      <Routes>
        <Route path="/" element={isAdmin ? <HomeAdmin /> : <Home />} />
        <Route path="/admin-home" element={<HomeAdmin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/flightdetails" element={<FlightDetails />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<Forget />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/passenger-count" element={<PassengersCount />} />
        <Route path="/select-seats" element={<SelectSeats />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/ticket" element={<BookedTickets />} />

      </Routes>
    </>
  );
};

export default App;
