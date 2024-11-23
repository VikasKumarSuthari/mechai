const AuthService = {
    login: async (email, password) => {
      try {
        // Simulated login logic
        if (email === 'user@example.com' && password === 'password123') {
          const token = generateToken();
          localStorage.setItem('token', token);
          return {
            success: true,
            token: token,
            user: { 
              id: '123', 
              email: email,
              name: 'John Doe' 
            }
          };
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        return { 
          success: false, 
          message: error.message 
        };
      }
    },
  
    signup: async (userData) => {
      try {
        // Simulated signup logic
        const token = generateToken();
        localStorage.setItem('token', token);
        return {
          success: true,
          token: token,
          user: {
            id: '123',
            ...userData
          }
        };
      } catch (error) {
        return { 
          success: false, 
          message: error.message 
        };
      }
    },
  
    logout: () => {
      localStorage.removeItem('token');
    },
  
    isAuthenticated: () => {
      return !!localStorage.getItem('token');
    },
  
    getToken: () => {
      return localStorage.getItem('token');
    }
  };
  
  function generateToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
  
  export default AuthService;