import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to <span>EventSphere</span></h1>
          <p className="hero-subtitle">Unite. Celebrate. Experience unforgettable events!</p>
          <Link to="/events" className="hero-btn">Explore Events</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
