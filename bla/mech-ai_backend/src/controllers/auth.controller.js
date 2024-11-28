import User from '../models/User.model.js';
import  {Otp}  from '../models/Otp.model.js';
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

    
    const existingUser = await User.findOne({
      $or: [{ email }, { username: name }],
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email or username" });
    }

   
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({
      email,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000,
      hashedPassword,
      name,

    });

    
    const mailOptions = {
      from: "mathiangelina0@gmail.com",
      to: email,
      subject: "Email Verification OTP - MechAI",
      html: `
        <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f7f7;">
          <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #6a0dad; text-align: center;">Verify Your Email</h2>
            <p style="font-size: 16px; color: #333333;">
              Hi <strong>${name}</strong>,
            </p>
            <p style="font-size: 16px; color: #555555;">
              Your OTP for email verification is:
              <strong style="font-size: 18px; color: #6a0dad;">${otp}</strong>
            </p>
            <p style="font-size: 16px; color: #555555;">
              Please enter this OTP within 5 minutes to complete your registration.
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
        console.error("Error sending OTP email:", error);
        return res.status(500).json({ message: "Error sending OTP email" });
      }
      console.log("OTP email sent: " + info.response);
      res.status(200).json({
        message: "OTP sent successfully. Please verify your email.",
        email,
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during OTP generation", error: error.message });
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


export const verifyotp=async(req,res)=>
{
  try {
    const { email, otp } = req.body;

    const storedOtp = await Otp.findOne({ email, otp });

    if (!storedOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (Date.now() > storedOtp.expiresAt) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    res.status(200).json({ message: "OTP verified successfully. Proceed with registration." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during OTP verification", error: error.message });
  }
}

export const completeRegistration = async (req, res) => {
  try {
    const {email} = req.body;
    console.log(email);
    const otpEntry = await Otp.findOne({ email });
    if (!otpEntry) {
      return res.status(404).json({ message: "OTP entry not found. Registration not completed." });
    }

    const { name, hashedPassword } = otpEntry;

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
          </div>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending confirmation email" });
      }
      console.log("Confirmation email sent: " + info.response);
    });
    

    const newUser = new User({
      username: name,
      email,
      password: hashedPassword, 
    });

    await newUser.save();
    await Otp.deleteOne({ email });

    res.status(201).json({message: "mail sent"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during registration", error: error.message });
  }
};
