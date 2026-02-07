#!/bin/bash
echo "Verifying Backend Endpoints..."

BASE_URL="http://localhost:5000/api"

echo "1. Getting Analytics Summary..."
curl -s "$BASE_URL/analytics/summary" 

echo -e "\n\n2. Creating a Supplier..."
curl -s -X POST "$BASE_URL/suppliers" \
  -H "Content-Type: application/json" \
  -d '{"name": "Verification Supplier", "email": "verify@check.com", "country": "Testland"}'

echo -e "\n\n3. Getting Products..."
curl -s "$BASE_URL/products?limit=1"
