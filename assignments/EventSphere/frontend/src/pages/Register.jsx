import React, { useState } from 'react';
import './Register.css';
import { signup } from '../api/authApi';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', event: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      setSuccess(true);
      setMessage(res.data.msg || 'Registration successful!');
      setForm({ name: '', email: '', event: '' });
    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-section">
      <div className="register-card">
        <h2 className="register-title">Register for an Event 🎉</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
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
          <button type="submit" className="register-btn">Register Now</button>
        </form>
        {message && (
          <p className={`register-message ${success ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
