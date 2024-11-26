import React from 'react';
import './AuthPage.css';

const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Login Section */}
        <div className="login-section">
          <h2>Login</h2>
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
            <div className="auth-actions">
              <button type="button" className="forgot-password">Forgot My Password</button>
              <button type="submit" className="auth-button">Sign In</button>
            </div>
          </form>
        </div>

        {/* Sign-Up Section */}
        <div className="signup-section">
          <h2>Sign Up</h2>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Create a password" />
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

