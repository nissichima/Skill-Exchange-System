import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SetUpSession.css";

const SetUpSession = () => {
  const [offeredSkill, setOfferedSkill] = useState("Web Development");
  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [locationType, setLocationType] = useState("Online");

  // Fetch participant list
  useEffect(() => {
    axios.get("/api/participants")
      .then((response) => {
        setParticipants(response.data);
        setParticipantName(response.data[0]?.name || ""); // Default to first participant
      })
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  }, []);

  const handleInvite = () => {
    const dateTime = new Date(`${date}T${time}`);
    const sessionData = { 
      organizer: "OrganizerUserId", // Replace with actual user ID
      participant: participantName,
      skill: offeredSkill,
      dateTime,
      duration: parseInt(duration),
      locationType
    };
    axios.post("/api/sessions", sessionData)
      .then(() => {
        alert("Session invite sent successfully!");
      })
      .catch((error) => {
        console.error("Error creating session:", error);
        alert("Failed to send session invite.");
      });
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
          <button onClick={() => setOfferedSkill(prompt("Enter new skill:") || offeredSkill)}>
            Change
          </button>
        </div>

        <div className="form-row">
          <label>
            Participant:
            <select value={participantName} onChange={(e) => setParticipantName(e.target.value)}>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.name}>
                  {participant.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
          <label>
            Time:
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </label>
          <label>
            Duration (minutes):
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </label>
          <label>
            Location Type:
            <select value={locationType} onChange={(e) => setLocationType(e.target.value)}>
              <option value="Online">Online</option>
              <option value="Physical">Physical</option>
            </select>
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
