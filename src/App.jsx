import React, { useState, useEffect } from "react";
import "./index.css";
import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom"; // 1. useNavigate add kiya
import { Home } from "./Home";
import { Contact } from "./Contact";
import { Services } from "./services";
import { About } from "./About";
import { Footer } from "./Footer";
import { Booknow } from "./Booknow";
import { Login } from "./Login";
import { BookingConfirmation } from "./BookingConfirmation";
import { AdminDashboard } from "./AdminDashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userStatus = localStorage.getItem("isLoggedIn");
    if (userStatus === "true") {
      <isLoggedIn>true</isLoggedIn>;
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout? 🤔")) {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);

      alert("Logged out successfully! 👋");
      navigate("/Login");
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <img className="first-logo" src="public/v-taxi-logo.JPG" alt="Logo" />
        </div>
        <div className="navbar-taxt">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Services">Services</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/Booknow">Booknow</Link>
        
          {isLoggedIn ? (
            <button
              className="logout-btn"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </button>
          ) : (
            <Link to="/Login">Login</Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
       <Route path="/BookingConfirmation" element={<BookingConfirmation />} />
        <Route path="/Booknow" element={<Booknow isLoggedIn={isLoggedIn} />} />
        <Route
          path="/Login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}
