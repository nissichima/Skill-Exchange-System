import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles.css";

const History = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch sessions on component mount
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("http://localhost:5000/sessions");
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        setSessions(data);
      } catch (err) {
        setError("Failed to load sessions.");
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="history-page">
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
        <h1>History</h1>
        <div className="history-container">
          <h2>Past Sessions</h2>
          {error && <div className="error">{error}</div>}
          {sessions.length === 0 ? (
            <p>No past sessions available.</p>
          ) : (
            sessions.map((session) => (
              <div key={session._id} className="session-card">
                <p>
                  <strong>Skill:</strong> {session.skill}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(session.dateTime).toLocaleString()}
                </p>
                <p>
                  <strong>Location:</strong> {session.locationType}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
