// export function About() {
//   return (
//     <>
//     <div className="about-content">
//       <div className="about1">
//         <h2>About V-Taxi</h2>
//         V-Taxi is the city's leading car booking service. that focuses on
//         comfort and reliability.
//       </div>
//       <div className="about2">
//         <h2>Our Specialties:</h2>
//         Comfortable Journey. On-time Pick-up and Drop. Home-like Environment and
//         Safety.
//       </div>
//       <div className="about3">
//         <h2>Mission:</h2>
//         Our mission is to provide VIP treatment to every customer at an
//         affordable rate.
//       </div>
//     </div>

//     </>
//   );
// }




export function About() {
  return (
    <>
      <div className="about-container">
        {/* Aapka Original Content */}
        <div className="about-content">
          <div className="about1">
            <h2>About V-Taxi</h2>
            V-Taxi is the city's leading car booking service. that focuses on
            comfort and reliability.
          </div>
          <div className="about2">
            <h2>Our Specialties:</h2>
            Comfortable Journey. On-time Pick-up and Drop. Home-like Environment and
            Safety.
          </div>
          <div className="about3">
            <h2>Mission:</h2>
            Our mission is to provide VIP treatment to every customer at an
            affordable rate.
          </div>
        </div>

        {/* New Professional Sections */}
        <div className="legal-section">
          <div className="legal-card">
            <h2>📜 Terms of Service</h2>
            <ul>
              <li>Users must provide valid contact details for bookings.</li>
              <li>Cancellations within 15 minutes of pickup may incur a small fee.</li>
              <li>V-Taxi reserves the right to refuse service in case of misconduct.</li>
              <li>Rates are calculated based on distance (per km) and waiting time.</li>
            </ul>
          </div>

          <div className="legal-card">
            <h2>🔒 Privacy Policy</h2>
            <ul>
              <li>We collect only necessary data like name, phone, and location.</li>
              <li>Your travel history is encrypted and never shared with third parties.</li>
              <li>Payment details are handled through secure, certified gateways.</li>
              <li>You can request to delete your account data at any time.</li>
            </ul>
          </div>

          <div className="legal-card safety-card">
            <h2>🛡️ Safety First</h2>
            <ul>
              <li><b>Verified Drivers:</b> Every driver undergoes a strict background check.</li>
              <li><b>SOS Support:</b> 24/7 emergency assistance for every ride.</li>
              <li><b>Live Tracking:</b> Share your live location with family or friends.</li>
              <li><b>Sanitized Cars:</b> We maintain high hygiene standards for every trip.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
