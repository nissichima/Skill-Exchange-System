import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './AuthPage.css';


const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Login Section */}
        <div className="login-section auth-box">
          <h2>Login</h2>
          <form>
            <label htmlFor="login-email">Email</label>
            <input type="email" id="login-email" placeholder="Enter your email" />
            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" placeholder="Enter your password" />
            <div className="auth-actions">
              <button type="button" className="forgot-password">Forgot My Password</button>
              <button type="submit" className="auth-button">Sign In</button>
            </div>
          </form>
        </div>

        {/* Sign-Up Section */}
        <div className="signup-section auth-box">
          <h2>Sign Up</h2>
          <form>
            <label htmlFor="signup-name">Name</label>
            <input type="text" id="signup-name" placeholder="Enter your name" />
            <label htmlFor="signup-email">Email</label>
            <input type="email" id="signup-email" placeholder="Enter your email" />
            <label htmlFor="signup-password">Password</label>
            <input type="password" id="signup-password" placeholder="Create a password" />
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
