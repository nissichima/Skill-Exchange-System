import React from 'react';
import './AuthPage.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

console.log('AuthPage component loaded');

const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Render LoginForm */}
        <LoginForm />

        {/* Render SignupForm */}
        <SignupForm />
      </div>
    </div>
  );
};

export default AuthPage;
