import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaTrash, FaCalendarDay, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './EventFavorites.css';

const EventFavorites = ({ events }) => {
  const [favorites, setFavorites] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('eventFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('eventFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add event to favorites
  const _addToFavorites = (event) => {
    if (!favorites.some(fav => fav._id === event._id)) {
      const newFavorites = [...favorites, event];
      setFavorites(newFavorites);
    }
  };

  // Remove event from favorites
  const removeFromFavorites = (eventId) => {
    const newFavorites = favorites.filter(event => event._id !== eventId);
    setFavorites(newFavorites);
  };

  // Check if an event is in favorites
  const isFavorite = (eventId) => {
    return favorites.some(event => event._id === eventId);
  };

  // Get favorite events that match the current events list
  const getFavoriteEvents = () => {
    // If events is provided, filter favorites to only include events that exist in the current events list
    if (events && events.length > 0) {
      const eventIds = events.map(event => event._id);
      return favorites.filter(fav => eventIds.includes(fav._id));
    }
    return favorites;
  };

  const displayFavorites = getFavoriteEvents();
  const displayCount = showAll ? displayFavorites.length : Math.min(3, displayFavorites.length);
  const hasMore = displayFavorites.length > 3;

  return (
    <div className="event-favorites">
      <div className="favorites-header">
        <h3>Favorite Events</h3>
        {hasMore && (
          <button 
            className="toggle-favorites" 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show All'}
          </button>
        )}
      </div>

      {displayFavorites.length > 0 ? (
        <ul className="favorites-list">
          {displayFavorites.slice(0, displayCount).map(event => (
            <li key={event._id} className="favorite-item">
              <div className="favorite-content">
                <Link to={`/events/${event._id}`} className="favorite-title">
                  {event.title}
                </Link>
                <div className="favorite-details">
                  <span className="favorite-date">
                    <FaCalendarDay />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  {event.location && (
                    <span className="favorite-location">
                      <FaMapMarkerAlt />
                      {event.location}
                    </span>
                  )}
                  {event.category && (
                    <span className="favorite-category">
                      <FaTag />
                      {event.category}
                    </span>
                  )}
                </div>
              </div>
              <button 
                className="remove-favorite" 
                onClick={() => removeFromFavorites(event._id)}
                title="Remove from favorites"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-favorites">
          <p>No favorite events yet</p>
          <p className="empty-favorites-hint">Click the star icon on events to add them to your favorites</p>
        </div>
      )}
    </div>
  );
};

// Higher-order component to add favorite functionality to event lists
export const withFavorites = (WrappedComponent) => {
  return (props) => {
    const [favorites, setFavorites] = useState([]);
    
    // Load favorites from localStorage on component mount
    useEffect(() => {
      const storedFavorites = localStorage.getItem('eventFavorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }, []);
    
    // Save favorites to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem('eventFavorites', JSON.stringify(favorites));
    }, [favorites]);
    
    // Add event to favorites
    const addToFavorites = (event) => {
      if (!favorites.some(fav => fav._id === event._id)) {
        const newFavorites = [...favorites, event];
        setFavorites(newFavorites);
      }
    };
    
    // Remove event from favorites
    const removeFromFavorites = (eventId) => {
      const newFavorites = favorites.filter(event => event._id !== eventId);
      setFavorites(newFavorites);
    };
    
    // Check if an event is in favorites
    const isFavorite = (eventId) => {
      return favorites.some(event => event._id === eventId);
    };
    
    // Add favorite-related props to the wrapped component
    return (
      <WrappedComponent
        {...props}
        favorites={favorites}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        isFavorite={isFavorite}
      />
    );
  };
};

// FavoriteButton component for adding/removing events from favorites
export const FavoriteButton = ({ event, isFavorite, addToFavorites, removeFromFavorites }) => {
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(event._id)) {
      removeFromFavorites(event._id);
    } else {
      addToFavorites(event);
    }
  };
  
  return (
    <button 
      className={`favorite-button ${isFavorite(event._id) ? 'is-favorite' : ''}`}
      onClick={handleToggleFavorite}
      title={isFavorite(event._id) ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite(event._id) ? <FaStar /> : <FaRegStar />}
    </button>
  );
};

export default EventFavorites;