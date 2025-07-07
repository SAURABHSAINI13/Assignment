import EventCard from "../components/EventCard";
import eventsData from "../data/events.json";

const Home = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("upcoming");

  // 🔎 Filter by category & search query
  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = filter === "All" || event.type === filter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 🔃 Sort events based on date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "upcoming" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="container">
      <h1>🎉 Eventify - Explore Events</h1>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by title or location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {/* 🔘 Filter Buttons */}
      <div className="filter-buttons">
        {["All", "Academic", "Co-Curricular", "Non-Curricular"].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔃 Sort Dropdown */}
      <div className="sort-section">
        <label>Sort by: </label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="upcoming">Upcoming First</option>
          <option value="latest">Latest First</option>
        </select>
      </div>

      {/* 📅 Event List */}
      <div className="event-list">
        {sortedEvents.length > 0 ? (
          sortedEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>No events match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;