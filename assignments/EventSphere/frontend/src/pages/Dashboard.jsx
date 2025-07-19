import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">🎯 Student Dashboard</h1>
      <div className="dashboard-grid">
        <div className="card profile-card">
          <h2>👤 Profile</h2>
          <p><strong>Name:</strong> Saurabh Saini</p>
          <p><strong>College ID:</strong> CS2025A01</p>
          <p><strong>Email:</strong> saurabh@example.com</p>
        </div>

        <div className="card event-card">
          <h2>📅 Upcoming Events</h2>
          <ul className="event-list">
            <li>
              <span>AI & ML Workshop</span>
              <span className="event-date">Aug 1, 2025</span>
            </li>
            <li>
              <span>Hackathon 2025</span>
              <span className="event-date">Aug 10, 2025</span>
            </li>
          </ul>
        </div>

        <div className="card registered-card">
          <h2>✅ Registered Events</h2>
          <ul className="event-list">
            <li>
              <span>Cybersecurity Basics</span>
              <span className="status confirmed">Confirmed</span>
            </li>
            <li>
              <span>Web3 Meetup</span>
              <span className="status pending">Pending</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
