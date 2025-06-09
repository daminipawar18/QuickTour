import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Chat.css";

const Chat = () => {
    const location = useLocation();
    const { driverId, driverName } = location.state || {};
    
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: "rider" }]);
            setInput("");
        }
    };

    return (
        <div className="chat-container">
            {/* ✅ Fixed: Show Correct Driver Name */}
            <div className="chat-header">
                💬 Chat with {driverName ? driverName : "Driver"}
            </div>

            {/* 💬 Chat Messages */}
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message ${msg.sender === "rider" ? "user-message" : "driver-message"}`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* 🔽 Message Input */}
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="send-button">
                    ➤
                </button>
            </div>
        </div>
    );
};

export default Chat;
