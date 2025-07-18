import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api/eventApi';

const Home = () => {
const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const getEvents = async () => {
try {
const res = await fetchEvents();
if (res && res.data && Array.isArray(res.data)) {
setEvents(res.data);
console.log('Events:', res.data);
} else {
console.warn('Invalid response from fetchEvents:', res);
}
} catch (error) {
console.error('Error fetching events:', error);
} finally {
setLoading(false);
}
};
getEvents();
}, []);

return (
<div className="container">
<section className="hero">
<h1>Welcome to EventSphere</h1>
<p>Join us for exciting events, challenges, and fun!</p>
</section>
  <section className="events">
    <h2>Upcoming Events</h2>
    {loading ? (
      <p>Loading events...</p>
    ) : events.length > 0 ? (
      <ul>
        {events.map(event => (
          <li key={event._id || event.id || Math.random()}>
            {event.title || 'Untitled Event'}
          </li>
        ))}
      </ul>
    ) : (
      <p>No upcoming events found.</p>
    )}
  </section>
</div>
);
};
export default Home;