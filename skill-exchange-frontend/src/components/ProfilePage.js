import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [isEditing, setIsEditing] = useState(false);
  const [currentSection, setCurrentSection] = useState("Profile");
  const navigate = useNavigate();

  // States for skills
  const [offeredSkills, setOfferedSkills] = useState([]);
  const [seekingSkills, setSeekingSkills] = useState([]);

  const [isEditingOffered, setIsEditingOffered] = useState(false);
  const [isEditingSeeking, setIsEditingSeeking] = useState(false);

  // Fetch user data on page load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/profile', { withCredentials: true });
        setName(`${response.data.firstName} ${response.data.lastName}`);
        setOfferedSkills(response.data.offeredSkills || []);
        setSeekingSkills(response.data.seekedSkills || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Save updated skills to the backend
  const saveSkills = async () => {
    try {
      await axios.put(
        '/api/users/profile',
        { offeredSkills, seekedSkills: seekingSkills },
        { withCredentials: true }
      );
      alert('Skills updated successfully!');
    } catch (error) {
      console.error('Error updating skills:', error);
      alert('Failed to update skills.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    navigate("/");
  };

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
            <a href="#logout" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </header>

      {/* Main Profile Section */}
      <section className="profile-content">
        <div className="profile-left">
          <div className="profile-picture"></div>
          <div className="profile-name">
            <h2>{name}</h2>
          </div>
        </div>

        <div className="profile-right">
          <div className="skills-section">
            <h3>Offered Skills</h3>
            {isEditingOffered ? (
              <div>
                {offeredSkills.map((skill, index) => (
                  <div key={index} className="skill-edit">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleOfferedSkillChange(index, e.target.value)}
                    />
                    <button onClick={() => handleRemoveOfferedSkill(index)}>Remove</button>
                  </div>
                ))}
                <button onClick={handleAddOfferedSkill}>Add Skill</button>
                <button onClick={() => { saveSkills(); setIsEditingOffered(false); }}>Save</button>
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
          <div className="skills-section">
            <h3>Seeking Skills</h3>
            {isEditingSeeking ? (
              <div>
                {seekingSkills.map((skill, index) => (
                  <div key={index} className="skill-edit">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSeekingSkillChange(index, e.target.value)}
                    />
                    <button onClick={() => handleRemoveSeekingSkill(index)}>Remove</button>
                  </div>
                ))}
                <button onClick={handleAddSeekingSkill}>Add Skill</button>
                <button onClick={() => { saveSkills(); setIsEditingSeeking(false); }}>Save</button>
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
