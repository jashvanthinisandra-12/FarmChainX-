import React, { useState } from "react";
import ChatbotWidget from "./ChatbotWidget";
import "./FloatingChatbot.css";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button className="chatbot-button" onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {/* Popup Chat Window */}
      {open && (
        <div className="chatbot-popup">
          <div className="chatbot-popup-header">
            <span>AI Assistant</span>
            <button className="close-btn" onClick={() => setOpen(false)}>✖</button>
          </div>

          <ChatbotWidget />
        </div>
      )}
    </>
  );
}
