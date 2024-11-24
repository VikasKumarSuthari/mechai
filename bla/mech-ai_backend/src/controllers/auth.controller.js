import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    /*console.log(name);
    console.log(email);
    console.log(password);*/

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username:name }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email or username' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username:name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'Signup successful! Welcome to Mech AI.',
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: error.message 
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    /*console.log(email);
    console.log(password);*/

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      message:"login sucessful",
      _id: user._id,
      username: user.username,
      email_id: user.email,
      token,
      date:createdAt
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error during login', 
      error: error.message 
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    // Authenticated user's ID from middleware
    const {_id}=req.query;
    const user = await User.findById(_id).select('-password');
    /*console.log(_id);
    console.log(user);*/

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user profile', 
      error: error.message 
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { username ,_id} = req.body;
    /*console.log(username);
    console.log(_id);*/

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    // Update fields if provided
    if (username) user.username = username;

    await user.save();

    res.json({
      _id: user._id,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating profile', 
      error: error.message 
    });
  }
};