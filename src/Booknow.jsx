// import React, { useEffect, useState } from "react";
// import "./index.css";
// export function Booknow() {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     fetch("https://6971d21b32c6bacb12c49d70.mockapi.io/cardetails")
//       .then((res) => res.json())
//       .then((data) => setCars(data));
//   }, []);
//   return (
//     <div>
//       <div className="car-list-container">
//         {/* <div className="select-ride">
//           {" "}
//           <h1>Select a Ride</h1>
//         </div> */}
//         <div className="ride-selection-header">
//           <h2>Pick Your Perfect Ride!</h2>
//         </div>
//         <div className="car-grid">
//           {cars.map((car) => (
//             <div key={car.id} className="car-card">
//               <div className="car-image">
//                 <img src={car.image} alt={car.name} />
//               </div>
//               <div className="car-info">
//                 <div className="car-header">
//                   <h4>{car.name}</h4>
//                   <span className="car-rating">⭐ {car.rating}</span>
//                 </div>
//                 <p className="car-type">
//                   {car.type} • {car.eta} away
//                 </p>
//                 <p className="car-price">₹{car.price_per_km}/km</p>
//               </div>
//               <button className="select-btn">Choose</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import "./index.css";

export function Booknow() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetch("https://6971d21b32c6bacb12c49d70.mockapi.io/cardetails")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Data load nahi hua:", err));
  }, []);

  // Button click handle karne ka function
  const handleChoose = (car) => {
    // Ye line user ko Home page par bhej degi aur selected car ka data bhi saath legi
    navigate("/", { state: { selectedCar: car } });
  };

  return (
    <div>
      <div className="car-list-container">
        <div className="ride-selection-header">
          <h2>Pick Your Perfect Ride!</h2>
        </div>
        
        <div className="car-grid">
          {cars.map((car) => (
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

              {/* Button par handleChoose function laga diya hai */}
              <button 
                className="select-btn" 
                onClick={() => handleChoose(car)}
              >
                Choose
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}