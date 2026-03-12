// export function Home(){
//   return (

//     <div>
//       <div className="ride-container">
//         <h1>Bharat Moves On vikas taxi! 🚕</h1>
      
//         <input type="text" placeholder="Enter Pickup Location" />
//         <input type="text" placeholder="Enter Drop Location" />
//         <button>Book Ride</button>
//         </div>
//       </div>
    
//   );
// }
import "./index.css";
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
 // Ensure karein ki aapki CSS file properly linked hai

export function Home() {
  const location = useLocation();
  // Booknow page se bheja gaya car data yahan receive hoga
  const selectedCar = location.state?.selectedCar;

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [otp, setOtp] = useState(null);

  const handleBook = () => {
    if (!pickup || !drop) {
      alert("Please enter both locations! 📍");
      return;
    }
    
    // Random 4-digit OTP generate karna
    const newOtp = Math.floor(1000 + Math.random() * 9000);
    setOtp(newOtp);
    setIsBooked(true);
  };

  return (
    <div>
      <div className="ride-container">
        <h1>Bharat Moves On vikas taxi! 🚕</h1>

        {/* --- Selected Car Preview (Sirf tab dikhega jab car select hogi) --- */}
        {selectedCar && (
          <div className="selected-car-preview">
             <img src={selectedCar.image} alt={selectedCar.name} width="60" />
             <div className="selected-details">
                <span>Selected: <b>{selectedCar.name}</b></span>
                <small>Rate: ₹{selectedCar.price_per_km}/km</small>
             </div>
          </div>
        )}
      
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Enter Pickup Location" 
            value={pickup}
            onChange={(e) => setPickup(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Enter Drop Location" 
            value={drop}
            onChange={(e) => setDrop(e.target.value)} 
          />
        </div>
        
        <button className="main-book-btn" onClick={handleBook}>
          {selectedCar ? `Confirm ${selectedCar.name}` : "Book Ride"}
        </button>

        {/* --- Success Popup (Modal) --- */}
        {isBooked && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="success-icon">✅</div>
              <h2>Booking Successful!</h2>
              <p>Your taxi is being assigned.</p>
              
              <div className="otp-container">
                <span className="otp-label">Your OTP:</span>
                <h1 className="otp-code">{otp}</h1>
              </div>

              <div className="route-info">
                <p><b>From:</b> {pickup}</p>
                <p><b>To:</b> {drop}</p>
                {selectedCar && <p><b>Vehicle:</b> {selectedCar.name}</p>}
              </div>

              <button className="close-modal-btn" onClick={() => setIsBooked(false)}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 