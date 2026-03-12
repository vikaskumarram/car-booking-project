import { Navigate } from "react-router";

export function Footer() {
  return (

    <>
    <div className="foot">
      <img className="footer-logo" src="public\V-taxi logo.jpg" alt="" />
      <div className="foolow">
        <h2>Follow Us</h2>
      </div>

      <div className="social-links">
        <a href="https://twitter.com" target="_blank">
          🐦 X
        </a>

        <a href="https://youtube.com" target="_blank">
          ▶️ YouTube
        </a>
        <a href="https://facebook.com" target="_blank">
          📘 Facebook
        </a>
        <a href="https://instagram.com" target="_blank">
          📸 Instagram
        </a>
      </div>
      {/* <div>
        <h2>Contact</h2>
        <h4>📞6386031047</h4>
        <h4>jaivikash609@gmail.com</h4>
      </div> */}
      <div className="contact-info">
        <h2>📞 Contact</h2>

        <p>
          📱 <a href="tel:6386031047">+91 6386031047</a>
        </p>

        <p>
          <a href="mailto:jaivikash609@gmail.com">jaivikash609@gmail.com</a>
        </p>
      </div>
      <div>
        <h2>legal</h2>
        terms & conditions privacy policy, Refund & Cancellation policy,
        Connecting every corner of the city and village,
      </div>
    </div>
    </>
  );
}

