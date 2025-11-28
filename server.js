const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

console.log("🚀 Starting Recipe Sharing API server...");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🍳 Recipe Sharing API is running",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      recipes: "/api/recipes"
    }
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
}).on("error", (err) => {
  console.error("❌ Server error:", err);
  process.exit(1);
});
