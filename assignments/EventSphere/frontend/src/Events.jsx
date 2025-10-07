import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from './api/eventApi';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await fetchEvents();
        setEvents(eventsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    getEvents();
  }, []);

  const handleRegister = (eventId) => {
    // First check if user is authenticated, if not redirect to login
    const token = localStorage.getItem('token');
    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent(`/ticket-registration?event=${eventId}`)}`);
      return;
    }
    // If authenticated, navigate to ticket registration
    navigate(`/ticket-registration?event=${eventId}`);
  };

  return (
    <div className="events-page">
      <header className="events-header">
        <h2>🎉 Discover Upcoming Events</h2>
        <p>From tech talks to talent shows — there's something for everyone!</p>
      </header>
      
      {loading ? (
        <div className="loading-container">
          <p>Loading events...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : events.length === 0 ? (
        <div className="no-events-container">
          <p>No events found. Check back later for upcoming events!</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              {event.description && <p>{event.description}</p>}
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>

              <div className="event-card-actions">
                <button 
                  className="register-btn"
                  onClick={() => handleRegister(event._id)}
                >
                  Register Now
                </button>
                <button 
                className="ticket-btn"
                onClick={() => {
                  // First check if user is authenticated, if not redirect to login
                  const token = localStorage.getItem('token');
                  if (!token) {
                    navigate(`/login?redirect=${encodeURIComponent(`/ticket-registration?event=${event._id}`)}`);
                    return;
                  }
                  // If authenticated, navigate directly to ticket registration page
                  navigate(`/ticket-registration?event=${event._id}`);
                }}
              >
                Get Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
  );
};

export default Events;
