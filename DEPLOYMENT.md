# 🚀 Deployment Guide - Recipe Sharing API

This guide provides step-by-step instructions to deploy your Recipe Sharing API to the cloud.

## 📋 Deployment Options

1. **Render.com** (Recommended - FREE)
2. **Heroku** (Paid dyno)
3. **Railway.app** (FREE tier available)
4. **Vercel** (Good for serverless, requires modifications)

---

## 🎯 Option 1: Deploy to Render.com (RECOMMENDED - FREE)

### Step 1: Prepare Your Code
```bash
# Make sure everything is committed
git status
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create Render Account
1. Visit https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 3: Create Web Service
1. Click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub repository
4. Fill in the following details:

| Field | Value |
|-------|-------|
| **Name** | recipe-sharing-api |
| **Region** | Choose nearest to you |
| **Branch** | main |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### Step 4: Set Environment Variables (Optional)
Click "Advanced" and add:
```
PORT=5000
NODE_ENV=production
```

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for build to complete (2-5 minutes)
3. You'll get a URL like: `https://recipe-sharing-api-xxx.onrender.com`

### Step 6: Test Your Deployment
```bash
# Get your live URL from Render dashboard
LIVE_URL=https://your-app-name.onrender.com

# Test root endpoint
curl ${LIVE_URL}/

# Test login
curl -X POST ${LIVE_URL}/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"password123"}'
```

---

## 🔄 Option 2: Deploy to Heroku

### Prerequisites
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku (opens browser)
heroku login
```

### Deployment Steps
```bash
# Navigate to project
cd path/to/recipe-sharing-api

# Create Heroku app
heroku create your-app-name

# Check Procfile exists (or create it)
echo "web: npm start" > Procfile

# Deploy
git push heroku main

# View live app
heroku open

# View logs
heroku logs --tail
```

### Get Your Heroku URL
```bash
heroku info
# Your URL will be shown as "Web URL"
```

---

## 🚇 Option 3: Deploy to Railway.app

### Step 1: Create Account
1. Visit https://railway.app
2. Sign up with GitHub

### Step 2: Deploy from GitHub
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Connect your repository
4. Railway auto-detects Node.js and deploys

### Step 3: Get Your URL
- Your live URL will be in the Railway dashboard
- Format: `https://your-project-name.railway.app`

---

## 🔒 Environment Variables for Production

If deploying to a real database (SQLite, PostgreSQL, MongoDB), update `server.js`:

```javascript
// Add environment configuration
const isDevelopment = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// For database connections
const DATABASE_URL = process.env.DATABASE_URL;
```

---

## ✅ Post-Deployment Checklist

- [ ] API responds to health check: `GET /health`
- [ ] User registration works: `POST /api/users/register`
- [ ] User login works: `POST /api/users/login`
- [ ] Can fetch recipes: `GET /api/recipes`
- [ ] Can create recipe (with auth): `POST /api/recipes`
- [ ] Authorization works (users can only modify own recipes)
- [ ] Error handling returns proper status codes

---

## 🧪 Test Your Live API

### Using PowerShell
```powershell
$url = "https://your-live-url.onrender.com"

# Test root
(Invoke-WebRequest -Uri "$url/" -Method Get).Content | ConvertFrom-Json | ConvertTo-Json

# Test login
$body = @{
    username = "john_doe"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "$url/api/users/login" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"

$response.Content | ConvertFrom-Json | ConvertTo-Json
```

### Using cURL
```bash
# Test root
curl https://your-live-url.onrender.com/

# Test login
curl -X POST https://your-live-url.onrender.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"password123"}'

# Get token and test recipe creation
TOKEN=$(curl -s -X POST https://your-live-url.onrender.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"password123"}' | jq -r '.token')

curl -X POST https://your-live-url.onrender.com/api/recipes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Recipe",
    "description": "A test",
    "ingredients": ["test"],
    "instructions": "Test instructions"
  }'
```

---

## 🐛 Troubleshooting Deployment

### Issue: Build fails
**Solution:**
- Check `npm install` runs without errors locally
- Ensure all dependencies are in `package.json`
- Check `package-lock.json` is committed

### Issue: App crashes after deploy
**Solution:**
- Check logs: `heroku logs --tail` or Render dashboard logs
- Ensure environment variables are set
- Check PORT is `process.env.PORT || 5000`

### Issue: 503 Service Unavailable
**Solution:**
- Wait a few minutes for app to fully start
- Check if free tier dyno is sleeping (upgrade or use Render)
- Verify all routes are correctly defined

### Issue: Token validation fails
**Solution:**
- Ensure `JWT_SECRET` is same in all environments
- Check token format: `Authorization: Bearer <TOKEN>`
- Verify token hasn't expired

---

## 📊 Monitoring Your Deployment

### Render.com Monitoring
- Dashboard shows real-time logs
- Automatic restarts on crashes
- Monitor resource usage

### Heroku Monitoring
```bash
heroku logs --tail
heroku ps
heroku stats
```

---

## 🔄 Continuous Deployment

Your deployment is now set to auto-deploy on every push to `main`:

```bash
# Make changes locally
git add .
git commit -m "New feature"
git push origin main

# Your cloud platform automatically:
# 1. Pulls latest code
# 2. Installs dependencies
# 3. Runs npm start
# 4. Updates your live URL
```

---

## 📈 Scaling (Future Upgrades)

When you need more power:

**Render.com:**
- Upgrade instance type
- Add paid dyno

**Heroku:**
- Upgrade dyno type
- Add more dynos

**Railway:**
- Increase CPU/RAM allocation

---

## 🎯 Next Steps

1. ✅ Deploy to production
2. ✅ Test all endpoints
3. ✅ Monitor logs for errors
4. ✅ Share your live URL: `https://your-api-url.com`
5. ✅ Record Loom video demonstrating API

---

## 📝 Your Submission Links

Add these to your assignment submission:

```
GitHub Repository: https://github.com/Saimani5454/recipe-sharing-api
Live API URL: https://your-live-url.onrender.com
Loom Video: https://loom.com/share/your-video-id
```

---

**Happy Deploying! 🚀**
