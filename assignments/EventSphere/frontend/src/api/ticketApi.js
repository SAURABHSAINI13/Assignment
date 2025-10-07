import axiosInstance from './axiosInstance';

// Create a new ticket (for admin/dashboard)
export const createTicket = async (ticketData) => {
  try {
    const response = await axiosInstance.post('/tickets/create', ticketData);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

// Register for an event with ticket details
export const registerTicket = async (eventId, ticketData) => {
  try {
    const response = await axiosInstance.post(`/tickets/${eventId}/register`, ticketData);
    return response.data;
  } catch (error) {
    console.error('Error registering ticket:', error);
    throw error;
  }
};

// Get user's ticket registrations
export const getUserTickets = async (userId) => {
  try {
    const response = await axiosInstance.get(`/tickets/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    throw error;
  }
};

// Get ticket by booking ID
export const getTicketByBookingId = async (bookingId) => {
  try {
    const response = await axiosInstance.get(`/tickets/booking/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ticket:', error);
    throw error;
  }
};

// Generate QR code for a booking ID
export const generateQRCode = async (bookingId) => {
  try {
    const response = await axiosInstance.get(`/tickets/qr-code/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

// Read QR code and verify ticket
export const verifyTicketQRCode = async (bookingId) => {
  try {
    const response = await axiosInstance.post('/tickets/read-qr-code', { bookingId });
    return response.data;
  } catch (error) {
    console.error('Error verifying ticket QR code:', error);
    throw error;
  }
};