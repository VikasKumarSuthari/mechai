import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';




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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'mathiangelina0@gmail.com',
      pass: 'jynxheyhigybbdkf'
    },
});


export const contactService=async(req,res)=>
{
  const { name, email, subject, message } = req.body;
  const mailOptions = {
    from: email,
    to: "mathiangelina0@gmail.com",
    subject: subject,
    html:  `
    <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f7f7;">
      <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #6a0dad; text-align: center;">New Contact Form Submission</h2>
        <p style="font-size: 16px; color: #333333;">
          Hello, you have received a new message from <strong>${name}</strong>.
        </p>
        <div style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #6a0dad; margin: 20px 0; border-radius: 5px;">
          <p style="font-size: 16px; color: #555555;"><strong>Message:</strong></p>
          <p style="font-size: 16px; color: #333333; margin: 0;">${message}</p>
        </div>
        <p style="font-size: 14px; color: #777777; text-align: center;">
          This message was sent by: ${email}
        </p>
      </div>
      <footer style="text-align: center; margin-top: 20px; padding: 10px; font-size: 12px; color: #888888;">
        &copy; ${new Date().getFullYear()} MechAI. All rights reserved.
      </footer>
    </div>
    `,
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ msg: "Error sending confirmation email" });
    }
    console.log('Email sent: ' + info.response);
    res.status(201).json({ msg: "User created successfully. Check your email to confirm." });
});

}