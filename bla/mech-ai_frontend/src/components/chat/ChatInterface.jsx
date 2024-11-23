import React, { useState, useEffect, useRef } from 'react';
import  useChat  from '../../hooks/useChat';
import { Send, Paperclip, Smile, MoreVertical, Image as ImageIcon } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatHistory from './ChatHistory';

const ChatInterface = () => {
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    error,
    clearError 
  } = useChat();

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessage({
        content: newMessage,
        type: 'text',
        timestamp: new Date().toISOString()
      });
      setNewMessage('');
      setShowEmojiPicker(false);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should not exceed 5MB');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await sendMessage({
        content: URL.createObjectURL(file),
        type: 'file',
        fileName: file.name,
        fileSize: file.size,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Failed to upload file:', err);
    }
  };

  // Handle typing indicator
  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      // Emit typing event to other users
      // socket.emit('typing', { userId: currentUser.id });
      
      // Clear typing indicator after 2 seconds of no typing
      setTimeout(() => {
        setIsTyping(false);
        // socket.emit('stopTyping', { userId: currentUser.id });
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src="/api/placeholder/40/40" 
              alt="Chat Avatar" 
              className="w-10 h-10 rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Chat Room</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
            <button 
              onClick={clearError}
              className="ml-2 text-red-700 hover:text-red-800"
            >
              Dismiss
            </button>
          </div>
        )}

        <ChatHistory messages={messages} />
        
        {isTyping && (
          <div className="text-sm text-gray-500 italic mb-2">
            Someone is typing...
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
          
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Smile className="w-5 h-5 text-gray-500" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={handleTyping}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
              disabled={isLoading}
            />
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 left-0">
                {/* Emoji picker component would go here */}
                <div className="bg-white shadow-lg rounded-lg p-2 border">
                  {/* Emoji grid */}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!newMessage.trim() || isLoading}
            className={`p-2 rounded-full ${
              !newMessage.trim() || isLoading
                ? 'bg-gray-100 text-gray-400'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;