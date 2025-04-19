import express from 'express';
import {
  getAllUsers,
  updatePassword,
  deleteUserAccount,
  getUserStatistics,
  contactService
} from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected User Routes
router.get('/', authMiddleware, getAllUsers);
router.put('/password', authMiddleware, updatePassword);
router.delete('/account', authMiddleware, deleteUserAccount);
router.get('/stats', authMiddleware, getUserStatistics);
router.post('/contact',contactService);

export default router;