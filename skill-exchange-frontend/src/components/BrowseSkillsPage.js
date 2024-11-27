import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BrowseSkillsPage.css';

const BrowseSkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [filters, setFilters] = useState({ skillName: '', category: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await axios.get('/api/skills/find', { params: filters });
      setSkills(data.skills);
      setErrorMessage('');
    } catch (error) {
      if (error.response?.status === 404) {
        setSkills([]);
        setErrorMessage('No skills found matching the criteria.');
      } else {
        console.error('Error fetching skills:', error);
        setErrorMessage('Failed to load skills. Please try again.');
      }
    }
  };

  const handleSearch = () => {
    setFilters({ ...filters, skillName: searchTerm });
    fetchSkills();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="browse-skills-page">
      <h1>Browse Skills</h1>
      <div className="navbar">
        <a href="/browse">Browse Skills</a>
        <a href="/setup-session">Set Up Session</a>
        <a href="/history">History</a>
        <a href="/messages">Messages</a>
        <a href="/profile">Profile</a>
        <a href="/logout">Logout</a>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by skill name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <select name="category" onChange={handleFilterChange} value={filters.category}>
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
            <p>Category: {skill.category}</p>
            <p>{skill.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseSkillsPage;
