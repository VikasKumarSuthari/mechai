import React from 'react';
import MessageBubble from './MessageBubble';

const ChatHistory = ({ messages }) => {
  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="space-y-6">
      {Object.entries(messageGroups).map(([date, messages]) => (
        <div key={date}>
          <div className="flex justify-center mb-4">
            <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              {date === new Date().toLocaleDateString() ? 'Today' : date}
            </span>
          </div>
          
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === 'currentUserId'} // Replace with actual user ID comparison
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;