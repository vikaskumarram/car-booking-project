
import "./index.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export function Home() {
  const location = useLocation();
  const selectedCar = location.state?.selectedCar;

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [otp, setOtp] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [distance, setDistance] = useState(0);

  // India aur Uttar Pradesh ki Famous Cities List
  const cities = [
    // UP Special Cities
    "Lucknow, UP",
    "Kanpur, UP",
    "Varanasi, UP",
    "Agra, UP",
    "Prayagraj, UP",
    "Meerut, UP",
    "Ghaziabad, UP",
    "Noida, UP",
    "Bareilly, UP",
    "Aligarh, UP",
    "Moradabad, UP",
    "Gorakhpur, UP",
    "Ayodhya, UP",
    "Jhansi, UP",
    "Mathura, UP",
    // Major India Cities
    "Mumbai, Maharashtra",
    "Delhi, NCR",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Ahmedabad, Gujarat",
    "Kolkata, West Bengal",
    "Jaipur, Rajasthan",
    "Patna, Bihar",
    "Bhopal, MP",
  ];

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    field === "pickup" ? setPickup(value) : setDrop(value);
    setActiveField(field);

    if (value.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase()),
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
      // UP ke andar ya bahar ke liye random KM (20 to 600 KM)
      const randomKM = Math.floor(Math.randomKM() * 580) + 20;
      setDistance(randomKM);
    }
    setSuggestions([]);
    setActiveField(null);
  };

  const handleBook = () => {
    if (!pickup || !drop) {
      alert("Please enter both locations! 📍");
      return;
    }
    const newOtp = Math.floor(1000 + Math.random() * 9000);
    setOtp(newOtp);
    setIsBooked(true);
  };

  const totalFare = selectedCar ? distance * selectedCar.price_per_km : 0;

  return (
    <div className="hero-page-wrapper">
      <div className="ride-container">
        <h1 className="main-title">India Moves On vikas taxi! 🚕</h1>

        {selectedCar && (
          <div className="selected-car-big-card">
            <div className="card-badge">Selected Sawari</div>
            <div className="card-content">
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                className="big-car-img"
              />
              <div className="big-car-info">
                <h2>{selectedCar.name}</h2>
                <p className="big-rate">
                  ₹{selectedCar.price_per_km} <small>/ km</small>
                </p>
                <p className="eta-text">
                  ⭐ {selectedCar.rating} • 5 mins away
                </p>
              </div>
            </div>

            {pickup && drop && distance > 0 && (
              <div
                className="fare-calculator-section"
                style={{
                  marginTop: "15px",
                  borderTop: "1px dashed #ccc",
                  paddingTop: "10px",
                }}
              >
                <p>
                  Total Distance: <b>{distance} KM</b>
                </p>
                <h3 style={{ color: "#27ae60" }}>Total Fare: ₹{totalFare}</h3>
              </div>
            )}
          </div>
        )}

        <div className="input-group" style={{ position: "relative" }}>
          <div className="field-box">
            <span className="dot pickup-dot"></span>
            <input
              type="text"
              placeholder="Enter Pickup Location"
              value={pickup}
              onChange={(e) => handleInputChange(e, "pickup")}
            />
          </div>
          <div className="field-box">
            <span className="dot drop-dot"></span>
            <input
              type="text"
              placeholder="Enter Drop Location"
              value={drop}
              onChange={(e) => handleInputChange(e, "drop")}
            />
          </div>

          {suggestions.length > 0 && (
            <ul
              className="suggestion-list"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                zIndex: 100,
                maxHeight: "200px",
                overflowY: "auto",
                padding: 0,
              }}
            >
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  onClick={() => selectCity(city)}
                  style={{
                    listStyle: "none",
                    padding: "12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                    textAlign: "left",
                  }}
                >
                  📍 {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="main-book-btn" onClick={handleBook}>
          {selectedCar ? `Confirm Booking (₹${totalFare})` : "Book Your Ride"}
        </button>

        {isBooked && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="success-icon">✅</div>
              <h2>Booking Successful!</h2>
              <div className="otp-container">
                <p>Driver OTP:</p>
                <h1 className="otp-number">{otp}</h1>
              </div>
              <p className="route-text">
                <b>{pickup}</b> ➔ <b>{drop}</b>
              </p>
              <p>
                Distance: {distance} KM | Bill: <b>₹{totalFare}</b>
              </p>
              <button className="close-btn" onClick={() => setIsBooked(false)}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
