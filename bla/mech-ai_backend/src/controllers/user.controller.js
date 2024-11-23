import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .lean();

    res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating password', 
      error: error.message 
    });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    await User.findByIdAndDelete(userId);

    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting user account', 
      error: error.message 
    });
  }
};

export const getUserStatistics = async (req, res) => {
  try {
    const userId = req.user._id;

    const userStats = await User.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: 'chats',
          localField: '_id',
          foreignField: 'user',
          as: 'userChats'
        }
      },
      {
        $project: {
          totalChats: { $size: '$userChats' },
          totalMessages: { 
            $sum: { $map: { 
              input: '$userChats', 
              as: 'chat', 
              in: { $size: '$$chat.messages' } 
            }}
          },
          lastActive: { $max: '$userChats.createdAt' }
        }
      }
    ]);

    res.json(userStats[0] || {});
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user statistics', 
      error: error.message 
    });
  }
};