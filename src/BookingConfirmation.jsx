import React from "react";
import { CheckCircle, X } from "lucide-react";

export function BookingConfirmation({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  return (
    <div className="modal-overlay">
      <div className="booking-success-card">

        <button className="close-x" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="success-icon">
          <CheckCircle size={50} color="#27ae60" />
        </div>

        <h2 style={{ color: "#27ae60", marginBottom: "5px" }}>Booking Done!</h2>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Aapki ride confirm ho gayi hai.
        </p>

        <div className="booked-car-info">
          <img src={data.image} alt={data.name} className="booked-img" />

          <div className="details-grid-simple">
            <div className="detail-item">
              <strong>Car:</strong> {data.name}
            </div>
            <div className="detail-item">
              <strong>Type:</strong> {data.type}
            </div>
            {/* Naya Distance Field */}
            <div className="detail-item">
              <strong>Distance:</strong> {data.distance} KM
            </div>
            <div className="detail-item">
              <strong>Fare:</strong> ₹{data.price_per_km}/km
            </div>
            <div className="detail-item">
              <strong>ETA:</strong> {data.eta || "Instant"}
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