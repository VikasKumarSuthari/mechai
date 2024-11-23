import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const api = {
  // Authentication Endpoints
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  },

  // User Profile Endpoints
  getProfile: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Could not fetch profile' };
    }
  },

  updateProfile: async (token, userData) => {
    try {
      const response = await axios.put(`${BASE_URL}/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Profile update failed' };
    }
  },

  // Generic request methods
  get: async (endpoint, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Request failed' };
    }
  },

  post: async (endpoint, data, token) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Request failed' };
    }
  }
};

export default api;