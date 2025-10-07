import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event, registered = false, onRegister }) => {
  if (!event) return null;
  const navigate = useNavigate();

  const handleGetTicket = () => {
    // Navigate directly to ticket registration page instead of get-ticket
    navigate(`/ticket-registration?event=${event._id}`);
  };
  
  const handleRegisterClick = () => {
    // Always navigate to registration page first, regardless of onRegister
    navigate(`/get-ticket?event=${event._id}`);
    // Don't call onRegister as it's causing the issue by redirecting to ticket-registration
    }
  };

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      {event.description && <p>{event.description}</p>}
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>

      <div className="event-card-actions">
        {registered ? (
          <button className="registered-btn" disabled>
            ✅ Registered
          </button>
        ) : (
          <button 
            className="register-btn"
            onClick={handleRegisterClick}
          >
            Register Now
          </button>
        )}
        <button 
          className="ticket-btn"
          onClick={handleGetTicket}
        >
          Get Ticket
        </button>
      </div>
    </div>
  );
};

export default EventCard;
