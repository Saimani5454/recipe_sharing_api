#!/bin/bash

# Recipe Sharing API - Testing Script
# This script tests all API endpoints with sample data

API_BASE="http://localhost:5000"

echo "🍳 Recipe Sharing API - Testing Script"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test 1: Get root endpoint
echo -e "${BLUE}Test 1: Get API Info${NC}"
curl -s "${API_BASE}/" | jq .
echo ""

# Test 2: Register new user
echo -e "${BLUE}Test 2: Register New User${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "${API_BASE}/api/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "testuser@example.com",
    "password": "TestPassword123"
  }')
echo $REGISTER_RESPONSE | jq .
echo ""

# Test 3: Login
echo -e "${BLUE}Test 3: Login User${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "${API_BASE}/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }')
echo $LOGIN_RESPONSE | jq .
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo "Token: $TOKEN"
echo ""

# Test 4: Get all recipes
echo -e "${BLUE}Test 4: Get All Recipes${NC}"
curl -s "${API_BASE}/api/recipes" | jq .
echo ""

# Test 5: Get single recipe
echo -e "${BLUE}Test 5: Get Single Recipe${NC}"
curl -s "${API_BASE}/api/recipes/1" | jq .
echo ""

# Test 6: Search recipes
echo -e "${BLUE}Test 6: Search Recipes${NC}"
curl -s "${API_BASE}/api/recipes/search?q=pasta" | jq .
echo ""

# Test 7: Create recipe (with auth)
echo -e "${BLUE}Test 7: Create Recipe (Authenticated)${NC}"
curl -s -X POST "${API_BASE}/api/recipes" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Pasta Dish",
    "description": "A delicious test pasta",
    "ingredients": ["pasta", "tomato", "garlic", "olive oil"],
    "instructions": "Cook pasta and add sauce"
  }' | jq .
echo ""

# Test 8: Get user profile
echo -e "${BLUE}Test 8: Get User Profile${NC}"
curl -s -H "Authorization: Bearer ${TOKEN}" \
  "${API_BASE}/api/users/profile/1" | jq .
echo ""

echo -e "${GREEN}✅ All tests completed!${NC}"
