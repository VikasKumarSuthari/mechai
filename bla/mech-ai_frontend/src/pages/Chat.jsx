import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, ThumbsUp, ThumbsDown, User, Bot, Paperclip, 
  Sun, Moon, Copy, Share, Settings, Search, Menu,
  MessageSquare, Clock, RefreshCw, Plus, Filter,
  ChevronDown, Star, Archive, Trash2, Pin
} from 'lucide-react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      sender: 'assistant',
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
  const navigate=useNavigate();
  const messagesEndRef = useRef(null);

  const [previousChats,setPreviouschats] = useState([]);
  const token=sessionStorage.getItem('token');

  useEffect(() => {
    console.log('useEffect triggered');
    const fetchUserAndChats = async () => {
      console.log('Fetching user and chats...');
      try {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          const userdata = JSON.parse(storedUser);
          console.log('User data:', userdata);
          const response = await axios.get(`http://localhost:8000/api/chats/getchats/${userdata._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Response data:', response.data);
          setPreviouschats(response.data);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
  
    if (token) {
      fetchUserAndChats();
    }
  }, [token]);
  
  

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
        sender: 'user',
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
        sender: 'assistant',
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
    const user = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
  
    if (!user || !token) {
      setNotification("User is not logged in. Please log in and try again.");
      return;
    }
  
    try {
      const parsedUser = JSON.parse(user); 
      const userId = parsedUser._id;
  
      console.log(messages);
  
      let response;
  
      if (selectedChat) {
        
        response = await axios.put(
          `http://localhost:8000/api/chats/updatechat/${selectedChat}`,
          { messages },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotification("Chat updated successfully!");
      } else {
        
        response = await axios.post(
          "http://localhost:8000/api/chats/savechat",
          { messages, userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotification("New chat saved successfully!");
      }
  
      console.log("Response from server:", response.data);
  
      
      window.location.reload();
    } catch (error) {
      console.error("Error saving/updating chat:", error.response?.data || error.message);
      setNotification("Failed to save/update chat. Please try again.");
    }
  };
  
  
  

  const formatRelativeTime = (updatedAt) => {
    const currentDate = new Date();
    const updatedDate = new Date(updatedAt);
  
    
    const isSameDay = currentDate.toDateString() === updatedDate.toDateString();
    if (isSameDay) {
      return 'Today';
    }
  
    
    const timeDifferenceInMs = currentDate - updatedDate;
    const differenceInDays = Math.floor(timeDifferenceInMs / (1000 * 3600 * 24));
  
    return `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`;
  };



  const filteredChats = previousChats
    .filter(chat => {
      const matchesSearch =
        chat.title.toLowerCase().includes(sidebarSearchQuery.toLowerCase()) 
      const matchesFilter =
        chatFilter === 'all' ||
        (chatFilter === 'starred' ) ||
        (chatFilter === 'pinned' );

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      return b.tupdatedAt - a.updatedAt;
    });



    const handleselectedchat = async(chatId) => {
      try{
        
      const response=await axios.get(`http://localhost:8000/api/chats/getchatbyid/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data[0].messages);
      setMessages(response.data[0].messages);
      }
      catch(error)
      {
        console.log("error occured",error);
      }

    };



    const formatTimeAgo = (timestamp) => {
      const now = Date.now();
    
      // Convert ISO string to timestamp (milliseconds)
      const time = new Date(timestamp).getTime();
      
      // If the timestamp is invalid, return 'Invalid Time'
      if (isNaN(time)) {
        console.error('Invalid timestamp:', timestamp);
        return 'Invalid Time';
      }
    
      const diff = now - time;
    
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);
    
      if (seconds < 60) {
        return `${seconds}s ago`;
      } else if (minutes < 60) {
        return `${minutes} min ago`;
      } else if (hours < 24) {
        return `${hours}h ago`;
      } else if (days < 30) {
        return `${days}d ago`;
      } else if (months < 12) {
        return `${months}mo ago`;
      } else {
        return `${years}y ago`;
      }
    };


   
    
    
    


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
                  key={chat._id}
                  onClick={() => {
                    setSelectedChat(chat._id);
                    handleselectedchat(chat._id);
                  }}
                  className={`p-3 border-b cursor-pointer ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'} ${selectedChat === chat.id ? (isDarkMode ? 'bg-gray-700' : 'bg-blue-50') : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        { <Pin className="w-3 h-3 text-blue-500" />}
                        {<Star className="w-3 h-3 text-yellow-500" fill="currentColor" /> }
                        <h3 className="text-sm font-medium truncate">{chat.title || 'Untitled Chat'}</h3>
                      </div>
                    </div>
                    <div className="ml-2 flex flex-col items-end">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatRelativeTime(chat.updatedAt)}</span>
                      
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
              <div key={message._id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} space-x-3`}>
                <div className={`max-w-xl ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} p-3 rounded-lg`}>
                  {message.content}
                  <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
                  <span>{formatTimeAgo(message.timestamp)}</span>
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