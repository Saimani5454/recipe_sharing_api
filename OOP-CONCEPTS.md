# 🎓 OOP Concepts in Recipe Sharing API

This document explains the Object-Oriented Programming principles implemented in the Recipe Sharing API.

## Table of Contents
1. [Encapsulation](#encapsulation)
2. [Abstraction](#abstraction)
3. [Single Responsibility Principle](#single-responsibility-principle)
4. [Data Validation](#data-validation)
5. [Inheritance (Potential)](#inheritance-potential)
6. [Benefits](#benefits)

---

## 🔐 Encapsulation

**Definition:** Bundling data (properties) and methods (functions) that operate on that data within a single class, and hiding internal details from the outside world.

### Implementation in User Class

```javascript
class User {
  constructor() {
    // Private properties (encapsulated data)
    this.users = [];           // User data storage
    this.currentId = 1;        // ID counter
    this.JWT_SECRET = "secretkey";  // Secret key
  }

  // Public methods to interact with private data
  register(username, email, password) {
    // External code cannot directly access this.users
    // Must use this public method
    const validation = this.validateEmail(email);
    if (!validation) return { error: "Invalid email" };
    
    // Only if validation passes, data is modified
    const newUser = { id: this.currentId++, username, email };
    this.users.push(newUser);
    return newUser;
  }

  login(username, password) {
    // Cannot directly access passwords
    // Must go through login logic
  }
}
```

### Benefits of Encapsulation

1. **Data Protection**: Users cannot directly modify the users array
   ```javascript
   // ❌ NOT POSSIBLE - encapsulation prevents this
   user.users[0].password = "hacked";

   // ✅ ONLY POSSIBLE through controlled methods
   user.update(1, { password: "newPassword" });
   // which has validation and security checks
   ```

2. **Controlled Access**: All data changes go through methods with validation
   ```javascript
   // If someone tries to register with invalid email
   const result = User.register("john", "invalid-email", "pass");
   // Returns: { error: "Invalid email format" }
   // Email validation is enforced
   ```

3. **Implementation Freedom**: Internal structure can change without breaking external code
   ```javascript
   // If later we change from array to database:
   class User {
    constructor() {
      this.db = new Database(); // Changed internally
    }
    
    register(username, email, password) {
      // External code doesn't know it's now a database
      // Still works the same way
      return this.db.addUser({ username, email, password });
    }
  }
  // Routes still call User.register() - no changes needed!
   ```

---

## 🎯 Abstraction

**Definition:** Hiding complex implementation details and exposing only the necessary operations.

### Implementation in Recipe Class

```javascript
class Recipe {
  // Complex validation hidden inside the class
  validateRecipe(data) {
    if (!data.title || data.title.trim().length === 0) {
      return { valid: false, error: "Title is required" };
    }
    if (!data.ingredients || !Array.isArray(data.ingredients)) {
      return { valid: false, error: "Ingredients must be an array" };
    }
    return { valid: true };
  }

  create(data, userId) {
    // User doesn't need to know about validation complexity
    const validation = this.validateRecipe(data);
    if (!validation.valid) {
      return { error: validation.error };
    }
    // Complex recipe creation logic hidden
    const newRecipe = {
      id: this.currentId++,
      title: data.title,
      ingredients: data.ingredients,
      createdBy: userId,
      createdAt: new Date()
    };
    this.recipes.push(newRecipe);
    return newRecipe;
  }
}

// External code is simple and clean
const result = Recipe.create(data, userId);
if (result.error) {
  return res.status(400).json({ error: result.error });
}
res.status(201).json({ recipe: result });
```

### Benefits of Abstraction

1. **Simplified Interface**: Complex logic is hidden
   ```javascript
   // Simple to use
   const recipe = Recipe.create({ title: "Pasta", ingredients: [...] }, 1);

   // But internally handles:
   // - Validation
   // - ID generation
   // - Timestamp creation
   // - Data storage
   // - Error handling
   ```

2. **Easier Maintenance**: Change implementation without affecting users
   ```javascript
   // Before: Stored in array
   create(data) {
     this.recipes.push(...);
   }

   // After: Stored in database (implementation changed)
   create(data) {
     this.database.insert(...);
   }

   // External code: ZERO CHANGES NEEDED
   ```

---

## 📌 Single Responsibility Principle

**Definition:** Each class should have only one reason to change (only one responsibility).

### Separation of Concerns

```
┌─────────────────────────────────────┐
│         User Routes                 │ → Handles HTTP requests/responses
│  (POST /register, GET /profile)     │   for user operations
└─────────────────────────────────────┘
              ↓ calls
┌─────────────────────────────────────┐
│         User Class                  │ → Manages user data
│  (register, login, update)          │   and business logic
└─────────────────────────────────────┘
              ↓ uses
┌─────────────────────────────────────┐
│      Auth Middleware                │ → Verifies JWT tokens
│  (token validation)                 │   and attaches user info
└─────────────────────────────────────┘
```

### Each Class Has One Responsibility

**User Class:**
```javascript
class User {
  // ONLY responsible for user operations
  register() { ... }
  login() { ... }
  getProfile() { ... }
  updateProfile() { ... }
  validateEmail() { ... }
  validatePassword() { ... }
}
```

**Recipe Class:**
```javascript
class Recipe {
  // ONLY responsible for recipe operations
  create() { ... }
  getAll() { ... }
  getById() { ... }
  update() { ... }
  delete() { ... }
  validateRecipe() { ... }
}
```

**Auth Middleware:**
```javascript
function auth(req, res, next) {
  // ONLY responsible for authentication
  const verification = User.verifyToken(token);
  if (!verification.valid) {
    return res.status(401).json({ error: verification.error });
  }
  req.userId = verification.decoded.id;
  next();
}
```

### Benefits

1. **Easier Testing**: Test each component independently
   ```javascript
   // Test User class without routes
   const user = User.register("john", "john@example.com", "pass123");
   expect(user.id).toBeDefined();

   // Test Recipe class without database
   const recipe = Recipe.create({ title: "Pasta", ... }, 1);
   expect(recipe.title).toBe("Pasta");
   ```

2. **Code Reusability**: Use classes in different contexts
   ```javascript
   // Can use User class in:
   // - REST API
   // - GraphQL API
   // - CLI tool
   // - Mobile backend
   ```

3. **Easier Refactoring**: Changes are isolated
   ```javascript
   // Want to change how we validate emails?
   // Only changes needed in User.validateEmail()
   // No impact on Recipe, Auth, or Routes
   ```

---

## ✔️ Data Validation

**Definition:** Ensuring data meets required criteria before processing.

### Validation in User Class

```javascript
register(username, email, password) {
  // Validation 1: Required fields
  if (!username || !email || !password) {
    return { error: "All fields are required" };
  }

  // Validation 2: Email format
  if (!this.validateEmail(email)) {
    return { error: "Invalid email format" };
  }

  // Validation 3: Password strength
  const passwordCheck = this.validatePassword(password);
  if (!passwordCheck.valid) {
    return { error: passwordCheck.message };
  }

  // Validation 4: Uniqueness
  const exists = this.users.find(
    (u) => u.username === username || u.email === email
  );
  if (exists) {
    return { error: "Username or email already exists" };
  }

  // ✅ Only if all validations pass
  const newUser = { id: this.currentId++, username, email };
  this.users.push(newUser);
  return newUser;
}
```

### Validation in Recipe Class

```javascript
validateRecipe(data) {
  // Rule 1: Title is required and not empty
  if (!data.title || data.title.trim().length === 0) {
    return { valid: false, error: "Title is required" };
  }

  // Rule 2: Title length limit
  if (data.title.length > 100) {
    return { valid: false, error: "Title must be less than 100 characters" };
  }

  // Rule 3: Ingredients must be a non-empty array
  if (!data.ingredients || !Array.isArray(data.ingredients) || 
      data.ingredients.length === 0) {
    return { valid: false, error: "At least one ingredient is required" };
  }

  // Rule 4: Instructions must be provided
  if (!data.instructions || data.instructions.trim().length === 0) {
    return { valid: false, error: "Instructions are required" };
  }

  return { valid: true };
}
```

### Benefits

1. **Data Integrity**: Only valid data enters the system
   ```javascript
   // Invalid data is rejected
   const result = User.register("", "email@example.com", "pass");
   // Returns: { error: "All fields are required" }

   // Database is clean with only valid data
   ```

2. **Error Prevention**: Catch issues early
   ```javascript
   // Problem prevented before it becomes a bug
   User.register("john", "not-an-email", "pass");
   // Returns error instead of storing invalid email
   ```

3. **Better UX**: Users get specific error messages
   ```javascript
   // ✅ Good error message
   { error: "Password must be at least 6 characters" }

   // ❌ Vague error message
   { error: "Validation failed" }
   ```

---

## 👨‍👩‍👧 Inheritance (Potential)

While not fully implemented in this project, OOP inheritance could be extended:

```javascript
// Base class with common functionality
class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// User class inherits from Person
class User extends Person {
  constructor() {
    super("", "");
    this.users = [];
  }

  register(username, email, password) {
    // Inherits validateEmail from Person
    if (!this.validateEmail(email)) {
      return { error: "Invalid email" };
    }
    // ... rest of registration
  }
}

// Admin class could also inherit
class Admin extends Person {
  approveRecipes() { ... }
  removeUser() { ... }
}
```

**Benefits:**
- Code reuse (shared functionality in base class)
- Polymorphism (different classes behave differently)
- Hierarchical organization

---

## 🎁 Benefits Summary

| Concept | Benefit |
|---------|---------|
| **Encapsulation** | Data protection, controlled access, implementation flexibility |
| **Abstraction** | Simplified interface, easier maintenance, hiding complexity |
| **Single Responsibility** | Easier testing, code reusability, easier refactoring |
| **Validation** | Data integrity, error prevention, better user experience |

---

## 📊 Real-World Analogy

Think of a **Restaurant** with **OOP**:

```
┌─────────────────────────────────────────┐
│          Customer (External)            │
│     Calls: restaurant.orderFood()       │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│       Restaurant Class (Public API)     │
│  • orderFood()  → Returns food object   │
│  • payBill()    → Handles payment       │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│      Kitchen Class (Internal Logic)     │
│  • prepareFood() → Complex process      │
│  • validateIngredients() → Check stock  │
│  • (Hidden from customer)               │
└─────────────────────────────────────────┘

Encapsulation: Customer doesn't need to know
how food is prepared, only that they get it!

Abstraction: Customer doesn't see the complex
cooking process, just the end result!

SRP: Restaurant handles ordering, Kitchen
handles cooking (separate responsibilities)
```

---

## 🚀 How to Extend This

To add more OOP features:

### 1. Add an Admin Class
```javascript
class Admin extends User {
  deleteUser(userId) { ... }
  suspendUser(userId) { ... }
  viewAllRecipes() { ... }
}
```

### 2. Add a Review Class
```javascript
class Review {
  create(recipeId, userId, rating, comment) { ... }
  getByRecipe(recipeId) { ... }
  delete(reviewId) { ... }
}
```

### 3. Add a Rating Class
```javascript
class Rating {
  addRating(recipeId, userId, rating) { ... }
  getAverageRating(recipeId) { ... }
}
```

---

## 📚 Further Reading

- JavaScript Classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
- OOP Principles: https://www.geeksforgeeks.org/oops-concepts-java-4/
- SOLID Principles: https://en.wikipedia.org/wiki/SOLID

---

**Remember:** Good OOP makes code maintainable, testable, and scalable! 🎯
