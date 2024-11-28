import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const History = () => {
  // State for sessions
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

  // State for error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching sessions from the backend
    const fetchSessions = async () => {
      try {
        // Simulate a delay for fetching
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Uncomment this when backend integration is done
        // const response = await fetch("http://localhost:5000/sessions");
        // if (!response.ok) throw new Error("Failed to fetch sessions");
        // const data = await response.json();
        // setSessions(data);
      } catch (err) {
        setError("Failed to load sessions.");
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="history-page">
      <h1>History</h1>
      <nav>
        <ul className="nav-links">
          <li onClick={() => navigate("/browse")}>Browse Skills</li>
          <li onClick={() => navigate("/setup-session")}>Set Up Session</li>
          <li onClick={() => navigate("/history")}>History</li>
          <li onClick={() => navigate("/messages")}>Messages</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/logout")}>Logout</li>
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
              <p>
                <strong>Skill:</strong> {session.skill}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(session.dateTime).toLocaleString()}
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

export default History;
