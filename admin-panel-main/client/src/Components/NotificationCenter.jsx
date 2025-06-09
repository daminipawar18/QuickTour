import React, { useState } from "react";
import "./NotificationCenter.css";

const NotificationCenter = () => {
  const [message, setMessage] = useState("");

  const sendNotification = () => {
    if (message.trim() === "") {
      alert("Please enter a message before sending.");
      return;
    }
    alert(`Notification sent: ${message}`);
    setMessage("");
  };

  return (
    <div className="notification-center">
      <h2 className="notification-title">Notification Center</h2>
      <textarea
        className="notification-textarea"
        placeholder="Enter message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="notification-btn" onClick={sendNotification}>
        Send Notification
      </button>
    </div>
  );
};

export default NotificationCenter;
