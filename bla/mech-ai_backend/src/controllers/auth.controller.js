import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'mathiangelina0@gmail.com',
      pass: 'jynxheyhigybbdkf'
    },
});


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
    const mailOptions = {
      from: "mathiangelina0@gmail.com",
      to: email, 
      subject: "Signup Successful - Welcome to MechAI",
      html: `
        <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f7f7;">
          <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #6a0dad; text-align: center;">Welcome to MechAI</h2>
            <p style="font-size: 16px; color: #333333;">
              Hi <strong>${name}</strong>,
            </p>
            <p style="font-size: 16px; color: #555555;">
              Thank you for signing up with MechAI! We are thrilled to have you onboard.
            </p>
            <p style="font-size: 16px; color: #555555;">
              If you have any questions, feel free to reply to this email or contact our support team.
            </p>
            <div style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #6a0dad; margin: 20px 0; border-radius: 5px;">
              <p style="font-size: 16px; color: #555555; margin: 0;">
                Happy exploring!
              </p>
            </div>
            <p style="font-size: 14px; color: #777777; text-align: center;">
              Regards,<br>
              The MechAI Team
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
      res.status(201).json({ msg: "User created successfully. Check your email for confirmation." });
    });
    


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
    //console.log(user);

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
      date:user.createdAt
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