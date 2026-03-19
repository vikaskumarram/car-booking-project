import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, ThumbsUp, ThumbsDown, X } from "lucide-react"; 
import "./index.css";

export function Booknow({ isLoggedIn }) {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- States for Edit Modal ---
  const [editingCar, setEditingCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const API_URL = "http://127.0.0.1:5000/api/cars";

  // Data Fetching
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Data load failed:", err));
  }, []);

  // 1. Delete Logic
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => {
        setCars(cars.filter((car) => car.id !== id));
        alert("Car deleted successfully! 🗑️");
      });
    }
  };

  // 2. Edit Logic
  const handleEdit = (car) => {
    const confirmEdit = window.confirm(`Do you want to edit ${car.name}?`);
    if (confirmEdit) {
      setEditingCar({ ...car }); 
      setShowModal(true); 
    }
  };

  // 3. Update Logic
  const handleUpdate = () => {
    fetch(`${API_URL}/${editingCar.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingCar),
    })
      .then((res) => res.json())
      .then((updatedData) => {
        setCars(cars.map((c) => (c.id === updatedData.id ? updatedData : c)));
        setShowModal(false);
        alert("Car details updated successfully! ✅");
      })
      .catch(() => alert("Update failed! ❌"));
  };

  // 4. Rating Logic
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
      alert(`You have selected ${car.name}! Now proceed to enter your location.`);
      localStorage.setItem("selectedCar", JSON.stringify(car));
      navigate("/"); 
    } else {
      alert("⚠️ Please login or signup first to book a ride!");
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
                  {/* Default logic removed - simple img tag */}
                  <img src={car.image} alt={car.name} />
                </div>

                <div className="car-info">
                  <div className="car-header">
                    <h4>{car.name}</h4>
                    <span className="car-rating">⭐ {car.rating}</span>
                  </div>

                  <div className="action-bar">
                    <div className="admin-group" style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleEdit(car)} className="icon-btn edit-btn" title="Edit">
                        <Edit size={20} color="#007bff" />
                      </button>
                      <button onClick={() => handleDelete(car.id)} className="icon-btn delete-btn" title="Delete">
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

      {/* --- EDIT MODAL --- */}
      {showModal && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', 
          justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }}>
          <div className="modal-card" style={{
            background: 'white', padding: '25px', borderRadius: '15px', 
            width: '90%', maxWidth: '400px', position: 'relative'
          }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '15px', top: '15px', border: 'none', background: 'none', cursor: 'pointer' }}>
              <X size={24} color="#666" />
            </button>

            <h3 style={{ marginBottom: '20px', color: '#333' }}>Edit Car Details</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>Car Name</label>
              <input 
                type="text" 
                value={editingCar.name} 
                onChange={(e) => setEditingCar({...editingCar, name: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>Price (₹/km)</label>
              <input 
                type="number" 
                value={editingCar.price_per_km} 
                onChange={(e) => setEditingCar({...editingCar, price_per_km: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleUpdate} style={{ flex: 1, padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: '#f5f5f5', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}