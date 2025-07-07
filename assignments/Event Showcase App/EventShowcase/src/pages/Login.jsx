// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser === username) {
      navigate('/events');
    } else {
      alert('User not found! Please sign up.');
    }
  };

  return (
    <div className="p-4">
      <h2>Login</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
export default Login;