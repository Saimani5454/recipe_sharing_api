const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Register
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  
  const user = User.register(username, password);
  if (!user) {
    return res.status(400).json({ message: "User already exists" });
  }

  res.json({ message: "User registered successfully", user: { id: user.id, username: user.username } });
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  
  const token = User.login(username, password);
  if (!token) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", token });
});

// Get user profile
router.get("/profile/:id", auth, (req, res) => {
  const user = User.getProfile(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user: { id: user.id, username: user.username } });
});

module.exports = router;
