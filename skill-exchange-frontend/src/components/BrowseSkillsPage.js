import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./BrowseSkillsPage.css";

const BrowseSkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [filters, setFilters] = useState({ skillName: "", category: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Fetch skills when the page loads or filters change
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get("/api/skills/find", { params: filters });
        if (data.skills.length === 0) {
          setErrorMessage("No skills found matching the criteria.");
        } else {
          setSkills(data.skills);
          setErrorMessage("");
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        setErrorMessage("Failed to load skills. Please try again.");
      }
    };

    fetchSkills();
  }, [filters]);

  // Handle search term input
  const handleSearchChange = (e) => {
    setFilters({ ...filters, skillName: e.target.value });
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  return (
    <div className="browse-skills-page">
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

      <main>
        <h1>Browse Skills</h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by skill name..."
            value={filters.skillName}
            onChange={handleSearchChange}
          />
          <select name="category" value={filters.category} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Art">Art</option>
            <option value="Cooking">Cooking</option>
            <option value="Music">Music</option>
          </select>
        </div>

        {errorMessage && <div className="error">{errorMessage}</div>}

        <div className="skills-container">
          {skills.map((skill) => (
            <div key={skill._id} className="skill-card">
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
