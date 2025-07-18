// src/components/EventCard.jsx
import React from 'react';
import './EventCard.css'; // Optional, if you have custom styles

const EventCard = ({ event, registered = false, onRegister }) => {
  if (!event) return null;

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      {event.description && <p>{event.description}</p>}

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
