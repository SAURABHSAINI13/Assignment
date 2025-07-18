import React from 'react';

const RegisteredEvents = ({ events }) => (
  <div className="registered-events">
    <h2>Your Registered Events</h2>
    <ul>
      {events.map(event => (
        <li key={event.id}>
          {event.title} - {event.date} ({event.location})
        </li>
      ))}
    </ul>
  </div>
);

export default RegisteredEvents;