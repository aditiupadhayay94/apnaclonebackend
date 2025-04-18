import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

//register
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({ name, email, password, role }); // No manual hashing

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


  //login
  export const loginUser = async(req,res)=> {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  // get current user

export const getCurrentUser = async (req, res) => {
    try {
      // req.user is set by the protect middleware
      // We don't need to find the user again since the middleware already did that
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json(req.user);
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(500).json({ message: "Server error" });
    }
};