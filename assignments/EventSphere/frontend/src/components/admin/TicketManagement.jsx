import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { FaEye, FaQrcode, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import './AdminComponents.css';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (tickets.length > 0) {
      filterTickets();
    }
  }, [searchQuery, tickets]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      // This endpoint would need to be implemented on the backend
      const response = await axiosInstance.get('/api/tickets');
      setTickets(response.data);
      setFilteredTickets(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tickets. Please try again.');
      console.error('Error fetching tickets:', err);
      
      // For development, create mock tickets if API fails
      const mockTickets = [
        {
          _id: '1',
          bookingId: 'EVT-12345678',
          eventId: {
            _id: 'e1',
            title: 'Tech Conference 2023',
            date: '2023-12-15T09:00:00',
            location: 'Convention Center'
          },
          userId: {
            _id: 'u1',
            name: 'John Doe',
            email: 'john@example.com'
          },
          ticketType: 'VIP',
          quantity: 2,
          totalAmount: 199.98,
          paymentStatus: 'completed',
          attendeeDetails: {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '555-123-4567'
          },
          createdAt: '2023-11-01T10:30:00'
        },
        {
          _id: '2',
          bookingId: 'EVT-87654321',
          eventId: {
            _id: 'e2',
            title: 'Music Festival',
            date: '2023-11-20T18:00:00',
            location: 'City Park'
          },
          userId: {
            _id: 'u2',
            name: 'Jane Smith',
            email: 'jane@example.com'
          },
          ticketType: 'General',
          quantity: 4,
          totalAmount: 159.96,
          paymentStatus: 'completed',
          attendeeDetails: {
            fullName: 'Jane Smith',
            email: 'jane@example.com',
            phone: '555-987-6543'
          },
          createdAt: '2023-10-25T14:15:00'
        },
        {
          _id: '3',
          bookingId: 'EVT-ABCDEFGH',
          eventId: {
            _id: 'e3',
            title: 'Business Workshop',
            date: '2023-12-05T13:00:00',
            location: 'Downtown Hotel'
          },
          userId: {
            _id: 'u3',
            name: 'Robert Johnson',
            email: 'robert@example.com'
          },
          ticketType: 'Early Bird',
          quantity: 1,
          totalAmount: 49.99,
          paymentStatus: 'pending',
          attendeeDetails: {
            fullName: 'Robert Johnson',
            email: 'robert@example.com',
            phone: '555-456-7890'
          },
          createdAt: '2023-11-02T09:45:00'
        }
      ];
      
      setTickets(mockTickets);
      setFilteredTickets(mockTickets);
    } finally {
      setLoading(false);
    }
  };

  const filterTickets = () => {
    if (!searchQuery.trim()) {
      setFilteredTickets(tickets);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = tickets.filter(ticket => 
      ticket.bookingId.toLowerCase().includes(query) ||
      ticket.eventId.title.toLowerCase().includes(query) ||
      ticket.userId.name.toLowerCase().includes(query) ||
      ticket.userId.email.toLowerCase().includes(query) ||
      ticket.attendeeDetails.fullName.toLowerCase().includes(query) ||
      ticket.attendeeDetails.email.toLowerCase().includes(query) ||
      ticket.attendeeDetails.phone.includes(query)
    );
    
    setFilteredTickets(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const viewTicketDetails = async (ticket) => {
    setCurrentTicket(ticket);
    setQrCode(null); // Reset QR code when viewing a new ticket
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentTicket(null);
    setQrCode(null);
  };

  const generateQRCode = async (bookingId) => {
    try {
      // Import the function from ticketApi
      const { generateQRCode } = await import('../../api/ticketApi');
      const response = await generateQRCode(bookingId);
      setQrCode(response.qrCodeUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
      // For development, create a mock QR code URL
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingId}`);
    }
  };

  const verifyTicket = async (bookingId) => {
    try {
      // Import the function from ticketApi
      const { verifyTicketQRCode } = await import('../../api/ticketApi');
      await verifyTicketQRCode(bookingId);
      
      // Update the ticket status in the UI
      const updatedTickets = tickets.map(ticket => 
        ticket.bookingId === bookingId 
          ? { ...ticket, verified: true } 
          : ticket
      );
      
      setTickets(updatedTickets);
      setFilteredTickets(updatedTickets.filter(ticket => 
        filteredTickets.some(ft => ft._id === ticket._id)
      ));
      
      alert('Ticket verified successfully!');
    } catch (err) {
      console.error('Error verifying ticket:', err);
      alert('Failed to verify ticket. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="loading-container">Loading tickets...</div>;
  }

  return (
    <div className="admin-component-container">
      <div className="admin-component-header">
        <h2>Ticket Management</h2>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Event</th>
              <th>Attendee</th>
              <th>Ticket Type</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  {searchQuery ? 'No tickets match your search' : 'No tickets found.'}
                </td>
              </tr>
            ) : (
              filteredTickets.map(ticket => (
                <tr key={ticket._id}>
                  <td>{ticket.bookingId}</td>
                  <td>{ticket.eventId.title}</td>
                  <td>
                    <div>{ticket.attendeeDetails.fullName}</div>
                    <div className="secondary-text">{ticket.attendeeDetails.email}</div>
                  </td>
                  <td>{ticket.ticketType}</td>
                  <td>{ticket.quantity}</td>
                  <td>${ticket.totalAmount.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${ticket.paymentStatus === 'completed' ? 'status-success' : 'status-pending'}`}>
                      {ticket.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="btn-view" 
                      title="View Details"
                      onClick={() => viewTicketDetails(ticket)}
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="btn-qr" 
                      title="Generate QR Code"
                      onClick={() => {
                        viewTicketDetails(ticket);
                        generateQRCode(ticket.bookingId);
                      }}
                    >
                      <FaQrcode />
                    </button>
                    <button 
                      className={`btn-verify ${ticket.verified ? 'verified' : ''}`}
                      title={ticket.verified ? 'Ticket Verified' : 'Verify Ticket'}
                      onClick={() => verifyTicket(ticket.bookingId)}
                      disabled={ticket.verified}
                    >
                      {ticket.verified ? <FaCheck /> : <FaTimes />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Ticket Details Modal */}
      {showModal && currentTicket && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ticket Details</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="ticket-details-container">
              <div className="ticket-detail-section">
                <h4>Booking Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Booking ID:</span>
                  <span className="detail-value">{currentTicket.bookingId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date Booked:</span>
                  <span className="detail-value">{formatDate(currentTicket.createdAt)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Status:</span>
                  <span className={`status-badge ${currentTicket.paymentStatus === 'completed' ? 'status-success' : 'status-pending'}`}>
                    {currentTicket.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
              
              <div className="ticket-detail-section">
                <h4>Event Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Event:</span>
                  <span className="detail-value">{currentTicket.eventId.title}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date & Time:</span>
                  <span className="detail-value">{formatDate(currentTicket.eventId.date)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{currentTicket.eventId.location}</span>
                </div>
              </div>
              
              <div className="ticket-detail-section">
                <h4>Attendee Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{currentTicket.attendeeDetails.fullName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{currentTicket.attendeeDetails.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{currentTicket.attendeeDetails.phone}</span>
                </div>
              </div>
              
              <div className="ticket-detail-section">
                <h4>Ticket Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Ticket Type:</span>
                  <span className="detail-value">{currentTicket.ticketType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Quantity:</span>
                  <span className="detail-value">{currentTicket.quantity}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Total Amount:</span>
                  <span className="detail-value">${currentTicket.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              {qrCode && (
                <div className="ticket-detail-section qr-code-section">
                  <h4>QR Code</h4>
                  <div className="qr-code-container">
                    <img src={qrCode} alt="Ticket QR Code" className="qr-code-image" />
                    <p className="qr-code-info">Scan this QR code to verify the ticket at the event.</p>
                  </div>
                </div>
              )}
              
              <div className="modal-actions">
                {!qrCode && (
                  <button 
                    className="btn-primary" 
                    onClick={() => generateQRCode(currentTicket.bookingId)}
                  >
                    Generate QR Code
                  </button>
                )}
                <button 
                  className="btn-secondary" 
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagement;