import "./index.css";
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Printer, Settings, MapPin, Clock, Calendar } from "lucide-react"; 
// Sahi extension ke saath import
import { cityDistances, citiesList } from "./cityData.jsx";

export function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentCar] = useState(
    location.state?.selectedCar ||
      JSON.parse(localStorage.getItem("selectedCar")) ||
      null,
  );

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [distance, setDistance] = useState(0);

  const [receiptData, setReceiptData] = useState(null);
  const [showFinalReceipt, setShowFinalReceipt] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [otp, setOtp] = useState(null);

  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const handlePrint = () => window.print();

  const handleInputChange = (e, field) => {
    const val = e.target.value;
    if (field === "pickup") setPickup(val);
    else setDrop(val);

    setActiveField(field);

    if (val.length > 0) {
      const filtered = citiesList.filter((c) =>
        c.toLowerCase().includes(val.toLowerCase()),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectCity = (city) => {
    if (activeField === "pickup") {
      setPickup(city);
    } else {
      setDrop(city);
      const routeKey = `${pickup}-${city}`;
      const reverseKey = `${city}-${pickup}`;
      setDistance(cityDistances[routeKey] || cityDistances[reverseKey] || 100);
    }
    setSuggestions([]);
    setActiveField(null);
  };

  const handleBook = () => {
    if (!pickup || !drop || !currentCar || !rideDate || !rideTime) {
      alert("Please fill all details! 📍⏰");
      return;
    }
    setOtp(Math.floor(1000 + Math.random() * 9000));
    setIsBooked(true);
  };

  // --- ADMIN SAVING LOGIC ---
  const handleFinalDone = () => {
    const newBooking = {
      car: currentCar,
      from: pickup,
      to: drop,
      date: rideDate,
      time: rideTime,
      distance: distance,
      fare: distance * currentCar.price_per_km,
      otp: otp,
    };

    // LocalStorage mein save karna taaki AdminDashboard dekh sake
    const existingBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
    localStorage.setItem("allBookings", JSON.stringify([...existingBookings, newBooking]));

    setReceiptData(newBooking);
    setIsBooked(false);
    setShowFinalReceipt(true);
    setShowForm(false);
    alert("Booking Confirmed! ✅ (Saved in Admin Panel)");
  };

  const handleCancel = () => {
    if (window.confirm("⚠️ Do you want to cancel?")) {
      setIsBooked(false);
      navigate("/booknow");
    }
  };

  return (
    <div className="home-main-layout" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", alignItems: "center", padding: "20px" }}>
      
      {showForm && (
        <div className="ride-container no-print" style={{ flex: "1", width: "100%", maxWidth: "600px" }}>
          <h1 className="main-title">India Moves On Vikas Taxi!</h1>
          <div className="input-group" style={{ position: "relative" }}>
            <div className="field-box">
              <input type="text" placeholder="📍 Pickup City" value={pickup} onFocus={() => setActiveField("pickup")} onChange={(e) => handleInputChange(e, "pickup")} />
            </div>
            <div className="field-box">
              <input type="text" placeholder="🏁 Drop City" value={drop} onFocus={() => setActiveField("drop")} onChange={(e) => handleInputChange(e, "drop")} />
            </div>

            {activeField && suggestions.length > 0 && (
              <ul className="suggestion-list" style={{ position: "absolute", zIndex: 999, width: "100%", background: "white", border: "1px solid #ddd", top: activeField === "pickup" ? "45px" : "95px", maxHeight: "200px", overflowY: "auto", listStyle: "none", padding: 0 }}>
                {suggestions.map((city, i) => (
                  <li key={i} onClick={() => selectCity(city)} style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" }}>🏢 {city}</li>
                ))}
              </ul>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <input type="date" value={rideDate} onChange={(e) => setRideDate(e.target.value)} style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} />
              <input type="time" value={rideTime} onChange={(e) => setRideTime(e.target.value)} style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} />
            </div>
          </div>
          <button className="main-book-btn" style={{ marginTop: "20px", width: "100%" }} onClick={handleBook}>Confirm Ride</button>
        </div>
      )}

      {showFinalReceipt && receiptData && (
        <div className="side-receipt-container" style={{ width: "100%", maxWidth: "400px" }}>
          <div className="receipt-card printable-receipt" style={{ border: "2px solid #27ae60", background: "#fff", borderRadius: "15px", overflow: "hidden" }}>
            <div style={{ background: "#27ae60", padding: "15px", color: "white", textAlign: "center" }}><h2 style={{ margin: 0 }}>V-TAXI RECEIPT</h2></div>
            <div style={{ padding: "20px" }}>
                <p><strong>OTP:</strong> {receiptData.otp}</p>
                <p><strong>Car:</strong> {receiptData.car.name}</p>
                <p><strong>Route:</strong> {receiptData.from} ➔ {receiptData.to}</p>
                <p><strong>Distance:</strong> {receiptData.distance} KM</p>
                <p><strong>Date:</strong> {receiptData.date} | {receiptData.time}</p>
                <hr />
                <h3 style={{ color: "#27ae60" }}>Total Fare: ₹{receiptData.fare}</h3>
            </div>
            <div className="no-print" style={{ display: "flex", gap: "10px", padding: "15px", background: "#f1f1f1" }}>
              <button onClick={handlePrint} style={{ flex: 1, padding: "10px", background: "#27ae60", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}><Printer size={16} /> Print</button>
              <button onClick={() => navigate("/booknow")} style={{ flex: 1, padding: "10px", background: "#333", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Finish</button>
            </div>
          </div>
        </div>
      )}

      {isBooked && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: "30px", background: "white", borderRadius: "10px", textAlign: "center" }}>
            <h2>Finalize Booking?</h2>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={handleFinalDone} style={{ flex: 1, padding: "12px", background: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>Done</button>
              <button onClick={handleCancel} style={{ flex: 1, padding: "12px", background: "#e74c3c", color: "white", border: "none", borderRadius: "5px" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* --- PROFESSIONAL FOOTER WITH ADMIN LINK --- */}
      <footer className="no-print" style={{ width: "100%", marginTop: "auto", paddingTop: "40px", paddingBottom: "20px", textAlign: "center", borderTop: "1px solid #eee", color: "#888" }}>
        <p style={{ margin: "5px 0" }}>© 2026 <strong>V-Taxi Service</strong> | Built by Vikas</p>
        <Link to="/admin" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#bbb", textDecoration: "none", fontSize: "12px", marginTop: "10px" }}>
           <Settings size={14} /> Admin Access
        </Link>
      </footer>
    </div>
  );
}