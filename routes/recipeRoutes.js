const express = require("express");
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * GET /api/recipes
 * Get all recipes
 */
router.get("/", (req, res) => {
  const recipes = Recipe.getAll();
  res.json({
    count: recipes.length,
    recipes
  });
});

/**
 * GET /api/recipes/search
 * Search recipes by title or ingredients
 * Query: { q: search_term }
 */
router.get("/search", (req, res) => {
  const query = req.query.q;
  
  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const results = Recipe.search(query);
  res.json({
    count: results.length,
    results
  });
});

/**
 * GET /api/recipes/:id
 * Get single recipe by ID
 */
router.get("/:id", (req, res) => {
  const recipe = Recipe.getById(parseInt(req.params.id));
  
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  res.json({ recipe });
});

/**
 * GET /api/recipes/user/:userId
 * Get all recipes created by a user
 */
router.get("/user/:userId", (req, res) => {
  const recipes = Recipe.getByUserId(parseInt(req.params.userId));
  res.json({
    count: recipes.length,
    recipes
  });
});

/**
 * POST /api/recipes
 * Create a new recipe (requires authentication)
 * Body: { title, description, ingredients, instructions }
 */
router.post("/", auth, (req, res) => {
  const result = Recipe.create(req.body, req.userId);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.status(201).json({
    message: "Recipe created successfully",
    recipe: result
  });
});

/**
 * PUT /api/recipes/:id
 * Update a recipe (requires authentication)
 * Body: { title, description, ingredients, instructions }
 */
router.put("/:id", auth, (req, res) => {
  const result = Recipe.update(parseInt(req.params.id), req.body, req.userId);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.json({
    message: "Recipe updated successfully",
    recipe: result
  });
});

/**
 * DELETE /api/recipes/:id
 * Delete a recipe (requires authentication)
 */
router.delete("/:id", auth, (req, res) => {
  const result = Recipe.delete(parseInt(req.params.id), req.userId);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.json({ message: result.message });
});

module.exports = router;
