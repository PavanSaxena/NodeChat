import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      // Replace this with your actual AI/chatbot API call
      const botResponse = await new Promise((resolve) =>
        setTimeout(() => resolve({ role: 'bot', content: `Echo: ${input}` }), 1000)
      );

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', content: 'Error retrieving response.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="w-full max-w-3xl mx-auto h-screen flex flex-col p-4">
      <div className="flex-1 overflow-y-auto mb-4" role="log" aria-live="polite">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic ml-2">Bot is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          aria-label="Message input"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
