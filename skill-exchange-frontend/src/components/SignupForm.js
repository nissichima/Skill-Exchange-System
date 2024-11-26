import React, { useState } from 'react';
import { signup } from '../services/authService';
import './AuthPage.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await signup(formData);
      setSuccess(result.message); // Display success message
    } catch (err) {
      setError(err); // Display error message
    }
  };

  return (
    <div className="signup-section auth-box">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} required />
        <label>Last Name</label>
        <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} required />
        <label>Username</label>
        <input name="username" type="text" placeholder="Username" onChange={handleChange} required />
        <label>Email</label>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <label>Password</label>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <label>Gender</label>
        <select name="gender" onChange={handleChange} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;

