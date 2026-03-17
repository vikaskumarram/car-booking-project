import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, ThumbsUp, ThumbsDown } from "lucide-react"; // Edit icon add kiya
import "./index.css";

export function Booknow({ isLoggedIn }) {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://6971d21b32c6bacb12c49d70.mockapi.io/cardetails";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Data load nahi hua:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Kya aap is car ko delete karna chahte hain?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => {
        setCars(cars.filter((car) => car.id !== id));
        alert("Car delete ho gayi! 🗑️");
      });
    }
  };

  // Edit function (Aap yahan edit ka logic likh sakte hain)
  const handleEdit = (car) => {
    alert(`Editing ${car.name}... (Iska logic aap add kar sakte hain)`);
    // Example: navigate(`/edit-car/${car.id}`);
  };

  const handleVote = (id, type) => {
    setCars(
      cars.map((car) => {
        if (car.id === id) {
          let currentRating = parseFloat(car.rating);
          let newRating = type === "up" ? currentRating + 0.1 : currentRating - 0.1;
          return { ...car, rating: newRating.toFixed(1) };
        }
        return car;
      }),
    );
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleChoose = (car) => {
    if (isLoggedIn) {
      alert(`Aapne ${car.name} Car selected! Now enter your location.`);
      localStorage.setItem("selectedCar", JSON.stringify(car));
      navigate("/"); 
    } else {
      alert("⚠️ First login your account or Signup to book a ride!");
      navigate("/login");
    }
  };

  return (
    <div className="booknow-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search your favorite car..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="car-list-container">
        <div className="car-grid">
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

                  <div className="action-bar">
                    <div className="admin-group" style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(car)}
                        className="icon-btn edit-btn"
                        title="Edit"
                      >
                        <Edit size={20} color="#007bff" />
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="icon-btn delete-btn"
                        title="Delete"
                      >
                        <Trash2 size={20} color="#e74c3c" />
                      </button>
                    </div>

                    <div className="vote-group">
                      <button onClick={() => handleVote(car.id, "up")} className="icon-btn like-btn">
                        <ThumbsUp size={20} />
                      </button>
                      <button onClick={() => handleVote(car.id, "down")} className="icon-btn dislike-btn">
                        <ThumbsDown size={20} />
                      </button>
                    </div>
                  </div>

                  <p className="car-type">{car.type} • {car.eta} away</p>
                  <p className="car-price">₹{car.price_per_km}/km</p>
                </div>

                <button className="select-btn" onClick={() => handleChoose(car)}>
                  Choose
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">No cars found! 🚗💨</p>
          )}
        </div>
      </div>
    </div>
  );
}