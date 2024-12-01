import React, { useState } from "react";
import "./RateSession.css";

const RateSession = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = () => {
    alert(`Feedback submitted: ${rating} - ${feedback}`);
  };

  return (
    <div className="rate-session">
      <header>
        <h1>Rate & Feedback</h1>
      </header>
      <form className="rate-form" onSubmit={(e) => e.preventDefault()}>
        <p>Your session with <strong>--Participant Name--</strong> ended.</p>
        <p>Was the session good or bad?</p>
        <div className="rating-buttons">
          <button type="button" onClick={() => setRating("Good")}>
            Good
          </button>
          <button type="button" onClick={() => setRating("Bad")}>
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
