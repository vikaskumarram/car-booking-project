import "./index.css";
import { Link, Route, Routes } from "react-router";
// import { BrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { Contact } from "./Contact";
import { Services } from "./services";
import { About } from "./About";
import { Footer } from "./Footer";
import { Login } from "./Login";
export default function App() {
  return (
    <>
      <nav className="navbar">
        <img className="first-logo" src="public\V-taxi logo2.JPG" alt="" />
        <Link to="/Home">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Services">Services</Link>
        <Link to="/Contact"> Contact </Link>
        <Link to="/Login" className="Login-page">
          {" "}
          Login{" "}
        </Link>
      </nav>

      {/* <BrowserRouter> */}
        <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Services" element={<Services />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="Login" element={<Login />} />
        </Routes>
        <Footer />
      {/* </BrowserRouter> */}
    </>
  );
}

