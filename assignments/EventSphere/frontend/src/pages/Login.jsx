import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      alert("Logging in: " + form.email);
    } else {
      alert("Registering: " + form.email);
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={{ marginLeft: "10px" }}
        >
          {isLogin ? 'Create Account' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
