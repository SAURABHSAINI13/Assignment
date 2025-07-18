import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();

  const event = {
    id: eventId,
    title: 'Hackathon',
    description: 'A 24-hour coding challenge.',
    date: '2025-08-14',
    venue: 'Auditorium Hall'
  };

  return (
    <div className="container">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Venue: {event.venue}</p>
    </div>
  );
};

export default EventDetails;
