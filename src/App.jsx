
import "./index.css";
import { Link, Route, Routes, Navigate } from "react-router-dom"; 
import { Home } from "./Home";
import { Contact } from "./Contact";
import { Services } from "./services";
import { About } from "./About";
import { Footer } from "./Footer";
import { Booknow } from "./Booknow";
import { Login } from "./Login";
export default function App() {
  return (
    <>
      <nav className="navbar">
        <div>
          <img className="first-logo" src="/V-taxi logo2.JPG" alt="Logo" />
        </div>

        <div className="navbar-taxt">
          {/* Link ko "/" rakhein taaki default home khule */}
          
          <Link to="/">Home</Link> 
          <Link to="/About">About</Link>
          <Link to="/Services">Services</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/Booknow">Booknow</Link>
          <Link to="/Login">Login</Link>
          
        </div>
      </nav>

      <Routes>
    
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Booknow" element={<Booknow />} />
           <Route path="/Login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}