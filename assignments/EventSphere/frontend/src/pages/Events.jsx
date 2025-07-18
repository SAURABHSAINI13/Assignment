import React, { useState, useEffect } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const sampleEvents = [
      { id: 1, title: 'Tech Talk', date: '2025-08-12' },
      { id: 2, title: 'Hackathon', date: '2025-08-14' },
    ];
    setEvents(sampleEvents);
  }, []);

  return (
    <div className="container">
      <h2>Upcoming Events</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
