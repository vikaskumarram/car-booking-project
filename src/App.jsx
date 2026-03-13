import React, { useState, useEffect } from "react";
import "./index.css";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { Contact } from "./Contact";
import { Services } from "./services";
import { About } from "./About";
import { Footer } from "./Footer";
import { Booknow } from "./Booknow";
import { Login } from "./Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userStatus = localStorage.getItem("isLoggedIn");
    if (userStatus === "true") {
      (true);
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      alert("Logged out successfully! 👋");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <img className="first-logo" src="/V-taxi logo2.JPG" alt="Logo" />
        </div>
        <div className="navbar-taxt">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Services">Services</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/Booknow">Booknow</Link>
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
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
