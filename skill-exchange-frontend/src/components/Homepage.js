import React from 'react';
import './Homepage.css';

const Homepage = () => {
  return (
    <main className="homepage">
      <section className="intro">
      <h1 className="welcome-header">Welcome to SkillShare</h1>
      <p className="intro-text">
        The place where knowledge meets opportunity. Whether you’re here to learn something new or share your expertise, SkillShare connects you with a community passionate about growth and learning. Start your journey today and see how far your skills can take you!
      </p>
      </section>
      <section className="offered-skills">
        <h2>Offered Skills</h2>
        <div className="skills-grid">
          <div className="skill-card">Skill 1</div>
          <div className="skill-card">Skill 2</div>
          <div className="skill-card">Skill 3</div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;

