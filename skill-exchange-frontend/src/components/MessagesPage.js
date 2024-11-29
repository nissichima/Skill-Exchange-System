import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MessagesPage.css";

const MessagesPage = () => {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch recipients from the backend
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/messages/recipients");
        setRecipients([
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" }
        ]);
      } catch (err) {
        console.error("Error fetching recipients:", err);
        setError("Failed to load recipients. Please try again.");
      }
    };

    fetchRecipients();
  }, []);

  // Handle recipient selection
  const handleRecipientSelect = async (recipient) => {
    setSelectedRecipient(recipient);
    setMessages([]); // Clear previous messages when switching recipient

    try {
      const response = await axios.get(`http://localhost:5001/api/messages/${recipient.id}`);
      setMessages(response.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages for the selected recipient.");
    }
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(`http://localhost:5001/api/messages/send/${selectedRecipient.id}`, {
        messages: newMessage,
      });
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  // Navigation handlers
  const navigateToBrowse = () => navigate("/browse");
  const navigateToSetupSession = () => navigate("/setup-session");
  const navigateToHistory = () => navigate("/history");
  const navigateToMessages = () => navigate("/messages");
  const navigateToProfile = () => navigate("/profile");

  return (
    <div className="messages-page">
      {/* Navigation Bar */}
      <header className="navbar">
        <a href="#browse-skills" onClick={navigateToBrowse} className="nav-link">
          Browse Skills
        </a>
        <a href="#setup-session" onClick={navigateToSetupSession} className="nav-link">
          Set Up Session
        </a>
        <a href="#history" onClick={navigateToHistory} className="nav-link">
          History
        </a>
        <a href="#messages" onClick={navigateToMessages} className="nav-link">
          Messages
        </a>
        <a href="#profile" onClick={navigateToProfile} className="nav-link">
          Profile
        </a>
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
                    className={`message ${
                      msg.sender === "You" ? "sent" : "received"
                    }`}
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

export default MessagesPage;
