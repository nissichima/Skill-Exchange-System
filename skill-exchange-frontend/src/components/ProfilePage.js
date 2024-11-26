import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [isEditing, setIsEditing] = useState(false);
  const [currentSection, setCurrentSection] = useState("Profile");
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  return (
    <main className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <div className="logo">
          <a href="/" className="logo-link">
            SkillShare
          </a>
        </div>
        <ul className="nav-links">
          <li>
            <a
              href="#browse-skills"
              onClick={() => setCurrentSection("Browse Skills")}
              className={currentSection === "Browse Skills" ? "active" : ""}
            >
              Browse Skills
            </a>
          </li>
          <li>
            <a
              href="#set-up-session"
              onClick={() => setCurrentSection("Set Up Session")}
              className={currentSection === "Set Up Session" ? "active" : ""}
            >
              Set Up Session
            </a>
          </li>
          <li>
            <a
              href="#history"
              onClick={() => setCurrentSection("History")}
              className={currentSection === "History" ? "active" : ""}
            >
              History
            </a>
          </li>
          <li>
            <a
              href="#messages"
              onClick={() => setCurrentSection("Messages")}
              className={currentSection === "Messages" ? "active" : ""}
            >
              Messages
            </a>
          </li>
          <li>
            <a
              href="#profile"
              onClick={() => setCurrentSection("Profile")}
              className={currentSection === "Profile" ? "active" : ""}
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="#logout"
              onClick={() => setCurrentSection("Logout")}
              className={currentSection === "Logout" ? "active" : ""}
            >
              Logout
            </a>
          </li>
        </ul>
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

