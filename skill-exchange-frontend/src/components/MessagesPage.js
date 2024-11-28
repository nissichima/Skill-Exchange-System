import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Messages.css";

const Messages = () => {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipients from the backend
    const fetchRecipients = async () => {
      try {
        const response = await axios.get("/api/message/recipients");
        setRecipients(response.data);
      } catch (err) {
        console.error("Error fetching recipients:", err);
        setError("Failed to load recipients. Please try again.");
      }
    };

    fetchRecipients();
  }, []);

  const handleRecipientSelect = async (recipient) => {
    setSelectedRecipient(recipient);
    setMessages([]); // Clear previous messages when switching recipient

    try {
      const response = await axios.get(`/api/message/${recipient.id}`);
      setMessages(response.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages for the selected recipient.");
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(`/api/message/send/${selectedRecipient.id}`, {
        message: newMessage,
      });
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="messages-page">
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

      {/* Main Content */}
      <div className="main-container">
        {/* Recipient List */}
        <div className="recipients-list">
          <h3>List of Recipients</h3>
          {error && <div className="error">{error}</div>}
          {recipients.length > 0 ? (
            recipients.map((recipient, index) => (
              <div
                key={index}
                className={`recipient ${
                  selectedRecipient?.id === recipient.id ? "selected" : ""
                }`}
                onClick={() => handleRecipientSelect(recipient)}
              >
                {recipient.name}
              </div>
            ))
          ) : (
            <p>No recipients available.</p>
          )}
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          {selectedRecipient ? (
            <>
              <div className="chat-header">{selectedRecipient.name}</div>
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.sender === "You" ? "sent" : "received"}`}
                  >
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          ) : (
            <div className="no-recipient">Select a recipient to start chatting.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
