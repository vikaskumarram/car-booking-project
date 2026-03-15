// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./index.css";

// export function Booknow({ isLoggedIn }) {
//   const [cars, setCars] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // 1. Search term ke liye state
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("https://6971d21b32c6bacb12c49d70.mockapi.io/cardetails")
//       .then((res) => res.json())
//       .then((data) => setCars(data))
//       .catch((err) => console.error("Data load nahi hua:", err));
//   }, []);

//   // 2. Filter logic: Jo car name search se match karegi wahi dikhegi
//   const filteredCars = cars.filter((car) =>
//     car.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleChoose = (car) => {
//     if (isLoggedIn) {
//       navigate("/", { state: { selectedCar: car } });
//     } else {
//       alert("⚠️ First login your account or Signup to book a ride!");
//       navigate("/login");
//     }
//   };

//   return (
//     <div>
//       {/* 🔍 Search Bar Section */}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search your favorite car (e.g. Swift, Thar...)"
//           className="search-input"
//           onChange={(e) => setSearchTerm(e.target.value)} // 3. Value update karein
//         />
//       </div>

//       <div className="car-list-container">
//         <div className="car-grid">
//           {/* 4. 'cars' ki jagah 'filteredCars' par map chalayein */}
//           {filteredCars.length > 0 ? (
//             filteredCars.map((car) => (
//               <div key={car.id} className="car-card">
//                 <div className="car-image">
//                   <img src={car.image} alt={car.name} />
//                 </div>

//                 <div className="car-info">
//                   <div className="car-header">
//                     <h4>{car.name}</h4>
//                     <span className="car-rating">⭐ {car.rating}</span>
//                   </div>
//                   <p className="car-type">
//                     {car.type} • {car.eta} away
//                   </p>
//                   <p className="car-price">₹{car.price_per_km}/km</p>
//                 </div>

//                 <button
//                   className="select-btn"
//                   onClick={() => handleChoose(car)}
//                 >
//                   Choose
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="no-results">No cars found matching your search! 🚗💨</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, ThumbsUp, ThumbsDown } from "lucide-react";
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

  const handleEdit = (car) => {
    const newName = prompt("Naya car naam enter karein:", car.name);
    if (newName) {
      fetch(`${API_URL}/${car.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...car, name: newName }),
      })
        .then((res) => res.json())
        .then((updatedCar) => {
          setCars(cars.map((c) => (c.id === car.id ? updatedCar : c)));
          alert("Car detail update ho gayi! ✏️");
        });
    }
  };

  const handleVote = (id, type) => {
    setCars(
      cars.map((car) => {
        if (car.id === id) {
          let currentRating = parseFloat(car.rating);
          let newRating =
            type === "up" ? currentRating + 0.1 : currentRating - 0.1;
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
      navigate("/", { state: { selectedCar: car } });
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

                  {/* 🛠️ Fixed Action Bar: Icons Amne-Samne */}
                  <div className="action-bar">
                    <div className="admin-group">
                      <button
                        onClick={() => handleEdit(car)}
                        className="icon-btn edit-btn"
                        title="Edit"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="icon-btn delete-btn"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="vote-group">
                      <button
                        onClick={() => handleVote(car.id, "up")}
                        className="icon-btn like-btn"
                        title="Like"
                      >
                        <ThumbsUp size={20} />
                      </button>
                      <button
                        onClick={() => handleVote(car.id, "down")}
                        className="icon-btn dislike-btn"
                        title="Dislike"
                      >
                        <ThumbsDown size={20} />
                      </button>
                    </div>
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
            <p className="no-results">No cars found! 🚗💨</p>
          )}
        </div>
      </div>
    </div>
  );
}
