/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Trash2, TrendingUp, Car, RefreshCw, MessageSquare } from "lucide-react";
import "./AdminDashboard.css";

export function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("rides");
  const ADMIN_EMAIL = "jaivikash609@gmail.com";

  // --- API FETCH LOGIC (Corrected) ---
  const loadData = async () => {
    // 1. LocalStorage se Bookings (Hamesha chalega)
    const savedData = localStorage.getItem("allBookings");
    setBookings(savedData ? JSON.parse(savedData) : []);

    // 2. Backend se Messages (Check if backend is up)
    try {
      // Dhyan dein: URL ke end mein slash '/' check karein
      const response = await fetch("http://127.0.0.1:5000/api/contact/all"); 
      if (response.ok) {
        const msgData = await response.json();
        setMessages(msgData);
      }
    } catch (error) {
      // Agar backend band hai toh console mein error dikhaye, alert baar-baar na aaye
      console.log("Backend offline: Messages could not be loaded.");
    }
  };

  useEffect(() => {
    loadData();
    // Auto-refresh interval (thoda badha diya hai taaki crash na ho)
    const interval = setInterval(loadData, 10000); 
    return () => clearInterval(interval);
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.fare) || 0), 0);

  // --- DELETE MESSAGE API ---
  const handleDeleteMessage = async (id) => {
    if (window.confirm("Delete this message?")) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/contact/delete/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          loadData();
        }
      } catch (error) {
        alert("Action failed: Backend offline.");
      }
    }
  };

  const handleDeleteAll = () => {
    const confirmEmail = prompt("Enter Admin Email:");
    if (confirmEmail === ADMIN_EMAIL) {
      localStorage.removeItem("allBookings");
      setBookings([]);
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-header">
        <h1> Vikas Taxi Admin Dashboard</h1>
        <div className="header-actions">
          <button onClick={loadData} className="refresh-btn"><RefreshCw size={18} /> Refresh</button>
          <button onClick={handleDeleteAll} className="delete-btn"><Trash2 size={18} /> Clear Rides</button>
        </div>
      </div>

      <div className="stats-container">
        <div className={`stat-card blue-border ${activeTab === "rides" ? "active-stat" : ""}`} onClick={() => setActiveTab("rides")}>
          <div className="stat-content">
            <div><p>Total Rides</p><h2>{bookings.length}</h2></div>
            <Car size={40} className="stat-icon" />
          </div>
        </div>

        <div className={`stat-card yellow-border ${activeTab === "messages" ? "active-stat" : ""}`} onClick={() => setActiveTab("messages")}>
          <div className="stat-content">
            <div><p>Inquiries</p><h2>{messages.length}</h2></div>
            <MessageSquare size={40} className="stat-icon" />
          </div>
        </div>

        <div className="stat-card green-border">
          <div className="stat-content">
            <div><p>Revenue</p><h2>₹{totalRevenue.toLocaleString()}</h2></div>
            <TrendingUp size={40} className="stat-icon" />
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        {activeTab === "rides" ? (
          <table className="admin-table">
            <thead>
              <tr><th>Route</th><th>Car</th><th>Date</th><th>Fare</th><th>OTP</th></tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? [...bookings].reverse().map((b, i) => (
                <tr key={i}>
                  <td>{b.from} to {b.to}</td>
                  <td>{b.car?.name}</td>
                  <td>{b.date}</td>
                  <td className="fare-amount">₹{b.fare}</td>
                  <td><code className="otp-code">{b.otp}</code></td>
                </tr>
              )) : <tr><td colSpan="5" className="no-data">No rides found.</td></tr>}
            </tbody>
          </table>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>User</th><th>Message</th><th>Action</th></tr>
            </thead>
            <tbody>
              {messages.length > 0 ? [...messages].reverse().map((m, i) => (
                <tr key={i}>
                  <td><b>{m.name}</b><br/>{m.email}</td>
                  <td style={{fontSize: "13px"}}>{m.message}</td>
                  <td><button onClick={() => handleDeleteMessage(m.id)} className="delete-single-btn"><Trash2 size={16}/></button></td>
                </tr>
              )) : <tr><td colSpan="3" className="no-data">No inquiries yet.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}