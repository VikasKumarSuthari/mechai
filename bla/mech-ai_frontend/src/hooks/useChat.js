import { useState, useCallback } from 'react';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const addMessage = useCallback((message) => {
    setMessages(prevMessages => [...prevMessages, {
      ...message,
      timestamp: new Date().toISOString()
    }]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const startNewChat = useCallback((chatDetails) => {
    setCurrentChat(chatDetails);
    setMessages([]);
  }, []);

  return {
    messages,
    currentChat,
    addMessage,
    clearMessages,
    startNewChat
  };
};

export default useChat;