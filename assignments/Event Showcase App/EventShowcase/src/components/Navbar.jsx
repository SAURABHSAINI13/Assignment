import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => (
  <nav className="navbar">
    <Link to="/events">Events</Link>
    <Link to="/signup">Signup</Link>
    <Link to="/">Login</Link>
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "Light" : "Dark"}
    </button>
  </nav>
);

export default Navbar;
