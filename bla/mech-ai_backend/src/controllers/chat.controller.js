import Chat from '../models/Chat.model.js';
import User from '../models/User.model.js';


export const createChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    const newChat = new Chat({
      user: userId,
      messages: [{ 
        content: message, 
        sender: userId 
      }]
    });

    await newChat.save();

    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating chat', 
      error: error.message 
    });
  }
};

export const addMessageToChat = async (req, res) => {
  try {
    const { chatId, message } = req.body;
    const userId = req.user._id;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.messages.push({
      content: message,
      sender: userId
    });

    await chat.save();

    res.json(chat);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error adding message', 
      error: error.message 
    });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user', 'username email');

    res.json(chats);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching chats', 
      error: error.message 
    });
  }
};

export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.findOne({ 
      _id: chatId, 
      user: userId 
    }).populate('user', 'username email');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching chat', 
      error: error.message 
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.findOneAndDelete({ 
      _id: chatId, 
      user: userId 
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting chat', 
      error: error.message 
    });
  }
};

const generateChatTitle = (messages) => {
  if (!messages || messages.length === 0) return 'Untitled Chat';
  
  // Generate a title based on the first message
  const firstMessage = messages[0].content;
  const title = firstMessage.split(' ').slice(0, 5).join(' '); // First 5 words
  return title || 'Untitled Chat';
};


export const savechats=async(req,res)=>
{
  try {
    const { messages, userId } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate chat title
    const chatTitle = generateChatTitle(messages);

    // Calculate metadata
    const totalMessages = messages.length;
    const lastMessageAt = messages[messages.length - 1].timestamp || Date.now();

    // Create a new Chat document
    const newChat = new Chat({
      user: userId,
      messages: messages.map((msg) => ({
        content: msg.content,
        sender: msg.type,
        timestamp: msg.timestamp || Date.now(),
        type:'text',
      })),
      title: chatTitle,
      metadata: {
        totalMessages,
        lastMessageAt,
      },
    });

    // Save chat to the database
    await newChat.save();

    res.status(201).json({ message: 'Chat saved successfully', chat: newChat });
  } catch (error) {
    console.error('Error saving chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


