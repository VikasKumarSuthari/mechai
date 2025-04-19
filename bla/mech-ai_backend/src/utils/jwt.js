import jwt from 'jsonwebtoken';
import { environment } from '../config/environment.js';

// Generate JWT Token
export const generateToken = (userId, expiresIn = '30d') => {
  return jwt.sign(
    { id: userId }, 
    environment.JWT_SECRET, 
    { expiresIn }
  );
};

// Verify JWT Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, environment.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Generate Refresh Token
export const generateRefreshToken = (userId, expiresIn = '60d') => {
  return jwt.sign(
    { id: userId, type: 'refresh' }, 
    environment.JWT_SECRET, 
    { expiresIn }
  );
};

// Token Utilities
export const tokenUtils = {
  // Check if token is expired
  isTokenExpired: (token) => {
    try {
      const decoded = jwt.decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  },

  // Decode token without verification
  decodeToken: (token) => {
    try {
      return jwt.decode(token);
    } catch (error) {
      return null;
    }
  }
};
