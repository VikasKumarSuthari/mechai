import { useState, useEffect, useCallback } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(() => {
    // Initialize user state from sessionStorage if available
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize authentication state based on stored user
    return !!sessionStorage.getItem('user');
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Debug function to log state changes
  const logState = useCallback((action, userData) => {
    console.group(`Auth State Update - ${action}`);
    console.log('User Data:', userData);
    console.log('Is Authenticated:', !!userData);
    console.log('SessionStorage:', sessionStorage.getItem('user'));
    console.groupEnd();
  }, []);

  const login = useCallback((userData) => {
    try {
      if (!userData) {
        throw new Error('User data is required for login');
      }

      // Store in session storage
      sessionStorage.setItem('user', JSON.stringify(userData));
      
      // Update states synchronously
      setUser(userData);
      setIsAuthenticated(true);
      
      logState('Login', userData);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      logState('Login Error', null);
      return false;
    }
  }, [logState]);

  const logout = useCallback(() => {
    try {
      // Clear session storage
      sessionStorage.removeItem('user');
      
      // Update states
      setUser(null);
      setIsAuthenticated(false);
      
      logState('Logout', null);
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }, [logState]);

  const checkAuthStatus = useCallback(() => {
    try {
      setIsLoading(true);
      const storedUser = sessionStorage.getItem('user');

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
        logState('Auth Check - Authenticated', userData);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        logState('Auth Check - Not Authenticated', null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setIsAuthenticated(false);
      logState('Auth Check Error', null);
    } finally {
      setIsLoading(false);
    }
  }, [logState]);

  // Effect to monitor sessionStorage changes
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'user') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    checkAuthStatus();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuthStatus]);

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('Current Auth State:', { user, isAuthenticated, isLoading });
  }, [user, isAuthenticated, isLoading]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthStatus,
  };
};

export default useAuth;