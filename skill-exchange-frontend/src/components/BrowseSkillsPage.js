import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./BrowseSkillsPage.css";

const BrowseSkillsPage = () => {
  const [skills, setSkills] = useState([
    { id: "1", skillName: "Web Development", category: "Technology", details: "Learn to code websites" },
    { id: "2", skillName: "Photography", category: "Art", details: "Master the art of photography" },
    { id: "3", skillName: "Cooking", category: "Cooking", details: "Learn to cook delicious meals" },
  ]);
  const [filters, setFilters] = useState({ skillName: "", category: "" });
  const navigate = useNavigate();

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

  return (
    <div className="browse-skills-page">
      {/* Navigation Bar */}
      <header className="navbar">
        <NavLink to="/browse" activeClassName="active-link">
          Browse Skills
        </NavLink>
        <NavLink to="/setup-session" activeClassName="active-link">
          Set Up Session
        </NavLink>
        <NavLink to="/history" activeClassName="active-link">
          History
        </NavLink>
        <NavLink to="/messages" activeClassName="active-link">
          Messages
        </NavLink>
        <NavLink to="/profile" activeClassName="active-link">
          Profile
        </NavLink>
        <button onClick={() => navigate("/logout")}>Logout</button>
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
              <p><strong>Category:</strong> {skill.category}</p>
              <p>{skill.details}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BrowseSkillsPage;
