# Recipe Sharing API

A Node.js Express API for sharing and managing recipes with user authentication.

## Features

- User registration and login with JWT authentication
- CRUD operations for recipes
- Password hashing with bcryptjs
- In-memory data storage

## Installation

```bash
npm install
```

## Usage

Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get JWT token
- `GET /api/users/profile/:id` - Get user profile (requires token)

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe (requires token)
- `PUT /api/recipes/:id` - Update recipe (requires token)
- `DELETE /api/recipes/:id` - Delete recipe (requires token)

## Authentication

Include JWT token in the `Authorization` header:
```
Authorization: <your-jwt-token>
```

## Dependencies

- express - Web framework
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- cors - Cross-origin resource sharing

## Author

Created with Node.js and Express
