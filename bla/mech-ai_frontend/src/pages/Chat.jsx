import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, ThumbsUp, ThumbsDown, User, Bot, Paperclip, 
  Sun, Moon, Copy, Share, Settings, Search, Menu,
  MessageSquare, Clock, RefreshCw, Plus, Filter,
  ChevronDown, Star, Archive, Trash2, Pin
} from 'lucide-react';

import axios from 'axios';

// Custom Dropdown Component
const Dropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Notification Component
const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
      {message}
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm Claude. How can I help you today?",
      timestamp: new Date(),
      reactions: [],
      status: 'delivered',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatFilter, setChatFilter] = useState('all');
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState('');
  
  const messagesEndRef = useRef(null);

  const [previousChats] = useState([
    {
      id: 1,
      title: "Code Review Discussion",
      lastMessage: "Here's the updated version with the changes you requested",
      timestamp: new Date(2024, 10, 24, 14, 30),
      unread: 2,
      pinned: true,
      starred: true,
      category: 'work',
    },
    {
      id: 2,
      title: "Project Planning",
      lastMessage: "Let's break down the tasks for next sprint",
      timestamp: new Date(2024, 10, 24, 12, 15),
      unread: 0,
      pinned: true,
      starred: false,
      category: 'work',
    },
    {
      id: 3,
      title: "Writing Assistant",
      lastMessage: "The essay has been revised with your suggestions",
      timestamp: new Date(2024, 10, 23, 18, 45),
      unread: 1,
      pinned: false,
      starred: true,
      category: 'personal',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async(e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        type: 'user',
        content: newMessage,
        timestamp: new Date(),
        reactions: [],
        status: 'sent',
      }
    ]);

    setNewMessage('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
    try {
      const response = await axios.post('http://localhost:8100/api/chat', {
        message: newMessage,
      });
  
    
      const botMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response.data.reply, 
        timestamp: new Date(),
        reactions: [],
        status: 'received',
      };
      setMessages((prev) => [...prev, botMessage]);
    }catch (error) {
        console.error('Error sending message:', error);
        setNotification('Failed to send message. Please try again.');
      }
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
    setNotification('Message copied to clipboard');
  };

  const handlenewchat = async () => {
    // Retrieve the user and token from session storage
    const user = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
  
    if (!user || !token) {
      setNotification("User is not logged in. Please log in and try again.");
      return;
    }
  
    try {
      const parsedUser = JSON.parse(user); // Parse the user object
      const userId = parsedUser._id; // Extract the user ID
  
      console.log(messages);
  
      const response = await axios.post(
        "http://localhost:8000/api/chats/savechat",
        { messages, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("done");
  
      setNotification("Chat saved successfully!");
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error saving chat:", error.response?.data || error.message);
      setNotification("Failed to save chat. Please try again.");
    }
  };
  
  

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filteredChats = previousChats
    .filter(chat => {
      const matchesSearch =
        chat.title.toLowerCase().includes(sidebarSearchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(sidebarSearchQuery.toLowerCase());
      const matchesFilter =
        chatFilter === 'all' ||
        (chatFilter === 'starred' && chat.starred) ||
        (chatFilter === 'pinned' && chat.pinned);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.timestamp - a.timestamp;
    });

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}
      >
        {isSidebarOpen && (
          <>
            {/* Sidebar Header */}
            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Chats</h2>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handlenewchat}
                  
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={sidebarSearchQuery}
                  onChange={(e) => setSidebarSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className={`flex p-2 gap-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {['all', 'starred', 'pinned'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setChatFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-sm capitalize ${chatFilter === filter ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-3 border-b cursor-pointer ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'} ${selectedChat === chat.id ? (isDarkMode ? 'bg-gray-700' : 'bg-blue-50') : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {chat.pinned && <Pin className="w-3 h-3 text-blue-500" />}
                        {chat.starred && <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />}
                        <h3 className="text-sm font-medium truncate">{chat.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">{chat.lastMessage}</p>
                    </div>
                    <div className="ml-2 flex flex-col items-end">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatRelativeTime(chat.timestamp)}</span>
                      {chat.unread > 0 && (
                        <span className="mt-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Main Header */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 flex items-center justify-between`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">{selectedChat ? previousChats.find(c => c.id === selectedChat).title : 'Chat'}</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} space-x-3`}>
                <div className={`max-w-xl ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} p-3 rounded-lg`}>
                  {message.content}
                  <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
                    <span>{formatRelativeTime(message.timestamp)}</span>
                    <button
                      className="hover:text-gray-700"
                      onClick={() => copyMessage(message.content)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start space-x-3">
                <div className="bg-gray-300 p-3 rounded-lg text-gray-500">Claude is typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <form onSubmit={handleSend} className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button type="submit" className="p-2 ml-2 rounded-lg bg-blue-500 text-white">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;