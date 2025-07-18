import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" onChange={handleChange} required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
