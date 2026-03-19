import React, { useState, useEffect } from "react";
import "./index.css";
import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { Contact } from "./Contact";
import { Services } from "./services";
import { About } from "./About";
import { Footer } from "./Footer";
import { Booknow } from "./Booknow";
import { Login } from "./Login";
import { BookingConfirmation } from "./BookingConfirmation";
import { AdminDashboard } from "./AdminDashboard";
import { EditProfile } from "./EditProfile";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Line 21 se 31 tak ye copy karein
  useEffect(() => {
    const userStatus = localStorage.getItem("isLoggedIn");
    const savedUserData = localStorage.getItem("user");

    if (userStatus === "true") {
      setIsLoggedIn(true);
      if (savedUserData) {
        try {
          setUser(JSON.parse(savedUserData));
        } catch (e) {
          console.error("Data parse error", e);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []); 

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout? 🤔")) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
    
      setIsLoggedIn(false);
      setUser(null);
      setShowDropdown(false);
      navigate("/Login");
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
            <div
              className="user-profile-wrapper"
              style={{ position: "relative" }}
            >
              <div
                className="user-nav-section"
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span className="user-name-display">
                  {user?.name || "User"}
                </span>
                <img
                  src={
                    user?.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="DP"
                  className="nav-dp"
                />
              </div>

              {showDropdown && (
                <div className="profile-dropdown">
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/EditProfile");
                      setShowDropdown(false);
                    }}
                  >
                    👤 Edit Profile
                  </div>
                  <div className="dropdown-divider"></div>
                  <div
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    🛑 Logout
                  </div>
                </div>
              )}
            </div>
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
          path="/EditProfile"
          element={<EditProfile setUser={setUser} />}
        />
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
