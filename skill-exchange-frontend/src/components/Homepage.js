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
    <div className="skill-card">
      <h3>Web Development</h3>
      <p>Learn HTML, CSS, JavaScript, React, and more.</p>
    </div>
    <div className="skill-card">
      <h3>Graphic Design</h3>
      <p>Master Photoshop, Illustrator, and other creative tools.</p>
    </div>
    <div className="skill-card">
      <h3>Marketing</h3>
      <p>Learn SEO, social media, and branding strategies.</p>
    </div>
    <div className="skill-card">
      <h3>Photography</h3>
      <p>Capture perfect shots and edit like a pro.</p>
    </div>
    <div className="skill-card">
      <h3>Writing</h3>
      <p>Improve storytelling and blogging skills.</p>
    </div>
    <div className="skill-card">
      <h3>Languages</h3>
      <p>Teach or learn new languages to connect globally.</p>
    </div>
    <div className="skill-card">
      <h3>Cooking</h3>
      <p>Explore culinary arts and master new recipes.</p>
    </div>
    <div className="skill-card">
      <h3>Music</h3>
      <p>Play instruments or learn music theory.</p>
    </div>
    <div className="skill-card">
      <h3>Fitness</h3>
      <p>Share fitness routines and tips for a healthier life.</p>
    </div>
    <div className="skill-card">
      <h3>Public Speaking</h3>
      <p>Enhance presentation and speaking skills.</p>
    </div>
    <div className="skill-card">
      <h3>Art</h3>
      <p>Learn painting, drawing, and creative techniques.</p>
    </div>
    <div className="skill-card">
      <h3>Finance</h3>
      <p>Understand budgeting, investing, and financial planning.</p>
    </div>
  </div>
</section>


    </main>
  );
};

export default Homepage;

