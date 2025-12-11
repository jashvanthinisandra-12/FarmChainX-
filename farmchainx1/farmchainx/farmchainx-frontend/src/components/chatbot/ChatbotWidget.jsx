import React, { useState, useRef, useEffect } from "react";
import "./chatbot.css";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const endRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ INIT VOICE RECOGNITION
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.start();
  };

  // ✅ TEXT TO SPEECH (BOT VOICE)
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 🔧 mock AI reply (replace later with backend)
    const botReply = {
      from: "bot",
      text: "Server error. Try again later."
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botReply]);
      speak(botReply.text); // ✅ voice output
    }, 600);
  };

  return (
    <>
      {/* FLOATING AI BUTTON */}
      {!open && (
        <button className="ai-fab" onClick={() => setOpen(true)}>
          🤖 AI
        </button>
      )}

      {/* CHAT WINDOW */}
      {open && (
        <div className="chatbox">
          <div className="chat-header">
            AI Assistant
            <span className="close" onClick={() => setOpen(false)}>
              ✕
            </span>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="chat-input">
            {/* ✅ MIC BUTTON */}
            <button
              onClick={startListening}
              title="Speak"
              className={listening ? "mic active" : "mic"}
            >
              🎙
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                listening ? "Listening..." : "Message AI Assistant"
              }
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
