import "./index.css";
import React, { useState, } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Printer, Settings, MapPin, Clock, Calendar, Car, CheckCircle } from "lucide-react"; 
import { cityDistances, citiesList } from "./cityData.jsx";

export function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Car load karne ka logic (Memory se ya selection se)
  const [currentCar, setCurrentCar] = useState(() => {
    const navState = location.state?.selectedCar;
    const localState = JSON.parse(localStorage.getItem("selectedCar"));
    return navState || localState || null;
  });

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
      const dist = cityDistances[routeKey] || cityDistances[reverseKey] || 100;
      setDistance(dist);
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

  const handleFinalDone = () => {
    const fare = distance * (currentCar?.price_per_km || 10);
    const newBooking = {
      car: currentCar,
      from: pickup,
      to: drop,
      date: rideDate,
      time: rideTime,
      distance: distance,
      fare: fare,
      otp: otp,
    };

    const existingBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
    localStorage.setItem("allBookings", JSON.stringify([...existingBookings, newBooking]));

    setReceiptData(newBooking);
    setIsBooked(false);
    setShowFinalReceipt(true);
    setShowForm(false);
    
    // --- SAB KUCH CLEAN KAREIN (Forms Reset) ---
    setPickup("");
    setDrop("");
    setDistance(0);
    setRideDate("");
    setRideTime("");
    setCurrentCar(null); 
    localStorage.removeItem("selectedCar"); 
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
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
              <ul className="suggestion-list" style={{ position: "absolute", zIndex: 999, width: "100%", background: "white", border: "1px solid #ddd", top: activeField === "pickup" ? "45px" : "95px", maxHeight: "200px", overflowY: "auto", listStyle: "none", padding: 0, borderRadius: "8px" }}>
                {suggestions.map((city, i) => (
                  <li key={i} onClick={() => selectCity(city)} style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #eee" }}>🏢 {city}</li>
                ))}
              </ul>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <input type="date" value={rideDate} onChange={(e) => setRideDate(e.target.value)} style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} />
              <input type="time" value={rideTime} onChange={(e) => setRideTime(e.target.value)} style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} />
            </div>
          </div>

          {/* --- BIGGER SELECTED CAR CARD --- */}
          {currentCar ? (
            <div style={{ 
              marginTop: "2rem", 
             
              background: "#fff", 
              borderRadius: "20px", 
              border: "3px solid #27ae60", 
              boxShadow: "0 10px 30px rgba(39, 174, 96, 0.15)",
              width: "100%" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
                  <div style={{ 
                    background: "#eafaf1", 
                    width: "110px", 
                    height: "90px", 
                    borderRadius: "15px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}>
                    {currentCar.image ? (
                      <img src={currentCar.image} alt="car" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      <Car size={60} color="#27ae60" />
                    )}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "13px", color: "#27ae60", fontWeight: "bold", letterSpacing: "1px" }}>SELECTED VEHICLE</p>
                    <h2 style={{ margin: "5px 0", color: "#2c3e50", fontSize: "32px" }}>{currentCar.name}</h2>
                    <span style={{ background: "#27ae60", color: "white", padding: "3px 12px", borderRadius: "20px", fontSize: "14px" }}>
                      ₹{currentCar.price_per_km}/km
                    </span>
                  </div>
                </div>
              </div>

              {pickup && drop && (
                <div style={{ marginTop: "25px", paddingTop: "20px", borderTop: "2px dashed #ddd", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "14px", color: "#22e34b" }}>Total Distance</p>
                    <span style={{ fontSize: "22px", fontWeight: "bold", color: "#333" }}><MapPin size={20} /> {distance} KM</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>Estimated Fare</p>
                    <span style={{ fontSize: "36px", fontWeight: "900", color: "#e67e22" }}>₹{distance * currentCar.price_per_km}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ marginTop: "20px", padding: "20px", background: "#fff3cd", borderRadius: "12px", textAlign: "center", border: "1px solid #ffeeba" }}>
              <p style={{ color: "#856404", margin: 0, fontSize: "16px" }}>⚠️ Please <Link to="/booknow" style={{ fontWeight: "bold", color: "#856404" }}>Choose a Car</Link> first.</p>
            </div>
          )}

          <button className="main-book-btn" style={{ marginTop: "25px", width: "100%", padding: "18px", fontSize: "20px", background: "#27ae60", color: "white", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 5px 15px rgba(39,174,96,0.3)" }} onClick={handleBook}>Confirm Ride</button>
        </div>
      )}

      {/* --- RECEIPT SECTION --- */}
      {showFinalReceipt && receiptData && (
        <div className="side-receipt-container" style={{ width: "100%", maxWidth: "450px" }}>
          <div className="receipt-card printable-receipt" style={{ border: "2px solid #27ae60", background: "#fff", borderRadius: "15px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}>
            <div style={{ background: "#27ae60", padding: "20px", color: "white", textAlign: "center" }}><h2 style={{ margin: 0 }}>V-TAXI RECEIPT</h2></div>
            <div style={{ padding: "30px" }}>
                <p style={{ fontSize: "18px" }}><strong>OTP:</strong> <span style={{ color: "#e67e22" }}>{receiptData.otp}</span></p>
                <p><strong>Car:</strong> {receiptData.car?.name}</p>
                <p><strong>Route:</strong> {receiptData.from} ➔ {receiptData.to}</p>
                <p><strong>Distance:</strong> {receiptData.distance} KM</p>
                <p><strong>Date:</strong> {receiptData.date} | {receiptData.time}</p>
                <hr style={{ margin: "20px 0" }} />
                <h2 style={{ color: "#27ae60", textAlign: "center" }}>Total Fare: ₹{receiptData.fare}</h2>
            </div>
            <div className="no-print" style={{ display: "flex", gap: "10px", padding: "20px", background: "#f8f9fa" }}>
              <button onClick={handlePrint} style={{ flex: 1, padding: "12px", background: "#27ae60", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}><Printer size={18} /> Print</button>
              <button onClick={() => { setShowFinalReceipt(false); setShowForm(true); }} style={{ flex: 1, padding: "12px", background: "#333", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Finish</button>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION MODAL --- */}
      {isBooked && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div className="modal-content" style={{ padding: "40px", background: "white", borderRadius: "20px", textAlign: "center", width: "90%", maxWidth: "400px" }}>
            <CheckCircle size={60} color="#27ae60" style={{ marginBottom: "20px" }} />
            <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Confirm Booking?</h2>
            <p style={{ color: "#666" }}>Trip from <strong>{pickup}</strong> to <strong>{drop}</strong></p>
            <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
              <button onClick={handleFinalDone} style={{ flex: 1, padding: "14px", background: "#27ae60", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>Confirm</button>
              <button onClick={handleCancel} style={{ flex: 1, padding: "14px", background: "#f1f1f1", color: "#333", border: "none", borderRadius: "10px", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <footer className="no-print" style={{ width: "100%", marginTop: "auto", padding: "30px 0", textAlign: "center", color: "#0f1ffa" }}>
        <p style={{ margin: "5px 0" }}>© 2026 <strong>V-Taxi Service</strong> | Built by Vikas Kumar Ram</p>
        <Link to="/admin" style={{ fontSize: "13px", color: "#f10bca", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}><Settings size={14} /> Admin Access</Link>
      </footer>
    </div>
  );
}