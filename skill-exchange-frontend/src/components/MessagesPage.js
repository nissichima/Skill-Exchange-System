import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Messages.css";

const Messages = () => {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch initial recipients or data (mock this if backend is unavailable)
    setRecipients(["User1", "User2", "User3"]); // Replace with API call
  }, []);

  const handleRecipientSelect = async (recipient) => {
    setSelectedRecipient(recipient);
    // Fetch messages for the selected recipient
    try {
      const response = await axios.get(`/api/message/${recipient.id}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages", error);
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
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="messages-page">
      <div className="header">SkillShare</div>
      <div className="main-container">
        <div className="recipients-list">
          <h3>List of Recipients</h3>
          {recipients.map((recipient, index) => (
            <div
              key={index}
              className={`recipient ${
                selectedRecipient?.name === recipient ? "selected" : ""
              }`}
              onClick={() => handleRecipientSelect({ name: recipient, id: index })}
            >
              {recipient}
            </div>
          ))}
        </div>
        <div className="chat-container">
          {selectedRecipient ? (
            <>
              <div className="chat-header">{selectedRecipient.name}</div>
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
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
