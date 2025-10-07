import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './AdminComponents.css';

const EventManagement = ({ events = [], searchQuery = '', onCreateEvent, onViewEvent, onEditEvent, onDeleteEvent }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    price: '',
    ticketsAvailable: ''
  });

  const { user } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      price: '',
      ticketsAvailable: ''
    });
    setCurrentEvent(null);
  };

  const openModal = (event = null) => {
    if (event) {
      // Format date for the input field (YYYY-MM-DD)
      const eventDate = new Date(event.date);
      const formattedDate = eventDate.toISOString().split('T')[0];
      
      // Extract time if available
      let formattedTime = '';
      if (event.time) {
        formattedTime = event.time;
      } else if (event.date.includes('T')) {
        // If time is part of the date string
        formattedTime = eventDate.toTimeString().split(' ')[0].substring(0, 5);
      }

      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: formattedDate,
        time: formattedTime,
        location: event.location || '',
        capacity: event.capacity || '',
        price: event.price || '',
        ticketsAvailable: event.ticketsAvailable || ''
      });
      setCurrentEvent(event);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const eventData = {
        ...formData,
        // Combine date and time
        date: formData.date + (formData.time ? `T${formData.time}:00` : 'T00:00:00'),
        // Convert numeric fields
        capacity: parseInt(formData.capacity, 10),
        price: parseFloat(formData.price),
        ticketsAvailable: parseInt(formData.ticketsAvailable, 10)
      };

      let response;
      if (currentEvent) {
        // Update existing event
        response = await axiosInstance.put(`/api/events/${currentEvent._id}`, eventData);
        setEvents(events.map(event => 
          event._id === currentEvent._id ? response.data : event
        ));
      } else {
        // Create new event
        response = await axiosInstance.post('/api/events', eventData);
        setEvents([...events, response.data]);
      }

      closeModal();
      // Show success message
      alert(currentEvent ? 'Event updated successfully!' : 'Event created successfully!');
    } catch (err) {
      console.error('Error saving event:', err);
      
      // Check for token expiration
      if (err.response?.status === 401 && err.response?.data?.message === 'jwt expired') {
        setError('Your session has expired. Please log in again.');
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate(`/login?redirect=${encodeURIComponent('/admin/events')}`);
        }, 2000);
      } else {
        // Handle other errors
        setError('Failed to save event. Please check your inputs and try again.');
      }
    }
  };

  const handleDelete = (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    if (onDeleteEvent) {
      onDeleteEvent(eventId);
    } else {
      try {
        axiosInstance.delete(`/api/events/${eventId}`);
        alert('Event deleted successfully!');
      } catch (err) {
        setError('Failed to delete event. Please try again.');
        console.error('Error deleting event:', err);
      }
    }
  };

  // No loading state needed as events are passed as props

  return (
    <div className="admin-component-container">
      <div className="admin-component-header">
        <h2>Event Management</h2>
        <button 
          className="btn-create" 
          onClick={onCreateEvent || (() => openModal())}
        >
          <FaPlus /> Create New Event
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Registered</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  {searchQuery ? 'No events match your search' : 'No events found. Create your first event!'}
                </td>
              </tr>
            ) : (
              events.map(event => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.location || 'N/A'}</td>
                  <td>{event.capacity || 'Unlimited'}</td>
                  <td>
                    {event.attendees ? event.attendees.length : 0}
                    {event.capacity && ` / ${event.capacity}`}
                  </td>
                  <td>${event.price ? parseFloat(event.price).toFixed(2) : '0.00'}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-view" 
                      title="View Details"
                      onClick={() => onViewEvent ? onViewEvent(event._id) : null}
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="btn-edit" 
                      title="Edit Event"
                      onClick={() => onEditEvent ? onEditEvent(event._id) : openModal(event)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-delete" 
                      title="Delete Event"
                      onClick={() => handleDelete(event._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Event Form Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{currentEvent ? 'Edit Event' : 'Create New Event'}</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="capacity">Capacity</label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="ticketsAvailable">Tickets Available</label>
                <input
                  type="number"
                  id="ticketsAvailable"
                  name="ticketsAvailable"
                  value={formData.ticketsAvailable}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {currentEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;