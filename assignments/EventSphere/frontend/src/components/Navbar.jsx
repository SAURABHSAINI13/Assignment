import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  
  useEffect(() => {
    console.log('Navbar - Auth State:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Event<span>Sphere</span></Link>
        <nav>
          <ul className="navbar-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/about">About Us</Link></li>
            {isAuthenticated && <li><Link to="/ticket-registration">Register</Link></li>}
            {isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>}
            {isAuthenticated && <li><Link to="/create-event">Create Event</Link></li>}
            {isAuthenticated && <li><Link to="/make-admin">Make Admin</Link></li>}
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            {isAuthenticated ? (
              <li><button onClick={logout} className="nav-button">Logout</button></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
