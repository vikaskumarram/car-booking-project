import "./index.css";
import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Contact } from "./Contact";
import { Services } from "./services";
import { About } from "./About";
import { Footer } from "./Footer";
import { LandingPage } from "./LandingPage";
import { Booknow} from "./Booknow"

export default function App() {
  return (
    <>
      <nav className="navbar">
        <div>
          <img className="first-logo" src="/V-taxi logo2.JPG" alt="" />
        </div>

        <div className="navbar-taxt">
          <Link to="/Home">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Services">Services</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/Booknow">Booknow</Link>
        </div>
      </nav>


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Booknow" element={<Booknow />} />
        
      </Routes>

      <Footer />

    </>
  );
}
