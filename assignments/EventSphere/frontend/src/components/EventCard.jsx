import React from 'react';
import './EventCard.css';

const EventCard = ({ event, registered = false, onRegister }) => {
  if (!event) return null;

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      {event.description && <p>{event.description}</p>}
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>

      <button
        onClick={() => !registered && onRegister?.(event._id)}
        disabled={registered}
      >
        {registered ? '✅ Registered' : 'Register'}
      </button>
    </div>
  );
};

export default EventCard;
