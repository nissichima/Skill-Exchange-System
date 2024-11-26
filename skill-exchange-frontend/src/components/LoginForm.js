import React, { useState } from 'react';
import { login } from '../services/authService';
import './AuthPage.css';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ loginInput: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await login(credentials);
      setSuccess(result.message); // Display success message
    } catch (err) {
      setError(err); // Display error message
    }
  };

  return (
    <div className="login-section auth-box">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username or Email</label>
        <input
          name="loginInput"
          type="text"
          placeholder="Username or Email"
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-button">Sign In</button>
      </form>
    </div>
  );
};

export default LoginForm;

