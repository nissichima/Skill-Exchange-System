import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">SkillShare</Link> {/* Link to home */}
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/auth" className="nav-item">Login</Link></li>
          <li><Link to="/auth" className="nav-item">Sign Up</Link></li>
          <li><Link to="/browse" className= "nav-item">Browse Skills</Link></li> {/* Link to Browse Skills Page */}
          <li><Link to="/browse" className= "nav-item">Messages</Link></li>
          <li><Link to="/browse" className= "nav-item">History</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

