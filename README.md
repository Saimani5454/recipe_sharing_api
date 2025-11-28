# 🍳 Recipe Sharing API

A robust RESTful API for a recipe sharing platform built with **Node.js**, **Express.js**, and featuring **Object-Oriented Programming (OOP)** principles. This API enables users to register, authenticate, and perform CRUD operations on recipes with secure JWT-based authentication.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [OOP Concepts Used](#oop-concepts-used)
- [Code Examples](#code-examples)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Video Documentation](#video-documentation)

## ✨ Features

- ✅ **User Management**
  - User registration with validation (email format, password strength)
  - Secure login with JWT token generation
  - Profile management (view, update)
  - Password hashing with bcryptjs

- ✅ **Recipe Management**
  - Full CRUD operations on recipes
  - Recipe search by title or ingredients
  - User-specific recipe filtering
  - Validation for recipe data
  - Timestamps for creation and updates

- ✅ **Security**
  - JWT token-based authentication
  - Authorization checks (users can only modify their own recipes)
  - Password validation and encryption
  - Protected endpoints

- ✅ **API Standards**
  - RESTful endpoints
  - Consistent JSON responses
  - Comprehensive error messages
  - CORS support

## 🛠️ Tech Stack

- **Runtime**: Node.js v14+
- **Framework**: Express.js v5.x
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **CORS**: cors
- **Data Storage**: In-memory (easily upgradeable to SQLite/MongoDB)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Saimani5454/recipe-sharing-api.git
cd recipe-sharing-api

# Install dependencies
npm install

# Start the server
npm start
```

The server will run on `http://localhost:5000`

## 🔌 API Endpoints

### User Endpoints

#### 1. Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 3,
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

**Error (400):**
```json
{
  "error": "Username or email already exists"
}
```

---

#### 2. Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 3,
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

#### 3. Get User Profile
```http
GET /api/users/profile/1
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

#### 4. Update User Profile
```http
PUT /api/users/profile/1
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "username": "john_updated",
  "email": "newemail@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "username": "john_updated",
    "email": "newemail@example.com",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

#### 5. Get All Users
```http
GET /api/users
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "count": 2,
  "users": [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

---

### Recipe Endpoints

#### 1. Get All Recipes
```http
GET /api/recipes
```

**Response (200 OK):**
```json
{
  "count": 2,
  "recipes": [
    {
      "id": 1,
      "title": "Spaghetti Carbonara",
      "description": "Classic Italian pasta with creamy sauce",
      "ingredients": ["pasta", "eggs", "bacon", "parmesan", "black pepper"],
      "instructions": "Cook pasta, fry bacon, mix with eggs and cheese",
      "createdBy": 1,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

---

#### 2. Get Single Recipe
```http
GET /api/recipes/1
```

**Response (200 OK):**
```json
{
  "recipe": {
    "id": 1,
    "title": "Spaghetti Carbonara",
    "description": "Classic Italian pasta with creamy sauce",
    "ingredients": ["pasta", "eggs", "bacon", "parmesan", "black pepper"],
    "instructions": "Cook pasta, fry bacon, mix with eggs and cheese",
    "createdBy": 1,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
}
```

---

#### 3. Search Recipes
```http
GET /api/recipes/search?q=pasta
```

**Response (200 OK):**
```json
{
  "count": 1,
  "results": [
    {
      "id": 1,
      "title": "Spaghetti Carbonara",
      "description": "Classic Italian pasta with creamy sauce",
      "ingredients": ["pasta", "eggs", "bacon", "parmesan", "black pepper"],
      "instructions": "Cook pasta, fry bacon, mix with eggs and cheese",
      "createdBy": 1,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

---

#### 4. Get User's Recipes
```http
GET /api/recipes/user/1
```

**Response (200 OK):**
```json
{
  "count": 1,
  "recipes": [
    {
      "id": 1,
      "title": "Spaghetti Carbonara",
      "description": "Classic Italian pasta with creamy sauce",
      "ingredients": ["pasta", "eggs", "bacon", "parmesan", "black pepper"],
      "instructions": "Cook pasta, fry bacon, mix with eggs and cheese",
      "createdBy": 1,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

---

#### 5. Create Recipe
```http
POST /api/recipes
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Homemade Pizza",
  "description": "Delicious homemade pizza",
  "ingredients": ["flour", "tomato sauce", "cheese", "basil"],
  "instructions": "Prepare dough, add toppings, bake at 450°F for 15 minutes"
}
```

**Response (201 Created):**
```json
{
  "message": "Recipe created successfully",
  "recipe": {
    "id": 3,
    "title": "Homemade Pizza",
    "description": "Delicious homemade pizza",
    "ingredients": ["flour", "tomato sauce", "cheese", "basil"],
    "instructions": "Prepare dough, add toppings, bake at 450°F for 15 minutes",
    "createdBy": 1,
    "createdAt": "2025-01-16T14:22:00Z",
    "updatedAt": "2025-01-16T14:22:00Z"
  }
}
```

---

#### 6. Update Recipe
```http
PUT /api/recipes/3
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Italian Homemade Pizza",
  "description": "Authentic Italian pizza recipe"
}
```

**Response (200 OK):**
```json
{
  "message": "Recipe updated successfully",
  "recipe": {
    "id": 3,
    "title": "Italian Homemade Pizza",
    "description": "Authentic Italian pizza recipe",
    "ingredients": ["flour", "tomato sauce", "cheese", "basil"],
    "instructions": "Prepare dough, add toppings, bake at 450°F for 15 minutes",
    "createdBy": 1,
    "createdAt": "2025-01-16T14:22:00Z",
    "updatedAt": "2025-01-16T14:35:00Z"
  }
}
```

---

#### 7. Delete Recipe
```http
DELETE /api/recipes/3
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "message": "Recipe deleted successfully"
}
```

---

## 🏗️ OOP Concepts Used

### 1. **Encapsulation**
- **Definition**: Bundling data and methods that operate on that data within a single unit (class)
- **Implementation in User Class**:
  ```javascript
  class User {
    constructor() {
      // Private data storage
      this.users = [];
      this.currentId = 1;
      this.JWT_SECRET = "secretkey";
    }
    
    // Public methods to interact with private data
    register(username, email, password) { ... }
    login(username, password) { ... }
    getProfile(userId) { ... }
  }
  ```
- **Benefit**: Data is protected and can only be accessed/modified through defined methods

### 2. **Data Abstraction**
- **Definition**: Hiding complex implementation details and exposing only necessary information
- **Implementation in Recipe Class**:
  ```javascript
  // User doesn't need to know internal validation logic
  const result = Recipe.create(data, userId);
  if (result.error) {
    // Handle error
  }
  ```
- **Benefit**: Simplifies API usage and allows internal changes without affecting external code

### 3. **Validation & Error Handling**
- **Implementation**:
  ```javascript
  validateEmail(email) { ... }
  validatePassword(password) { ... }
  validateRecipe(data) { ... }
  ```
- **Benefit**: Ensures data integrity and provides meaningful error messages

### 4. **Single Responsibility Principle**
- **User Class**: Handles user-related operations (register, login, profile)
- **Recipe Class**: Handles recipe-related operations (CRUD)
- **Middleware**: Handles authentication
- **Routes**: Handle HTTP request/response

### 5. **Authorization & Security**
- **Implementation**:
  ```javascript
  update(id, updates, userId) {
    // Verify user ownership
    if (recipe.createdBy !== userId) {
      return { error: "You can only update your own recipes" };
    }
    // Process update
  }
  ```
- **Benefit**: Users can only modify their own data

## 💻 Code Examples

### Example 1: Register and Login Flow
```javascript
// Step 1: Register
POST /api/users/register
{
  "username": "chef_john",
  "email": "chef@example.com",
  "password": "MySecurePassword123"
}

// Response:
{
  "message": "User registered successfully",
  "user": {
    "id": 3,
    "username": "chef_john",
    "email": "chef@example.com"
  }
}

// Step 2: Login
POST /api/users/login
{
  "username": "chef_john",
  "password": "MySecurePassword123"
}

// Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Step 3: Use token for protected routes
GET /api/recipes
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example 2: Create and Update Recipe
```javascript
// Step 1: Create Recipe
POST /api/recipes
Authorization: Bearer <TOKEN>
{
  "title": "Classic Risotto",
  "description": "Creamy Italian rice dish",
  "ingredients": ["rice", "broth", "white wine", "parmesan"],
  "instructions": "Toast rice, add broth gradually while stirring..."
}

// Step 2: Update Recipe
PUT /api/recipes/1
Authorization: Bearer <TOKEN>
{
  "title": "Classic Risotto Milanese",
  "ingredients": ["rice", "broth", "white wine", "saffron", "parmesan"]
}

// Step 3: Delete Recipe
DELETE /api/recipes/1
Authorization: Bearer <TOKEN>
```

## ❌ Error Handling

The API implements comprehensive error handling:

```json
// 400 Bad Request - Validation Error
{
  "error": "Title is required"
}

// 401 Unauthorized - Invalid Token
{
  "error": "Invalid or expired token"
}

// 403 Forbidden - Authorization Error
{
  "error": "You can only update your own recipes"
}

// 404 Not Found
{
  "error": "Recipe not found"
}

// 500 Internal Server Error
{
  "error": "Internal server error"
}
```

## 🚀 Deployment

### Deploy to Render.com (FREE)

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Create Render Account**
   - Visit https://render.com
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Set Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables if needed

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Get your live URL

### Deploy to Heroku (with paid dyno)

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

## 📹 Video Documentation

A Loom video explaining:
- Project overview and objectives
- OOP concepts used in the codebase
- Walkthrough of User and Recipe classes
- API endpoint demonstrations
- Deployment process

[Link to Loom Video]: (Add your video link here)

## 📁 Project Structure

```
recipe-sharing-api/
├── models/
│   ├── User.js          # User class with OOP principles
│   └── Recipe.js        # Recipe class with CRUD operations
├── routes/
│   ├── userRoutes.js    # User endpoints
│   └── recipeRoutes.js  # Recipe endpoints
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── server.js            # Express server setup
├── package.json         # Dependencies
└── README.md           # This file
```

## 📝 Sample Data

The API comes with pre-populated sample data:

**Users:**
- john_doe / password123
- jane_smith / password456

**Recipes:**
- Spaghetti Carbonara (by john_doe)
- Chocolate Cake (by jane_smith)

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Authorization checks for protected resources
- ✅ Input validation
- ✅ CORS enabled
- ✅ Error messages don't expose sensitive info

## 📚 Dependencies

```json
{
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.5"
}
```

## 🎓 Learning Outcomes

By studying this project, you'll learn:
- ✅ Object-Oriented Programming in JavaScript
- ✅ RESTful API design principles
- ✅ JWT authentication implementation
- ✅ Data validation and error handling
- ✅ Express.js middleware usage
- ✅ Authorization patterns
- ✅ Encapsulation and data protection

## 📞 Support

For issues or questions:
- Check existing GitHub issues
- Review API documentation above
- Watch the Loom video tutorial

## 📄 License

This project is open source and available under the ISC License.

## 👨‍💻 Author

Created as a demonstration of Node.js, Express.js, and OOP principles in action.

---

**Happy Cooking! 🍽️**

