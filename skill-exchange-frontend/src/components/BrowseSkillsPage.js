import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Updated to use useNavigate for navigation
import "./BrowseSkillsPage.css";

const BrowseSkillsPage = () => {
  const [skills, setSkills] = useState([
    { id: "1", skillName: "Web Development", category: "Technology", details: "Learn to code websites" },
    { id: "2", skillName: "Photography", category: "Art", details: "Master the art of photography" },
    { id: "3", skillName: "Cooking", category: "Cooking", details: "Learn to cook delicious meals" },
  ]);
  const [filters, setFilters] = useState({ skillName: "", category: "" });
  const navigate = useNavigate(); // Initialize navigate for page redirection

  useEffect(() => {
    // Simulate filtering logic for skills
    const filteredSkills = skills.filter((skill) => {
      const matchesSkillName = filters.skillName
        ? skill.skillName.toLowerCase().includes(filters.skillName.toLowerCase())
        : true;
      const matchesCategory = filters.category
        ? skill.category === filters.category
        : true;
      return matchesSkillName && matchesCategory;
    });
    setSkills(filteredSkills);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handlers for navigation
  const navigateToProfile = () => navigate("/profile");
  const navigateToHistory = () => navigate("/history");
  const navigateToMessages = () => navigate("/messages");
  const navigateToSetupSession = () => navigate("/setup-session");

  return (
    <div className="browse-skills-page">
      {/* Navigation Bar */}
      <header className="navbar">
        <a
          href="#browse-skills"
          onClick={() => navigate("/browse")}
          className="nav-link"
        >
          Browse Skills
        </a>
        <a
          href="#setup-session"
          onClick={navigateToSetupSession}
          className="nav-link"
        >
          Set Up Session
        </a>
        <a
          href="#history"
          onClick={navigateToHistory}
          className="nav-link"
        >
          History
        </a>
        <a
          href="#messages"
          onClick={navigateToMessages}
          className="nav-link"
        >
          Messages
        </a>
        <a
          href="#profile"
          onClick={navigateToProfile}
          className="nav-link"
        >
          Profile
        </a>
      </header>

      {/* Page Content */}
      <main>
        <h1>Browse Skills</h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by skill name..."
            name="skillName"
            onChange={handleFilterChange}
          />
          <select name="category" onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Art">Art</option>
            <option value="Cooking">Cooking</option>
          </select>
        </div>

        <div className="skills-container">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-card">
              <h2>{skill.skillName}</h2>
              <p>
                <strong>Category:</strong> {skill.category}
              </p>
              <p>{skill.details}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BrowseSkillsPage;
