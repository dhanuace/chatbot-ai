import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userText = input;

    // 1. Add user message
    const updatedMessages = [
      ...messages,
      { role: "user", text: userText },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // 2. Send FULL chat history to backend
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role === "bot" ? "assistant" : "user",
            content: msg.text,
          })),
        }),
      });

      const data = await res.json();

      // 3. Add AI reply
      const botMessage = {
        role: "bot",
        text: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Server error ❌" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-box">

          <h1>Welcome to Dhanu AI 🤖</h1>

          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bot-msg">
                AI is thinking...
              </div>
            )}
          </div>

          <div className="input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>Send</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;