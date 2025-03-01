import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists!" });
    }
    const salt = 10;
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      name,
      email,
      password: hashPass
    });
    await newUser.save();
    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error in userRegister:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not exists!" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials!" });
    }
    const token = await jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );
    return res.json({
      success: true,
      message: "Login successful!",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Error in userLogin:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export { userLogin, userRegister };
