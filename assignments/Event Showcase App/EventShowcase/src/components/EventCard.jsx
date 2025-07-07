const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} />
      <div className="event-info">
        <h3>{event.title}</h3>
        <p>{event.location}</p>
        <p>{event.date} @ {event.time}</p>
      </div>
    </div>
  );
};

export default EventCard;
