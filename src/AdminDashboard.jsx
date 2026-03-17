import React, { useState, useEffect } from "react";
import { Trash2, TrendingUp, Car, RefreshCw } from "lucide-react";
import "./AdminDashboard.css";

export function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const ADMIN_EMAIL = "jaivikash609@gmail.com";

  useEffect(() => {
    // --- 1. Function ko andar hi define kar diya (Ab error kabhi nahi aayega) ---
    const loadBookings = () => {
      try {
        const savedData = localStorage.getItem("allBookings");
        if (savedData) {
          setBookings(JSON.parse(savedData));
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    // --- 2. Pehli baar load karne ke liye ---
    loadBookings();

    // --- 3. Har 5 second mein check karne ke liye ---
    const interval = setInterval(loadBookings, 5000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []); // Empty array ka matlab page load par ek hi baar chalega

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (Number(b.fare) || 0),
    0,
  );

  // Is function ko bahar hi rehne dete hain kyunki ye button click par chalta hai
  const handleDeleteAll = () => {
    const confirmEmail = prompt("Please enter Admin Email to delete data:");
    if (confirmEmail === ADMIN_EMAIL) {
      if (window.confirm("Are you sure you want to delete all bookings?")) {
        localStorage.removeItem("allBookings");
        setBookings([]);
        alert("All bookings cleared successfully! 🧹");
      }
    } else if (confirmEmail !== null) {
      alert("❌ Invalid Email! Permission denied.");
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-header">
        <h1>🚖 V-Taxi Admin Dashboard</h1>
        <div className="header-actions">
          {/* Refresh ke liye window reload use kar lete hain as a backup */}
          <button
            onClick={() => window.location.reload()}
            className="refresh-btn"
          >
            <RefreshCw size={18} /> Refresh
          </button>
          <button onClick={handleDeleteAll} className="delete-btn">
            <Trash2 size={18} /> Clear All
          </button>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card blue-border">
          <div className="stat-content">
            <div>
              <p>Total Rides</p>
              <h2>{bookings.length}</h2>
            </div>
            <Car size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card green-border">
          <div className="stat-content">
            <div>
              <p>Total Revenue</p>
              <h2>₹{totalRevenue.toLocaleString()}</h2>
            </div>
            <TrendingUp size={40} className="stat-icon" />
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer Route</th>
              <th>Car Type</th>
              <th>Date & Time</th>
              <th>Fare</th>
              <th>OTP</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              [...bookings].reverse().map((b, i) => (
                <tr key={i}>
                  <td>
                    <div className="route-from">{b.from}</div>
                    <div className="route-to">to {b.to}</div>
                  </td>
                  <td>{b.car?.name || "Taxi"}</td>
                  <td>
                    {b.date} <br /> {b.time}
                  </td>
                  <td className="fare-amount">₹{b.fare}</td>
                  <td>
                    <code className="otp-code">{b.otp}</code>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  📭 No bookings found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
