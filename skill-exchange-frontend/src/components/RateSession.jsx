import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RateSession.css";

const RateSession = ({ sessionId, currentUserId }) => {
  const [participantName, setParticipantName] = useState("--Participant Name--");
  const [ratedUserId, setRatedUserId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

  // Fetch session details
  useEffect(() => {
    axios.get(`/api/session-details/${sessionId}`)
      .then((response) => {
        setParticipantName(response.data.participantName);
        setRatedUserId(response.data.participantId); // Assuming this is returned by the backend
      })
      .catch((error) => {
        console.error("Error fetching session details:", error);
      });
  }, [sessionId]);

  const handleSubmit = () => {
    const feedbackData = { 
      sessionId, 
      ratedBy: currentUserId, 
      ratedUser: ratedUserId, 
      rating, 
      feedback 
    };
    axios.post("/api/feedback", feedbackData)
      .then(() => {
        alert("Feedback submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        alert("Failed to submit feedback.");
      });
  };

  return (
    <div className="rate-session">
      <header>
        <h1>Rate & Feedback</h1>
      </header>
      <form className="rate-form" onSubmit={(e) => e.preventDefault()}>
        <p>Your session with <strong>{participantName}</strong> ended.</p>
        <p>Was the session good or bad?</p>
        <div className="rating-buttons">
          <button type="button" onClick={() => setRating("good")}>
            Good
          </button>
          <button type="button" onClick={() => setRating("bad")}>
            Bad
          </button>
        </div>
        <textarea
          placeholder="Leave your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Send Feedback
        </button>
      </form>
    </div>
  );
};

export default RateSession;
