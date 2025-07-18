import API from './axiosInstance';
export const fetchEvents = async () => {
  try {
    const res = await API.get('/events');
    return res.data;
  } catch (err) {
    console.error('Error fetching events:', err);
    return [];
  }
};

export const fetchEventById = async (id) => {
  try {
    const res = await API.get(`/events/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching event ${id}:`, err);
    throw err;
  }
};
export const createEvent = async (data, token) => {
  try {
    const res = await API.post('/events', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error('Error creating event:', err);
    throw err;
  }
};

export const registerEvent = async (payload) => {
  try {
    const res = await API.post('/register', payload);
    return res.data;
  } catch (err) {
    console.error('Registration failed:', err);
    throw err;
  }
};
