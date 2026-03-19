import React from "react";
import { CheckCircle, X, User, MapPin } from "lucide-react";

export function BookingConfirmation({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  // Total price calculate karne ke liye (Distance * Fare)
  const totalBill = (parseFloat(data.distance || 0) * parseFloat(data.price_per_km || 0)).toFixed(2);

  return (
    <div className="modal-overlay">
      <div className="booking-success-card">

        <button className="close-x" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="success-icon">
          <CheckCircle size={50} color="#27ae60" />
        </div>

        <h2 style={{ color: "#1519e5", marginBottom: "5px" }}>Booking Done!</h2>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Aapki ride confirm ho gayi hai.
        </p>

        <div className="booked-car-info">
          {/* User Name Section */}
          <div className="user-receipt-header" style={{ 
            borderBottom: "1px dashed #ccc", 
            paddingBottom: "10px", 
            marginBottom: "10px",
            textAlign: "left", 
            marginTop: "20px",
          }}>
            <p style={{ margin: 0, fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" }}>
              <User size={16} color="#333" /> 
              <strong>Passenger:</strong> {data.userName || "Guest User"}
            </p>
          </div>

          <img src={data.image} alt={data.name} className="booked-img" />

          <div className="details-grid-simple">
             <div className="detail-item">
              <strong>User:</strong> {data.name}
            </div>
            <div className="detail-item">
              <strong>Car:</strong> {data.name}
            </div>
            <div className="detail-item">
              <strong>Type:</strong> {data.type}
            </div>
          
            <div className="detail-item">
              <strong>Distance:</strong> {data.distance} KM
            </div>
            <div className="detail-item">
              <strong>Fare:</strong> ₹{data.price_per_km}/km
            </div>
            <div className="detail-item">
              <strong>ETA:</strong> {data.eta || "Instant"}
            </div>

            {/* Total Bill Highlight */}
            <div className="detail-item total-highlight" style={{ 
              gridColumn: "span 2", 
              background: "#f1fcf4", 
              padding: "8px", 
              borderRadius: "5px",
              marginTop: "5px",
              border: "1px solid #27ae60"
            }}>
              <strong style={{ color: "#27ae60" }}>Total Amount:</strong> ₹{totalBill}
            </div>
          </div>
        </div>

        <button className="done-btn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}