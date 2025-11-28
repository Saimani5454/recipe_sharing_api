const express = require("express");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

console.log("Starting server...");

const app = express();
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Recipe Sharing API is running" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});
