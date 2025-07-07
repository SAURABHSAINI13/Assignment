// 📁 src/pages/Events.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEventNews } from "../api";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [news, setNews] = useState([]);

  const navigate = useNavigate();

  // Fetch local events from your backend
  useEffect(() => {
    fetch(`${API_BASE}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Fetch event-related news from NewsAPI
  useEffect(() => {
    const getNews = async () => {
      try {
        const articles = await fetchEventNews();
        setNews(articles.slice(0, 5)); // Get only top 5 for brevity
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    getNews();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.category === category));
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>All Events</h1>

      {/* 🔍 Category Filter */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Filter by Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Academic">Academic</option>
          <option value="Co-curricular">Co-curricular</option>
          <option value="Non-curricular">Non-curricular</option>
        </select>
      </div>

      {/* 🗓️ Events List */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "280px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={event.image || "https://via.placeholder.com/300"}
              alt={event.title}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <h3>{event.title}</h3>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p>{event.description}</p>
            <button
              onClick={() => navigate(`/register/${event.id}`)}
              style={{
                backgroundColor: "#0d6efd",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
                borderRadius: "4px",
                marginTop: "0.5rem"
              }}
            >
              Register
            </button>
          </div>
        ))}
      </div>

      {/* 📰 Event Bulletin News */}
      <div style={{ marginTop: "3rem" }}>
        <h2>📰 Event Bulletin</h2>
        {news.length > 0 ? (
          <ul style={{ paddingLeft: "1rem" }}>
            {news.map((article, idx) => (
              <li key={idx} style={{ marginBottom: "1rem" }}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: "bold", color: "#0d6efd" }}
                >
                  {article.title}
                </a>
                <p style={{ margin: "0.3rem 0" }}>{article.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading latest event news...</p>
        )}
      </div>
    </div>
  );
}
