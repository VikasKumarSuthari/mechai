import React, { createContext, useState, useContext, useCallback } from 'react';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const addMessage = useCallback((message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const startNewChat = useCallback((chatDetails) => {
    setCurrentChat(chatDetails);
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider value={{ 
      messages, 
      currentChat,
      addMessage,
      clearMessages,
      startNewChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  
  return context;
};

export default ChatContext;