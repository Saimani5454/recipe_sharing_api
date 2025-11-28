const express = require("express");
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all recipes
router.get("/", (req, res) => {
  res.json(Recipe.getAll());
});

// Get recipe by ID
router.get("/:id", (req, res) => {
  const recipe = Recipe.getById(parseInt(req.params.id));
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.json(recipe);
});

// Create recipe
router.post("/", auth, (req, res) => {
  const recipe = Recipe.create(req.body);
  res.status(201).json({ message: "Recipe created", recipe });
});

// Update recipe
router.put("/:id", auth, (req, res) => {
  const recipe = Recipe.update(parseInt(req.params.id), req.body);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.json({ message: "Recipe updated", recipe });
});

// Delete recipe
router.delete("/:id", auth, (req, res) => {
  const deleted = Recipe.delete(parseInt(req.params.id));
  if (!deleted) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.json({ message: "Recipe deleted" });
});

module.exports = router;
