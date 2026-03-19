import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function EditProfile({ setUser }) {
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [name, setName] = useState(savedUser.name || "");
  const [pic, setPic] = useState(savedUser.profilePic || "");
  const navigate = useNavigate();

  const handleSave = () => {
    const updatedUser = { ...savedUser, name: name, profilePic: pic };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser); // Navbar ko turant update karne ke liye
    alert("Profile Updated! ✅");
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Edit Profile</h2>
        <label>Your Name</label>
        <input 
          type="text" value={name} className="login-input"
          onChange={(e) => setName(e.target.value)} 
        />
        <label>Profile Picture URL</label>
        <input 
          type="text" value={pic} className="login-input"
          onChange={(e) => setPic(e.target.value)} 
        />
        <button onClick={handleSave} className="login-button">Save Changes</button>
      </div>
    </div>
  );
}