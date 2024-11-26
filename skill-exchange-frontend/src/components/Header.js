import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">SkillShare</div>
      <nav>
        <ul>
          <li><a href="#login">Login</a></li>
          <li><a href="#signup">Sign Up</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

