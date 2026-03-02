import { useState } from "react";
export function Contact() {
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };
  const sendRequest = (e) => {
    e.preventDefault();
    console.log("Contact Data:", contact);
    alert("Thank you! Hum aapse jald hi contact karenge.");
    // Yahan aap API call kar sakte hain data save karne ke liye
  };
  return (
    <div className="contact-container">
    <div
      style={{ maxWidth: "350px", margin: "auto", fontFamily: "sans-serif" }}
    >
      <div className="conatact-us"><h3>Contact Us</h3></div>
      <form onSubmit={sendRequest}>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="text"
            name="fullName"
            placeholder="Name"
            value={contact.fullName}
            onChange={handleInputChange}
            required
            className="contact1"
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={contact.email}
            onChange={handleInputChange}
            required
            className="contact2"
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={contact.mobile}
            onChange={handleInputChange}
            required
            maxLength="10"
          className="contact3"
          />
        </div>

        <button type="submit" className="contact4">
          Request Call Back
        </button>
      </form>
    </div>
    </div>
  );
}
