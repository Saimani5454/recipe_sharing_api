# 🚀 Quick Start Guide - Recipe Sharing API

## 📖 For Quick Reference

### Running the API Locally
```bash
cd recipe-sharing-api
npm install
npm start
# Server runs at http://localhost:5000
```

### Getting Started with the API

#### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "myuser",
    "email": "myuser@example.com",
    "password": "MyPassword123"
  }'
```

#### 2. Login to Get Token
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
# Response includes "token": "eyJhbGciOiJIUzI1NiIs..."
```

#### 3. Use Token for Protected Requests
```bash
TOKEN="your-token-from-login"

# Create a recipe
curl -X POST http://localhost:5000/api/recipes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Recipe",
    "description": "Delicious dish",
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": "Cook and enjoy"
  }'
```

#### 4. Get All Recipes
```bash
curl http://localhost:5000/api/recipes
```

#### 5. Search Recipes
```bash
curl "http://localhost:5000/api/recipes/search?q=pasta"
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Complete API documentation with examples |
| **OOP-CONCEPTS.md** | OOP principles explanation |
| **DEPLOYMENT.md** | How to deploy to cloud |
| **PROJECT-SUBMISSION.md** | Assignment submission details |
| **test-api.sh** | Automated testing script |

---

## 🔑 Sample Credentials

Use these to test the API:

```
User 1:
  Username: john_doe
  Password: password123
  Email: john@example.com

User 2:
  Username: jane_smith
  Password: password456
  Email: jane@example.com
```

---

## 📝 API Endpoints Summary

### Users
- `POST /api/users/register` - Create account
- `POST /api/users/login` - Get token
- `GET /api/users/profile/:id` - View profile
- `PUT /api/users/profile/:id` - Update profile
- `GET /api/users` - List all users

### Recipes
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Create recipe
- `GET /api/recipes/:id` - Get single recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `GET /api/recipes/search?q=query` - Search recipes
- `GET /api/recipes/user/:userId` - User's recipes

---

## 🏗️ Project Structure at a Glance

```
models/
  ├── User.js      ← User management with OOP
  └── Recipe.js    ← Recipe CRUD operations

routes/
  ├── userRoutes.js    ← User endpoints
  └── recipeRoutes.js  ← Recipe endpoints

middleware/
  └── auth.js      ← JWT authentication

server.js           ← Express setup
```

---

## ✨ Key OOP Concepts Used

1. **Encapsulation**: Data hidden inside classes
2. **Abstraction**: Complex logic simplified
3. **Single Responsibility**: Each class has one job
4. **Validation**: Data checked before processing
5. **Authorization**: Users can only access their data

---

## 🐛 Troubleshooting

### Port already in use?
```bash
# Use different port
PORT=3001 npm start
```

### Can't connect to API?
- Check if server is running: `npm start`
- Check port: `http://localhost:5000`
- Check firewall settings

### Token expired?
- Tokens expire in 24 hours
- Login again to get new token

### Authorization error?
- Include token in header: `Authorization: Bearer <TOKEN>`
- Make sure token is not expired
- Use correct user ID

---

## 📱 Using Postman

1. Create new collection "Recipe API"
2. Create requests for each endpoint
3. Set variables for `base_url` and `token`
4. Use pre-request scripts to set headers

Example Postman environment:
```json
{
  "variables": [
    {
      "key": "base_url",
      "value": "http://localhost:5000"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

---

## 🚀 Deploying to Production

### Quick Render.com Deploy
1. Visit https://render.com
2. Create account with GitHub
3. New Web Service
4. Select recipe-sharing-api repo
5. Set Start Command: `npm start`
6. Deploy!

See **DEPLOYMENT.md** for detailed instructions.

---

## 🎯 Next Steps

- [x] Code implemented
- [x] Documentation completed
- [x] GitHub repository pushed
- [ ] Deploy to production
- [ ] Record Loom video
- [ ] Submit assignment

---

## 💡 Tips

- **JWT Token**: Stores user ID, valid for 24 hours
- **Password**: Hashed with bcryptjs, never stored plain text
- **Recipes**: Each has creator ID, only creator can modify
- **Validation**: Happens on both front and backend
- **Errors**: Always include meaningful messages

---

## 📞 Need Help?

1. Read the **README.md** for full API docs
2. Check **OOP-CONCEPTS.md** for architecture
3. Follow **DEPLOYMENT.md** for cloud setup
4. Review **PROJECT-SUBMISSION.md** for assignment details

---

**Happy coding! 🍳**
