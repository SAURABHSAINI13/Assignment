import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/events`);
  return response.data;
};
