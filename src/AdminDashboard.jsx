import React, { useState, useEffect } from "react";
import { Trash2, TrendingUp, Car } from "lucide-react";
import "./AdminDashboard.css"; // CSS file import karna mat bhoolna

export function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const ADMIN_EMAIL = "jaivikash609@gmail.com";

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
    (savedBookings);
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.fare) || 0), 0);

  const handleDeleteAll = () => {
    const confirmEmail = prompt("⚠️ Data delete karne ke liye Admin Email enter karein:");
    
    if (confirmEmail === ADMIN_EMAIL) {
      if (window.confirm("Kya aap sach mein saari bookings delete karna chahte hain?")) {
        localStorage.removeItem("allBookings");
        setBookings([]);
        alert("Saara data clear kar diya gaya hai! 🧹");
      }
    } else if (confirmEmail !== null) {
      alert("❌ Galat Email! Aapke paas delete karne ki permission nahi hai.");
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-header">
        <h1>🚖 V-Taxi Admin Dashboard</h1>
        <button onClick={handleDeleteAll} className="delete-btn">
          <Trash2 size={18} /> Clear All Bookings
        </button>
      </div>

      {/* Stats Section */}
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

      {/* Booking List Table */}
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
              bookings.map((b, i) => (
                <tr key={i}>
                  <td>
                    <div className="route-from">{b.from}</div>
                    <div className="route-to">to {b.to}</div>
                  </td>
                  <td>{b.car?.name || "Standard"}</td>
                  <td>{b.date} <br/> <span>{b.time}</span></td>
                  <td className="fare-amount">₹{b.fare}</td>
                  <td><code>{b.otp}</code></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  Abhi tak koi booking nahi hui hai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}