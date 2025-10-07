import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="footer-logo">Event<span>Sphere</span></h2>
            <p className="footer-tagline">Connecting moments. Celebrating experiences.</p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
              <a href="mailto:support@eventsphere.com" title="Email">✉️</a>
            </div>
          </div>
          
          <div className="footer-links-container">
            <div className="footer-links-column">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3>For Attendees</h3>
              <ul>
                <li><Link to="/events">Find Events</Link></li>
                <li><Link to="/login">My Tickets</Link></li>
                <li><Link to="/faq">Event Guidelines</Link></li>
                <li><Link to="/contact">Support</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3>For Organizers</h3>
              <ul>
                <li><Link to="/create-event">Create Event</Link></li>
                <li><Link to="/dashboard">Manage Events</Link></li>
                <li><Link to="/contact">Partner With Us</Link></li>
                <li><Link to="/faq">Resources</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest events and offers</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {new Date().getFullYear()} EventSphere. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
