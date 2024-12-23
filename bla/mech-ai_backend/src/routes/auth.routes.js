import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile ,
  verifyotp,
  completeRegistration,
  forgotpassword,
  setpassword
} from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.post('/verify-otp',verifyotp);
router.post('/confirm-registration',completeRegistration);
router.post('/forgot-password',forgotpassword);
router.post('/set-password',setpassword);

export default router;