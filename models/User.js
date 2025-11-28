const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * User Class - Represents a user in the recipe sharing platform
 * Demonstrates OOP principles: Encapsulation, Data Abstraction, and Inheritance
 */
class User {
  constructor() {
    // Private data storage (encapsulation)
    this.users = [
      {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        password: bcrypt.hashSync("password123", 8),
        createdAt: new Date()
      },
      {
        id: 2,
        username: "jane_smith",
        email: "jane@example.com",
        password: bcrypt.hashSync("password456", 8),
        createdAt: new Date()
      }
    ];
    this.currentId = 3;
    this.JWT_SECRET = "secretkey";
  }

  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @returns {boolean} - True if valid email
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates password strength
   * @param {string} password - Password to validate
   * @returns {object} - Validation result with message
   */
  validatePassword(password) {
    if (password.length < 6) {
      return { valid: false, message: "Password must be at least 6 characters" };
    }
    return { valid: true };
  }

  /**
   * Registers a new user with validation
   * @param {string} username - Username
   * @param {string} email - Email
   * @param {string} password - Password
   * @returns {object} - Registered user or error
   */
  register(username, email, password) {
    // Validation
    if (!username || !email || !password) {
      return { error: "All fields are required" };
    }

    if (!this.validateEmail(email)) {
      return { error: "Invalid email format" };
    }

    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.valid) {
      return { error: passwordValidation.message };
    }

    // Check if user exists
    const exists = this.users.find(
      (u) => u.username === username || u.email === email
    );
    if (exists) {
      return { error: "Username or email already exists" };
    }

    // Create new user with encapsulated data
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = {
      id: this.currentId++,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    this.users.push(newUser);
    return this.sanitizeUser(newUser);
  }

  /**
   * Authenticates user and returns JWT token
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {object} - Token and user data or error
   */
  login(username, password) {
    if (!username || !password) {
      return { error: "Username and password are required" };
    }

    const user = this.users.find((u) => u.username === username);
    if (!user) {
      return { error: "Invalid credentials" };
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return { error: "Invalid credentials" };
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, this.JWT_SECRET, {
      expiresIn: "24h"
    });

    return {
      token,
      user: this.sanitizeUser(user)
    };
  }

  /**
   * Gets user profile by ID
   * @param {number} userId - User ID
   * @returns {object} - User data or null
   */
  getProfile(userId) {
    const user = this.users.find((u) => u.id === userId);
    return user ? this.sanitizeUser(user) : null;
  }

  /**
   * Updates user profile
   * @param {number} userId - User ID
   * @param {object} updates - Fields to update
   * @returns {object} - Updated user or error
   */
  updateProfile(userId, updates) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      return { error: "User not found" };
    }

    // Validate email if being updated
    if (updates.email && !this.validateEmail(updates.email)) {
      return { error: "Invalid email format" };
    }

    // Update allowed fields only (encapsulation)
    if (updates.username) user.username = updates.username;
    if (updates.email) user.email = updates.email;

    return this.sanitizeUser(user);
  }

  /**
   * Removes sensitive data from user object
   * @param {object} user - User object
   * @returns {object} - Sanitized user
   */
  sanitizeUser(user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    };
  }

  /**
   * Gets all users (admin function)
   * @returns {array} - All users without passwords
   */
  getAllUsers() {
    return this.users.map((u) => this.sanitizeUser(u));
  }

  /**
   * Verifies JWT token
   * @param {string} token - JWT token
   * @returns {object} - Decoded token or error
   */
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, error: "Invalid or expired token" };
    }
  }
}

module.exports = new User();
