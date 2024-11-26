import React from 'react';
import './Homepage.css';

const Homepage = () => {
  return (
    <main className="homepage">
      <section className="intro">
        <h1>SkillShare</h1>
        <p>text</p>
        <p>text</p>
        <p>text</p>
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

