import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "./../../config/config.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password, 
      role: role || "user", 
    });

    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, { expiresIn: "1h" });

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await user.authenticate(password);
    if (!isMatch) return res.status(401).json({ error: "Email and password don't match" });

    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, { expiresIn: "1h" });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// LOGOUT
export const logoutUser = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signed out successfully" });
};
