import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">Event<span>Sphere</span></h2>
        <p className="footer-tagline">Connecting moments. Celebrating experiences.</p>
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
          <a href="mailto:eventsphere@example.com" title="Email">✉️</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EventSphere. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
