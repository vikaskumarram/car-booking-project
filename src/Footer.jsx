import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-col">
          <img
            className="footer-logo"
            src="public/v-taxi-logo.JPG"
            alt="Vikas Taxi"
          />
          <p className="brand-text">Fast, Safe, Reliable.</p>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-list">
            <li onClick={() => handleNavigation("/")}>🏠 Home</li>
            <li onClick={() => handleNavigation("/About")}>📖 About Us</li>
            <li onClick={() => handleNavigation("/Services")}>🚕 Services</li>
            <li onClick={() => handleNavigation("/Booknow")}>📅 Book Now</li>
            <li onClick={() => handleNavigation("/Contact")}>📞 Contact</li>
            <li onClick={() => handleNavigation("/Login")}>🗝️ Login</li>
            {/* --- Naya Admin Dashboard Button --- */}
            <li 
              onClick={() => handleNavigation("/admin")} 
              style={{ color: "white", fontWeight: "bold" }}
            >
              📊 Admin Dashboard
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Support</h3>
          <div className="footer-list">
            <a href="tel:6386031047" className="footer-link">
              📱 +91 6386031047
            </a>
            <a href="mailto:jaivikash609@gmail.com" className="footer-link">
              📧 jaivikash609@gmail.com
            </a>
            <p className="support-subtext">Available 24/7 for you.</p>
          </div>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Download App</h3>
          <div className="app-btns">
            <a href="https://play.google.com" target="_blank" rel="noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Play Store"
              />
            </a>
            <a href="https://apple.com" target="_blank" rel="noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
              />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Legal & Policy</h3>
          <div className="footer-list">
            <div className="legal-box">
              <span
                onClick={() => handleNavigation("/About")}
                style={{ cursor: "pointer" }}
              >
                📜 Terms of Service
              </span>
              <p>Rules for our taxi app.</p>
            </div>
            <div className="legal-box">
              <span
                onClick={() => handleNavigation("/About")}
                style={{ cursor: "pointer" }}
              >
                🔒 Privacy Policy
              </span>
              <p>We protect your data.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
              alt="X"
            />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
              alt="YT"
            />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
              alt="FB"
            />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="IG"
            />
          </a>
        </div>
        <p className="tagline">
          V-Taxi: Reaching every corner of the nation, connecting cities and
          villages with trust.
        </p>
        <p className="copyright-text">
          Vikas Taxi © 2026 | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
