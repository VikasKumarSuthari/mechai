import Chat from '../models/Chat.model.js';
import User from '../models/User.model.js';

class ChatService {
  async createChat(userId, message) {
    const newChat = new Chat({
      user: userId,
      messages: [{ 
        content: message, 
        sender: userId 
      }]
    });

    await newChat.save();
    return newChat;
  }

  async addMessageToChat(chatId, userId, message) {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error('Chat not found');
    }

    chat.messages.push({
      content: message,
      sender: userId
    });

    await chat.save();
    return chat;
  }

  async getUserChats(userId) {
    return await Chat.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user', 'username email');
  }

  async getChatById(chatId, userId) {
    const chat = await Chat.findOne({ 
      _id: chatId, 
      user: userId 
    }).populate('user', 'username email');

    if (!chat) {
      throw new Error('Chat not found');
    }

    return chat;
  }

  async deleteChat(chatId, userId) {
    const chat = await Chat.findOneAndDelete({ 
      _id: chatId, 
      user: userId 
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    return { message: 'Chat deleted successfully' };
  }

  async getUserChatStatistics(userId) {
    const stats = await Chat.aggregate([
      { $match: { user: userId } },
      {
        $project: {
          totalMessages: { $size: '$messages' },
          lastChatDate: '$createdAt'
        }
      },
      {
        $group: {
          _id: null,
          totalChats: { $sum: 1 },
          totalMessages: { $sum: '$totalMessages' },
          latestChatDate: { $max: '$lastChatDate' }
        }
      }
    ]);

    return stats[0] || {};
  }
}

export default new ChatService();