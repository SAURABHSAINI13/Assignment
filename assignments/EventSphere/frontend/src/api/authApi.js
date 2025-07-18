import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const signup = (userData) => API.post('/auth/signup', userData);
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export default API;
