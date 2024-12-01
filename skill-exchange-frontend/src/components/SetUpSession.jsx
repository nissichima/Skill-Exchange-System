import React, { useState } from "react";
import "./SetUpSession.css";

const SetUpSession = () => {
  const [offeredSkill, setOfferedSkill] = useState("Web Development");
  const [participantName, setParticipantName] = useState("John Doe");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [collabTool, setCollabTool] = useState("");

  const handleInvite = () => {
    alert(`Session invite sent to ${participantName} for ${offeredSkill}.`);
  };

  return (
    <div className="setup-session">
      <header>
        <h1>Set Up a Skill Sharing Session</h1>
      </header>
      <div className="form">
        <div className="form-row">
          <label>
            Offered Skill:
            <span className="form-box">{offeredSkill}</span>
          </label>
          <button onClick={() => setOfferedSkill(prompt("Enter new skill:"))}>
            Change
          </button>
        </div>

        <div className="form-row">
          <label>
            Participant:
            <span className="form-box">{participantName}</span>
          </label>
          <button onClick={() => setParticipantName(prompt("Enter new participant name:"))}>
            Change
          </button>
        </div>

        <div className="form-row">
          <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Time:
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
          <label>
            Collaboration Tool:
            <input
              type="text"
              value={collabTool}
              placeholder="e.g., Zoom, Google Meet"
              onChange={(e) => setCollabTool(e.target.value)}
            />
          </label>
        </div>

        <button className="invite-btn" onClick={handleInvite}>
          Send Invite
        </button>
      </div>
    </div>
  );
};

export default SetUpSession;
