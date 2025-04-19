
import Chat from '../models/Chat.model.js';
import User from '../models/User.model.js';
/*import { ChatGroq } from '@langchain/groq';
//import { LLMChain } from 'langchain/chains';
import { PromptTemplate } from '@langchain/core/prompts';

const generateChatTitle = async (messages) => {
  if (!messages || messages.length === 0) return 'Untitled Chat';

  // Preprocess messages (e.g., selecting first few messages for context)
  const selectedMessages = messages.slice(0, 3).map((msg) => msg.content).join('\n');

  // Define the template for the prompt
  const promptTemplate = `Generate a concise, meaningful title for the following conversation:\n{messages}`;

  // Initialize the LangChain prompt
  const prompt = new PromptTemplate({
    template: promptTemplate,
    inputVariables: ['messages'],
  });

  // Initialize the ChatGroq model from langchain_groq
  const model = new ChatGroq({
    apiKey: "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", // Replace with your ChatGroq API key
    temperature: 0.7,
    maxTokens: 10,
  });

  

  try {
    // Execute the chain to generate the title
    const response = await chain.call({
      messages: selectedMessages,
    });

    // Extract the title from the response
    const title = response.text.trim();
    return title || 'Untitled Chat';
  } catch (error) {
    console.error('Error generating title with ChatGroq:', error);
    return 'Untitled Chat';
  }
};*/

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
    //console.log(chatId);
    const chat=await Chat.find({_id: chatId});
    //console.log(chat);

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

   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const chatTitle = generateChatTitle(messages);

    
    const totalMessages = messages.length;
    const lastMessageAt = messages[messages.length - 1].timestamp || Date.now();

    
    const newChat = new Chat({
      user: userId,
      messages: messages.map((msg) => ({
        content: msg.content,
        sender: msg.sender,
        timestamp: msg.timestamp || Date.now(),
        type:'text',
      })),
      title: chatTitle,
      metadata: {
        totalMessages,
        lastMessageAt,
      },
    });

    
    await newChat.save();

    res.status(201).json({ message: 'Chat saved successfully', chat: newChat });
  } catch (error) {
    console.error('Error saving chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export const getChats=async(req,res)=>
{
  try {
    const userId = req.params.id;
    //console.log(userId);

    const chats = await Chat.find({user: userId});
    //console.log(chats);

    if (!chats) {
      return res.status(404).json({ message: 'No chats found' });
    }

    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updatechat=async(req,res)=>
{
  const { chatId } = req.params;
  const { messages } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(chatId, { messages ,updatedAt: new Date() }, { new: true });
    res.status(200).json(updatedChat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update chat' });
  }
}



export const updatepinstatus = async (req, res) => {
  const { chatId } = req.params;  
  const { pinned } = req.body; 
  //console.log(chatId);
  
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId, 
      { pinned },  
      { new: true } 
    );
    
    if (!updatedChat) {
      return res.status(404).send({ success: false, message: "Chat not found" });
    }
    
    res.status(200).send({ success: true, pinned, updatedChat });
  } catch (error) {
    console.error("Error updating pin status:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};


export const updatestarstatus = async (req, res) => {
  const { chatId } = req.params;
  const { starred } = req.body;  
  //console.log(chatId);
  
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId, 
      { started: starred },  
      { new: true } 
    );
    
    if (!updatedChat) {
      return res.status(404).send({ success: false, message: "Chat not found" });
    }
    
    res.status(200).send({ success: true, starred, updatedChat });  
  } catch (error) {
    console.error("Error updating star status:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

