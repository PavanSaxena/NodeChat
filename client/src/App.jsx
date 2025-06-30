import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const API_URL = "http://localhost:5000/api/message";

const App = () => {
  const [userId] = useState("user123"); // You can make this dynamic later
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: input }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [...prev, { role: "bot", content: "⚠️ Error: " + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">NodeChat 💬</h1>

      <div className="w-full max-w-2xl flex-1 bg-white rounded-xl shadow-md p-4 overflow-y-auto mb-4">
        {messages.length === 0 && <p className="text-gray-400 text-center">Start the conversation...</p>}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg max-w-[80%] ${
              msg.role === "user" ? "bg-blue-100 self-end ml-auto" : "bg-gray-200 self-start mr-auto"
            }`}
          >
            <p className="text-sm text-gray-800">{msg.content}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="w-full max-w-2xl flex gap-2">
        <textarea
          className="flex-1 p-2 border rounded-md resize-none h-16 focus:outline-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default App;
