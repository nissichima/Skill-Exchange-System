import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">SkillShare</div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/auth" className="nav-item">Login</Link></li>
          <li><Link to="/auth" className="nav-item">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

