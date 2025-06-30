import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`px-4 py-2 rounded-2xl max-w-[75%] ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
