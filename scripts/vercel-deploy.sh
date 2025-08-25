#!/usr/bin/env bash

# Vercel Deploy Script
# This script builds the project and deploys it to Vercel

set -e

echo "🚀 Deploying We Decor Website to Vercel"
echo "========================================"
echo

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed!"
    echo "Please install it first: npm i -g vercel"
    exit 1
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged into Vercel CLI!"
    echo "Please run: vercel login"
    exit 1
fi

echo "✅ Vercel CLI ready"
echo

echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo
echo "🚀 Deploying to Vercel..."
vercel --prod

echo
echo "✅ Deployment complete!"
echo
echo "Next steps:"
echo "1. Wait a few minutes for deployment to propagate"
echo "2. Run: npm run vercel:verify"
echo "3. Check your domain: https://www.wedecorevents.com"
