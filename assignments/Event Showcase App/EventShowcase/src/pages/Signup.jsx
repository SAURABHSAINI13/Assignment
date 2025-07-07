// Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    localStorage.setItem('user', username);
    navigate('/events');
  };

  return (
    <div className="p-4">
      <h2>Create Your Account</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};
export default Signup;