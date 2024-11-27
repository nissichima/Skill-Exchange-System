import React, { useState } from 'react';
import { login } from '../services/authService';
import './AuthPage.css';
console.log('LoginForm component loaded');

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
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
  
      const result = await response.json();
      setSuccess(result.message); // Display success message
    } catch (err) {
      setError(err.message || 'An error occurred'); // Display error message
    }
  };
  

  return (
    <div className="login-section auth-box">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username or Email</label>
        <input name="loginInput" type="text" placeholder="Username or Email" onChange={handleChange} required />
        <label>Password</label>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <div className="auth-actions">
              <button type="button" className="forgot-password">Forgot My Password</button>
              <button type="submit" className="auth-button">Sign In</button>
            </div>
      </form>
    </div>
  );
};

export default LoginForm;
