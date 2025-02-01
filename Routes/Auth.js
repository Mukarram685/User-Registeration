

import express from "express";
const router = express.Router();
import User from "../Schema/UserSchema.js";
import jwt from "jsonwebtoken";

// Register User
router.get("/", (req, res) => {
    res.send('I am trying to signin or signup user');
})

router.post("/signup", async (req, res) => {
  const { firstName, lastName, gender, email, password, confirmPassword } = req.body;


  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ firstName, lastName, gender, email, password });

    // Respond with token
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login User
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Match passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Respond with token
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default router;