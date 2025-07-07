import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import eventsData from '../data/events.json';

const API_BASE = process.env.REACT_APP_API_URL;

const EventDetails = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  const event = events.find(ev => ev.id === parseInt(id)) || eventsData.find(ev => ev.id === parseInt(id));

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="container">
      <Link to="/" style={{ textDecoration: 'none' }}>&larr; Back</Link>
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      <p><strong>Type:</strong> {event.type}</p>
      <p><strong>Date:</strong> {event.date} at {event.time}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>
      <p><strong>Food:</strong> {event.food}</p>
    </div>
  );
};

export default EventDetails;
