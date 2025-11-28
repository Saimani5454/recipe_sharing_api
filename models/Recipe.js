/**
 * Recipe Class - Represents a recipe in the sharing platform
 * Demonstrates OOP principles: Encapsulation, Data Validation, and CRUD operations
 */
class Recipe {
  constructor() {
    // Private data storage (encapsulation)
    this.recipes = [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta with creamy sauce",
        ingredients: ["pasta", "eggs", "bacon", "parmesan", "black pepper"],
        instructions: "Cook pasta, fry bacon, mix with eggs and cheese",
        createdBy: 1,
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2025-01-01")
      },
      {
        id: 2,
        title: "Chocolate Cake",
        description: "Decadent chocolate dessert",
        ingredients: ["flour", "chocolate", "eggs", "sugar", "butter"],
        instructions: "Mix ingredients, bake at 350°F for 30 minutes",
        createdBy: 2,
        createdAt: new Date("2025-01-02"),
        updatedAt: new Date("2025-01-02")
      }
    ];
    this.currentId = 3;
  }

  /**
   * Validates recipe data
   * @param {object} data - Recipe data to validate
   * @returns {object} - Validation result
   */
  validateRecipe(data) {
    if (!data.title || data.title.trim().length === 0) {
      return { valid: false, error: "Title is required" };
    }

    if (!data.ingredients || !Array.isArray(data.ingredients) || data.ingredients.length === 0) {
      return { valid: false, error: "At least one ingredient is required" };
    }

    if (!data.instructions || data.instructions.trim().length === 0) {
      return { valid: false, error: "Instructions are required" };
    }

    if (data.title.length > 100) {
      return { valid: false, error: "Title must be less than 100 characters" };
    }

    return { valid: true };
  }

  /**
   * Creates a new recipe (CREATE)
   * @param {object} data - Recipe data
   * @param {number} userId - User creating recipe
   * @returns {object} - Created recipe or error
   */
  create(data, userId) {
    // Validation
    const validation = this.validateRecipe(data);
    if (!validation.valid) {
      return { error: validation.error };
    }

    const newRecipe = {
      id: this.currentId++,
      title: data.title,
      description: data.description || "",
      ingredients: Array.isArray(data.ingredients) ? data.ingredients : [data.ingredients],
      instructions: data.instructions,
      createdBy: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.recipes.push(newRecipe);
    return newRecipe;
  }

  /**
   * Gets all recipes (READ)
   * @returns {array} - All recipes
   */
  getAll() {
    return this.recipes.map((r) => this.sanitizeRecipe(r));
  }

  /**
   * Gets recipe by ID (READ)
   * @param {number} id - Recipe ID
   * @returns {object} - Recipe or null
   */
  getById(id) {
    const recipe = this.recipes.find((r) => r.id === id);
    return recipe ? this.sanitizeRecipe(recipe) : null;
  }

  /**
   * Gets recipes created by specific user
   * @param {number} userId - User ID
   * @returns {array} - User's recipes
   */
  getByUserId(userId) {
    return this.recipes
      .filter((r) => r.createdBy === userId)
      .map((r) => this.sanitizeRecipe(r));
  }

  /**
   * Updates a recipe (UPDATE)
   * @param {number} id - Recipe ID
   * @param {object} updates - Fields to update
   * @param {number} userId - User making update
   * @returns {object} - Updated recipe or error
   */
  update(id, updates, userId) {
    const recipe = this.recipes.find((r) => r.id === id);
    if (!recipe) {
      return { error: "Recipe not found" };
    }

    // Authorization check
    if (recipe.createdBy !== userId) {
      return { error: "You can only update your own recipes" };
    }

    // Validation for updates
    const validation = this.validateRecipe({ ...recipe, ...updates });
    if (!validation.valid) {
      return { error: validation.error };
    }

    // Update allowed fields only (encapsulation)
    if (updates.title) recipe.title = updates.title;
    if (updates.description !== undefined) recipe.description = updates.description;
    if (updates.ingredients) recipe.ingredients = updates.ingredients;
    if (updates.instructions) recipe.instructions = updates.instructions;
    
    recipe.updatedAt = new Date();

    return this.sanitizeRecipe(recipe);
  }

  /**
   * Deletes a recipe (DELETE)
   * @param {number} id - Recipe ID
   * @param {number} userId - User making delete
   * @returns {object} - Result or error
   */
  delete(id, userId) {
    const index = this.recipes.findIndex((r) => r.id === id);
    if (index === -1) {
      return { error: "Recipe not found" };
    }

    const recipe = this.recipes[index];
    
    // Authorization check
    if (recipe.createdBy !== userId) {
      return { error: "You can only delete your own recipes" };
    }

    this.recipes.splice(index, 1);
    return { message: "Recipe deleted successfully" };
  }

  /**
   * Searches recipes by title or ingredients
   * @param {string} query - Search query
   * @returns {array} - Matching recipes
   */
  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.recipes
      .filter(
        (r) =>
          r.title.toLowerCase().includes(lowerQuery) ||
          r.ingredients.some((ing) => ing.toLowerCase().includes(lowerQuery))
      )
      .map((r) => this.sanitizeRecipe(r));
  }

  /**
   * Removes sensitive data from recipe object
   * @param {object} recipe - Recipe object
   * @returns {object} - Sanitized recipe
   */
  sanitizeRecipe(recipe) {
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      createdBy: recipe.createdBy,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    };
  }

  /**
   * Gets recipe count
   * @returns {number} - Total recipes
   */
  getCount() {
    return this.recipes.length;
  }
}

module.exports = new Recipe();
