import axiosInstance from './axiosInstance';

/**
 * Register a new user
 * @param {Object} userData - User registration data (name, email, password)
 * @returns {Promise} - Response with user data and token
 */
export const signup = async (userData) => {
  // Remove confirmPassword if it exists in userData
  const { confirmPassword, ...userDataToSend } = userData;
  const response = await axiosInstance.post('/auth/signup', userDataToSend);
  return response.data;
};

/**
 * Login a user
 * @param {Object} credentials - User login credentials
 * @returns {Promise} - Response with user data and token
 */
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

/**
 * Verify authentication token (optional)
 * @returns {Promise} - Response with user data if token is valid
 */
export const verifyAuth = async () => {
  const response = await axiosInstance.get('/auth/verify');
  return response.data;
};