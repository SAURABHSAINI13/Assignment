import React, { useState } from 'react';
import { signup } from '../api/authApi';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', event: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      console.log("Sending data:", form);
      setMessage(res.data.msg || 'Registration successful!');
      setForm({ name: '', email: '', event: '' });
    } catch (err) {
      console.error(err.response?.data?.msg || 'Registration failed');
      setMessage(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="event"
          placeholder="Event Name"
          value={form.event}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default Register;