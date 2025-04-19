import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { environment } from '../config/environment.js';

const authMiddleware = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, environment.JWT_SECRET);

      // Find user and attach to request
      req.user = await User.findById(decoded.id)
        .select('-password')
        .lean();

      if (!req.user) {
        return res.status(401).json({ 
          message: 'Not authorized, user not found' 
        });
      }

      next();
    } catch (error) {
      res.status(401).json({ 
        message: 'Not authorized, token failed',
        error: error.message 
      });
    }
  }

  // If no token
  if (!token) {
    res.status(401).json({ 
      message: 'Not authorized, no token' 
    });
  }
};

export default authMiddleware;