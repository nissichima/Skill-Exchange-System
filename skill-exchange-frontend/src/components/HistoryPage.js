import React, { useEffect, useState } from "react";
import "./styles.css";

const History = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/sessions")
      .then((response) => response.json())
      .then((data) => setSessions(data))
      .catch((error) => setError("Failed to load sessions"));
  }, []);

  return (
    <div className="history-page">
      <h1>History</h1>
      <nav>
        <ul className="nav-links">
          <li>Browse Skills</li>
          <li>Set Up Session</li>
          <li>History</li>
          <li>Messages</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </nav>
      <div className="history-container">
        <h2>Past Sessions</h2>
        {error && <div className="error">{error}</div>}
        {sessions.length === 0 ? (
          <p>No past sessions available.</p>
        ) : (
          sessions.map((session) => (
            <div key={session._id} className="session-card">
              <p><strong>Skill:</strong> {session.skill}</p>
              <p><strong>Date:</strong> {new Date(session.dateTime).toLocaleString()}</p>
              <p><strong>Location:</strong> {session.locationType}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
