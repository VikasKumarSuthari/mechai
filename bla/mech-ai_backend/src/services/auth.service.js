import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.js';

class AuthService {
  async register(userData) {
    const { username, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id);

    return {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token
    };
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user._id);

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    };
  }

  async resetPassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return { message: 'Password reset successful' };
  }
}

export default new AuthService();