import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodmailer.js";
import "dotenv/config";

//register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const exsitingUser = await userModel.findOne({ email });
    {
      if (exsitingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "user", // Default role is user
    });
    await newUser.save(); //STORE THE USER IN THE DATABASE

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });
    res.cookie("token", token, {
      // Set the cookie with the token
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // ✨ Role-based message
    let message =
      user.role === "admin" ? "Logged in as Admin" : "Login successful";

    res.status(200).json({ success: true, message, role: user.role }); // You can also send role
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Generate OTP and expiration time
    const otp = String(Math.floor(100000 + Math.random() * 900000).toString()); // 6-digit OTP
    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 15 * 60 * 1000; // 15 minutes expiration
    await user.save(); // Save the OTP and expiration time to the database
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Sender's email address
      to: user.email, // Recipient's email address
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It is valid for 15 minutes.`,
    };
    await transporter.sendMail(mailOptions); // Send the email using your email service
    return res.status(200).json({ message: "Password reset OTP sent" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Verify OTP and reset password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.resetOtp !== otp || user.resetOtp === "") {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.resetOtpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = ""; // Clear OTP after successful reset
    user.resetOtpExpires = 0; // Clear expiration time
    await user.save(); // Save the new password to the database
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
