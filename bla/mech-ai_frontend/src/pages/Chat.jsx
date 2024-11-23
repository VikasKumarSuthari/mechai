import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import  useChat  from '../hooks/useChat';
import ChatInterface from '../components/chat/ChatInterface';
import ChatHistory from '../components/chat/ChatHistory';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Chat = () => {
  const { user } = useAuth();
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    error 
  } = useChat();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const [inputMessage, setInputMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      await sendMessage({
        content: inputMessage,
        chatId: selectedChat,
        userId: user.id
      });
      setInputMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    // Additional logic to load selected chat messages
  };

  if (!user) {
    return null; // Or loading spinner
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat History Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4">
        <ChatHistory 
          selectedChat={selectedChat}
          onChatSelect={handleChatSelect}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold">
            {selectedChat ? 'Chat with AI' : 'Select or start a new chat'}
          </h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <Card className="h-full">
            <CardContent className="p-4 space-y-4">
              {messages.map((message, index) => (
                <ChatInterface
                  key={index}
                  message={message}
                  isUser={message.userId === user.id}
                />
              ))}
              {isLoading && (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
              {error && (
                <div className="text-red-500 text-center">
                  Error: {error.message}
                </div>
              )}
              <div ref={chatEndRef} />
            </CardContent>
          </Card>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !inputMessage.trim()}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;