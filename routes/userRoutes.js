const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * POST /api/users/register
 * Register a new user
 * Body: { username, email, password }
 */
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  const result = User.register(username, email, password);
  
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.status(201).json({
    message: "User registered successfully",
    user: result
  });
});

/**
 * POST /api/users/login
 * Login user and get JWT token
 * Body: { username, password }
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const result = User.login(username, password);
  
  if (result.error) {
    return res.status(401).json({ error: result.error });
  }

  res.json({
    message: "Login successful",
    token: result.token,
    user: result.user
  });
});

/**
 * GET /api/users/profile/:id
 * Get user profile (requires authentication)
 */
router.get("/profile/:id", auth, (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Users can only view their own profile (unless admin)
  if (userId !== req.userId) {
    return res.status(403).json({ error: "Unauthorized to view this profile" });
  }

  const user = User.getProfile(userId);
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    user
  });
});

/**
 * PUT /api/users/profile/:id
 * Update user profile (requires authentication)
 * Body: { username, email }
 */
router.put("/profile/:id", auth, (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Users can only update their own profile
  if (userId !== req.userId) {
    return res.status(403).json({ error: "Unauthorized to update this profile" });
  }

  const result = User.updateProfile(userId, req.body);
  
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.json({
    message: "Profile updated successfully",
    user: result
  });
});

/**
 * GET /api/users
 * Get all users (admin only) - requires authentication
 */
router.get("/", auth, (req, res) => {
  const users = User.getAllUsers();
  res.json({
    count: users.length,
    users
  });
});

module.exports = router;
