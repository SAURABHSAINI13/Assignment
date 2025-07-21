import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api/eventApi';
import EventCard from '../components/EventCard';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="events-page">
      <header className="events-header">
        <h2>🎉 Discover Upcoming Events</h2>
        <p>From tech talks to talent shows — there’s something for everyone!</p>
      </header>

      {loading ? (
        <p className="loading">Loading events...</p>
      ) : events.length === 0 ? (
        <div className="no-events">
          <p>No events available right now. Stay tuned for updates! 🚧</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event, index) => (
            <EventCard key={index} event={event} registered={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
