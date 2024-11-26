import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  return (
    <main className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <h1>SkillShare</h1>
        <nav className="nav-bar">
          <a href="#browse-skills">Browse Skills</a>
          <a href="#set-up-session">Set Up Session</a>
          <a href="#history">History</a>
          <a href="#messages">Messages</a>
          <a href="#profile" className="active">Profile</a>
          <a href="#logout">Logout</a>
        </nav>
      </header>

      {/* Main Profile Section */}
      <section className="profile-content">
        {/* Left Section - Profile Picture & Name */}
        <div className="profile-left">
          <div className="profile-picture">
            {/* Placeholder for profile image */}
          </div>
          <div className="profile-name">
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <h2>{name}</h2>
            )}
          </div>
          <div className="profile-buttons">
            {isEditing ? (
              <button onClick={handleSave} className="save-button">
                Save
              </button>
            ) : (
              <button onClick={handleEdit} className="edit-button">
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Right Section - Offered and Seeking Skills */}
        <div className="profile-right">
          {/* Offered Skills */}
          <div className="skills-section">
            <h3>Offered Skills</h3>
            <ul>
              <li>Web Development</li>
              <li>Graphic Design</li>
              <li>Photography</li>
              <li>Marketing</li>
            </ul>
          </div>
          {/* Seeking Skills */}
          <div className="skills-section">
            <h3>Seeking Skills</h3>
            <ul>
              <li>Cooking</li>
              <li>Music</li>
              <li>Fitness</li>
              <li>Public Speaking</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;

