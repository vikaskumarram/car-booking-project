import "./index.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const cityDistances = {
  "Aligarh, UP-Mathura, UP": 65, "Mathura, UP-Aligarh, UP": 65,
  "Lucknow, UP-Kanpur, UP": 95, "Kanpur, UP-Lucknow, UP": 95,
  "Lucknow, UP-Varanasi, UP": 310, "Varanasi, UP-Lucknow, UP": 310,
  "Delhi, NCR-Noida, UP": 35, "Noida, UP-Delhi, NCR": 35,
  "Delhi, NCR-Agra, UP": 230, "Agra, UP-Delhi, NCR": 230,
  "Lucknow, UP-Delhi, NCR": 530, "Delhi, NCR-Lucknow, UP": 530,
};

export function Home() {
  const location = useLocation();
  const selectedCar = location.state?.selectedCar;

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [notification, setNotification] = useState("");
  const [otp, setOtp] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [distance, setDistance] = useState(0);

  const cities = [
    "Lucknow, UP", "Kanpur, UP", "Varanasi, UP", "Agra, UP",
    "Prayagraj, UP", "Meerut, UP", "Ghaziabad, UP", "Noida, UP",
    "Bareilly, UP", "Aligarh, UP", "Moradabad, UP", "Gorakhpur, UP",
    "Ayodhya, UP", "Jhansi, UP", "Mathura, UP",
    "Mumbai, Maharashtra", "Delhi, NCR", "Bangalore, Karnataka",
    "Hyderabad, Telangana", "Ahmedabad, Gujarat", "Kolkata, West Bengal",
    "Jaipur, Rajasthan", "Patna, Bihar", "Bhopal, MP",
  ];

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleInputChange = (e, field) => {
    const val = e.target.value;
    field === "pickup" ? setPickup(val) : setDrop(val);
    setActiveField(field);

    if (val.length > 0) {
      const filtered = cities.filter((c) => c.toLowerCase().includes(val.toLowerCase()));
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

    
      // Agar distance data mein hai toh wo dikhayega, nahi toh fixed 100 KM
      const fixedDistance = 100; 
      const finalDist = cityDistances[routeKey] || cityDistances[reverseKey] || fixedDistance;
      setDistance(finalDist);
    }
    setSuggestions([]);
    setActiveField(null);
  };

  const handleBook = () => {
    if (!pickup || !drop || !selectedCar) {
      alert("Kripya Pickup, Drop aur Car sahi se select karein! 🍼📍");
      return;
    }
    setOtp(1234); 
    setIsBooked(true);
  };

  const handleFinalDone = () => {
    setIsBooked(false);
    setNotification("Your booking successful! 🎉🙅‍♂️");

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setPickup("");
      setDrop("");
      setDistance(0);
    }, 2000);
  };

  const totalFare = selectedCar ? distance * selectedCar.price_per_km : 0;

  return (
    <div className="hero-page-wrapper">
      {notification && <div className="toast-notification">{notification}</div>}

      <div className="ride-container">
        <h1 className="main-title">India Moves On Vikas Taxi! 🚕</h1>

        {selectedCar && (
          <div className="selected-car-big-card">
            <div className="card-badge">Selected Ride</div>
            <div className="card-content">
              <img src={selectedCar.image} alt={selectedCar.name} className="big-car-img" />
              <div className="big-car-info">
                <h2>{selectedCar.name}</h2>
                <p className="big-rate">₹{selectedCar.price_per_km} <small>/ km</small></p>
              </div>
            </div>
            {distance > 0 && (
              <div className="fare-calculator-section">
                <p>Total Distance: <b>{distance} KM</b></p>
                <h3 style={{ color: "#27ae60" }}>Total Fare: ₹{totalFare}</h3>
              </div>
            )}
          </div>
        )}

        <div className="input-group" style={{ position: "relative" }}>
          <div className="field-box">
            <input 
              type="text" 
              placeholder="Enter Pickup Location" 
              value={pickup} 
              onFocus={() => setActiveField("pickup")} 
              onChange={(e) => handleInputChange(e, "pickup")} 
            />
          </div>
          <div className="field-box">
            <input 
              type="text" 
              placeholder="Enter Drop Location" 
              value={drop} 
              onFocus={() => setActiveField("drop")} 
              onChange={(e) => handleInputChange(e, "drop")} 
            />
          </div>

          {activeField && suggestions.length > 0 && (
            <ul className="suggestion-list">
              {suggestions.map((city, index) => (
                <li key={index} onClick={() => selectCity(city)}> 🏢 {city}</li>
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
              <h2>Ride Confirmed!</h2>
              <div className="otp-container">
                <p>Your Ride OTP:</p>
                <h1 className="otp-number">{otp}</h1>
              </div>
              <p className="route-summary"><b>{pickup}</b> ➔ <b>{drop}</b></p>
              <p>Distance: {distance} KM | Bill: <b>₹{totalFare}</b></p>
              <button className="done-btn" onClick={handleFinalDone}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}