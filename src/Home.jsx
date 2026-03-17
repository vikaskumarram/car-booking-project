import "./index.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Printer } from "lucide-react";

const cityDistances = {
  "Aligarh, UP-Mathura, UP": 65,
  "Mathura, UP-Aligarh, UP": 65,
  "Lucknow, UP-Kanpur, UP": 95,
  "Kanpur, UP-Lucknow, UP": 95,
  "Lucknow, UP-Varanasi, UP": 310,
  "Varanasi, UP-Lucknow, UP": 310,
  "Delhi, NCR-Noida, UP": 35,
  "Noida, UP-Delhi, NCR": 35,
  "Delhi, NCR-Agra, UP": 230,
  "Agra, UP-Delhi, NCR": 230,
  "Lucknow, UP-Delhi, NCR": 530,
  "Delhi, NCR-Lucknow, UP": 530,
};

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

  const cities = [
    "Lucknow, UP",
    "Kanpur, UP",
    "Varanasi, UP",
    "Agra, UP",
    "Noida, UP",
    "Delhi, NCR",
    "Mumbai, Maharashtra",
    "Mathura, UP",
    "Aligarh, UP",
  ];

  const handlePrint = () => window.print();

  const handleInputChange = (e, field) => {
    const val = e.target.value;
    if (field === "pickup") setPickup(val);
    else setDrop(val);

    setActiveField(field);

    if (val.length > 0) {
      const filtered = cities.filter((c) =>
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

  const handleFinalDone = () => {
    setReceiptData({
      car: currentCar,
      from: pickup,
      to: drop,
      date: rideDate,
      time: rideTime,
      distance: distance,
      fare: distance * currentCar.price_per_km,
      otp: otp,
    });

    setIsBooked(false);
    setShowFinalReceipt(true);
    setShowForm(false);
    alert("Booking Confirmed! ✅");
  };

  const handleCancel = () => {
    if (window.confirm("⚠️ Do you want to cancel?")) {
      setIsBooked(false);
      navigate("/booknow");
    }
  };

  return (
    <div
      className="home-main-layout"
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {showForm && (
        <div
          className="ride-container no-print"
          style={{ flex: "1", minWidth: "350px", maxWidth: "600px" }}
        >
          <h1 className="main-title">India Moves On Vikas Taxi!</h1>

          <div className="input-group" style={{ position: "relative" }}>
            <div className="field-box">
              <input
                type="text"
                placeholder="📍 Pickup"
                value={pickup}
                onFocus={() => setActiveField("pickup")}
                onChange={(e) => handleInputChange(e, "pickup")}
              />
            </div>
            <div className="field-box">
              <input
                type="text"
                placeholder="🏁 Drop"
                value={drop}
                onFocus={() => setActiveField("drop")}
                onChange={(e) => handleInputChange(e, "drop")}
              />
            </div>

            {/* City Suggestions List */}
            {activeField && suggestions.length > 0 && (
              <ul
                className="suggestion-list"
                style={{
                  position: "absolute",
                  zIndex: 999,
                  width: "100%",
                  background: "white",
                  border: "1px solid #ddd",
                  padding: "0",
                  listStyle: "none",
                  top: activeField === "pickup" ? "45px" : "95px",
                }}
              >
                {suggestions.map((city, i) => (
                  <li
                    key={i}
                    onClick={() => selectCity(city)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    🏢 {city}
                  </li>
                ))}
              </ul>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <input
                type="date"
                value={rideDate}
                onChange={(e) => setRideDate(e.target.value)}
                style={{ flex: 1, padding: "10px" }}
              />
              <input
                type="time"
                value={rideTime}
                onChange={(e) => setRideTime(e.target.value)}
                style={{ flex: 1, padding: "10px" }}
              />
            </div>
          </div>
          <button
            className="main-book-btn"
            style={{ marginTop: "20px" }}
            onClick={handleBook}
          >
            Confirm Ride
          </button>
        </div>
      )}

      {showFinalReceipt && receiptData && (
        <div
          className="side-receipt-container"
          style={{ flex: "1", maxWidth: "400px", margin: "0 auto" }}
        >
          <div
            className="receipt-card printable-receipt"
            style={{
              border: "2px solid #27ae60",
              background: "#fff",
              borderRadius: "15px",
            }}
          >
            <div
              className="receipt-header"
              style={{
                background: "#27ae60",
                padding: "15px",
                color: "white",
                textAlign: "center",
              }}
            >
              <h2 style={{ margin: 0 }}>V-TAXI RECEIPT</h2>
            </div>

            <div className="receipt-body" style={{ padding: "20px" }}>
              <div className="receipt-info">
                <div className="receipt-row">
                  <span>OTP:</span> <strong>{receiptData.otp}</strong>
                </div>
                <div className="receipt-row">
                  <span>Car:</span> <strong>{receiptData.car.name}</strong>
                </div>
                <div className="receipt-row">
                  <span>From:</span> <strong>{receiptData.from}</strong>
                </div>
                <div className="receipt-row">
                  <span>To:</span> <strong>{receiptData.to}</strong>
                </div>
                <div className="receipt-row">
                  <span>Distance:</span>{" "}
                  <strong>{receiptData.distance} KM</strong>
                </div>
                <div className="receipt-row">
                  <span>Date:</span> <strong>{receiptData.date}</strong>
                </div>
                <div className="receipt-row">
                  <span>Total Fare:</span>{" "}
                  <strong style={{ fontSize: "1.2rem" }}>
                    ₹{receiptData.fare}
                  </strong>
                </div>
              </div>
            </div>

            <div
              className="no-print"
              style={{
                display: "flex",
                gap: "10px",
                padding: "15px",
                background: "#eee",
              }}
            >
              <button
                onClick={handlePrint}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <Printer size={18} /> Print
              </button>
              <button
                onClick={() => navigate("/booknow")}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#333",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      )}

      {isBooked && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Finalize Booking?</h2>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={handleFinalDone}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Done
              </button>
              <button
                onClick={handleCancel}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
