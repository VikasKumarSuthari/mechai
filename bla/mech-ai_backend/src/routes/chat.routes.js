import express from 'express';
import {
  createChat,
  addMessageToChat,
  getUserChats,
  getChatById,
  deleteChat,
  savechats,
} from '../controllers/chat.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected Chat Routes
router.post('/', authMiddleware, createChat);
router.post('/message', authMiddleware, addMessageToChat);
router.get('/', authMiddleware, getUserChats);
router.get('/:chatId', authMiddleware, getChatById);
router.delete('/:chatId', authMiddleware, deleteChat);
router.post("/savechat",authMiddleware,savechats);



export default router;