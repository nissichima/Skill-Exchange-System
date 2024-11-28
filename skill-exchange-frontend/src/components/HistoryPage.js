import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistoryPage.css";

const HistoryPage = () => {
  const [sessions, setSessions] = useState([
    {
      _id: "1",
      skill: "Web Development",
      dateTime: "2024-11-27T14:00:00Z",
      locationType: "Online",
    },
    {
      _id: "2",
      skill: "Graphic Design",
      dateTime: "2024-11-28T10:00:00Z",
      locationType: "Physical",
    },
    {
      _id: "3",
      skill: "Photography",
      dateTime: "2024-11-29T16:00:00Z",
      locationType: "Online",
    },
  ]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (err) {
        setError("Failed to load sessions.");
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="history-page">
      <header className="navbar">
        <a href="#browse-skills" onClick={() => navigate("/browse")} className="nav-link">
          Browse Skills
        </a>
        <a href="#setup-session" onClick={() => navigate("/setup-session")} className="nav-link">
          Set Up Session
        </a>
        <a href="#history" onClick={() => navigate("/history")} className="nav-link">
          History
        </a>
        <a href="#messages" onClick={() => navigate("/messages")} className="nav-link">
          Messages
        </a>
        <a href="#profile" onClick={() => navigate("/profile")} className="nav-link">
          Profile
        </a>
      </header>

      <div className="history-container">
        <h1>History</h1>
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
    </div>
  );
};

export default HistoryPage;
