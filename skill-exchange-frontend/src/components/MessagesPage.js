import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Messages.css";

const Messages = () => {
  const [recipients, setRecipients] = useState([
    { id: "1", name: "User1" },
    { id: "2", name: "User2" },
    { id: "3", name: "User3" },
  ]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRecipient) {
      // Mock fetching messages for a selected recipient
      const mockMessages = [
        { sender: "User1", text: "Hello!" },
        { sender: "You", text: "Hi there!" },
        { sender: "User1", text: "How are you?" },
      ];
      setMessages(mockMessages);
    }
  }, [selectedRecipient]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
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
          {recipients.map((recipient) => (
            <div
              key={recipient.id}
              className={`recipient ${
                selectedRecipient?.id === recipient.id ? "selected" : ""
              }`}
              onClick={() => setSelectedRecipient(recipient)}
            >
              {recipient.name}
            </div>
          ))}
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
