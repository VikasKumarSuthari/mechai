import Chat from '../models/Chat.model.js';
//import User from '../models/User.model.js';

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


export const Modelresponse=async (req,res)=>
{
  const {message}=req.body;
  const modelResponse = await axios.post('http://localhost:5001/model-endpoint', {
    message,
  });
  res.json({reply:modelResponse.data});
}