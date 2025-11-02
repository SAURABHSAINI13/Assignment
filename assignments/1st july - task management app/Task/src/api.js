import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getTasks = () => {
  return api.get('/tasks');
};

export const getTask = (id) => {
  return api.get(`/tasks/${id}`);
};

export const addTask = (task) => {
  return api.post('/tasks', task);
};

export const updateTask = (id, task) => {
  return api.put(`/tasks/${id}`, task);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

export default api;