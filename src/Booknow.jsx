import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./index.css";

export function Booknow({ isLoggedIn }) { 
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 1. Search term ke liye state
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://6971d21b32c6bacb12c49d70.mockapi.io/cardetails")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Data load nahi hua:", err));
  }, []);

  // 2. Filter logic: Jo car name search se match karegi wahi dikhegi
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChoose = (car) => {
    if (isLoggedIn) {
      navigate("/", { state: { selectedCar: car } });
    } else {
      alert("⚠️ First login your account or Signup to book a ride!");
      navigate("/login"); 
    }
  };

  return (
    <div>
      {/* 🔍 Search Bar Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search your favorite car (e.g. Swift, Thar...)"
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)} // 3. Value update karein
        />
      </div>

      <div className="car-list-container">        
        <div className="car-grid">
          {/* 4. 'cars' ki jagah 'filteredCars' par map chalayein */}
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="car-card">
                <div className="car-image">
                  <img src={car.image} alt={car.name} />
                </div>
                
                <div className="car-info">
                  <div className="car-header">
                    <h4>{car.name}</h4>
                    <span className="car-rating">⭐ {car.rating}</span>
                  </div>
                  <p className="car-type">
                    {car.type} • {car.eta} away
                  </p>
                  <p className="car-price">₹{car.price_per_km}/km</p>
                </div>

                <button 
                  className="select-btn" 
                  onClick={() => handleChoose(car)}
                >
                  Choose
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">No cars found matching your search! 🚗💨</p>
          )}
        </div>
      </div>
    </div>
  );
}