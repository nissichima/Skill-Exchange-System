import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [isEditing, setIsEditing] = useState(false);
  const [currentSection, setCurrentSection] = useState("Profile");

  // States for skills
  const [offeredSkills, setOfferedSkills] = useState([
    "Web Development",
    "Graphic Design",
    "Photography",
    "Marketing",
  ]);
  const [seekingSkills, setSeekingSkills] = useState([
    "Cooking",
    "Music",
    "Fitness",
    "Public Speaking",
  ]);

  const [isEditingOffered, setIsEditingOffered] = useState(false);
  const [isEditingSeeking, setIsEditingSeeking] = useState(false);

  // Handlers for offered skills
  const handleAddOfferedSkill = () => setOfferedSkills([...offeredSkills, ""]);
  const handleOfferedSkillChange = (index, value) => {
    const updatedSkills = [...offeredSkills];
    updatedSkills[index] = value;
    setOfferedSkills(updatedSkills);
  };
  const handleRemoveOfferedSkill = (index) => {
    const updatedSkills = offeredSkills.filter((_, i) => i !== index);
    setOfferedSkills(updatedSkills);
  };

  // Handlers for seeking skills
  const handleAddSeekingSkill = () => setSeekingSkills([...seekingSkills, ""]);
  const handleSeekingSkillChange = (index, value) => {
    const updatedSkills = [...seekingSkills];
    updatedSkills[index] = value;
    setSeekingSkills(updatedSkills);
  };
  const handleRemoveSeekingSkill = (index) => {
    const updatedSkills = seekingSkills.filter((_, i) => i !== index);
    setSeekingSkills(updatedSkills);
  };

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
            {isEditingOffered ? (
              <div>
                {offeredSkills.map((skill, index) => (
                  <div key={index} className="skill-edit">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) =>
                        handleOfferedSkillChange(index, e.target.value)
                      }
                    />
                    <button onClick={() => handleRemoveOfferedSkill(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button onClick={handleAddOfferedSkill}>Add Skill</button>
                <button onClick={() => setIsEditingOffered(false)}>Save</button>
              </div>
            ) : (
              <ul>
                {offeredSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
                <button onClick={() => setIsEditingOffered(true)}>Edit</button>
              </ul>
            )}
          </div>
          {/* Seeking Skills */}
          <div className="skills-section">
            <h3>Seeking Skills</h3>
            {isEditingSeeking ? (
              <div>
                {seekingSkills.map((skill, index) => (
                  <div key={index} className="skill-edit">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) =>
                        handleSeekingSkillChange(index, e.target.value)
                      }
                    />
                    <button onClick={() => handleRemoveSeekingSkill(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button onClick={handleAddSeekingSkill}>Add Skill</button>
                <button onClick={() => setIsEditingSeeking(false)}>Save</button>
              </div>
            ) : (
              <ul>
                {seekingSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
                <button onClick={() => setIsEditingSeeking(true)}>Edit</button>
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
