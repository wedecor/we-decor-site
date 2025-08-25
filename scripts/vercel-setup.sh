#!/usr/bin/env bash

# Vercel CLI Setup Script
# This script sets up Vercel environment variables, domains, and provides DNS guidance

set -e

# Constants
PROD_DOMAIN="www.wedecorevents.com"
APEX_DOMAIN="wedecorevents.com"
CANONICAL_URL="https://www.wedecorevents.com"
ENV_NAME="NEXT_PUBLIC_SITE_URL"

echo "🚀 Vercel CLI Setup for We Decor Website"
echo "=========================================="
echo

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed!"
    echo "Please install it first: npm i -g vercel"
    echo "Then run: vercel login"
    exit 1
fi

echo "✅ Vercel CLI is installed"
echo

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged into Vercel CLI!"
    echo "Please run: vercel login"
    exit 1
fi

echo "✅ Logged into Vercel CLI"
echo

echo "This script will:"
echo "1. Set environment variable: ${ENV_NAME}=${CANONICAL_URL}"
echo "2. Add domains: ${APEX_DOMAIN} and ${PROD_DOMAIN}"
echo "3. Provide DNS configuration guidance"
echo

read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Setup cancelled."
    exit 0
fi

echo
echo "🔧 Setting up environment variables..."

# Set environment variable for Production
echo "Setting ${ENV_NAME} for Production environment..."
echo "${CANONICAL_URL}" | vercel env add ${ENV_NAME} production

# Set environment variable for Preview
echo "Setting ${ENV_NAME} for Preview environment..."
echo "${CANONICAL_URL}" | vercel env add ${ENV_NAME} preview

echo "✅ Environment variables configured"
echo

echo "🌐 Adding domains to Vercel project..."

# Add apex domain
echo "Adding apex domain: ${APEX_DOMAIN}"
vercel domains add ${APEX_DOMAIN} || echo "Domain may already exist"

# Add www domain
echo "Adding www domain: ${PROD_DOMAIN}"
vercel domains add ${PROD_DOMAIN} || echo "Domain may already exist"

echo "✅ Domains added"
echo

echo "📋 DNS Configuration Required"
echo "============================"
echo

echo "Option 1: Using Vercel DNS (Recommended)"
echo "----------------------------------------"
echo "If you want to use Vercel's DNS service, run these commands:"
echo "# Add A record for apex domain"
echo "vercel dns add ${APEX_DOMAIN} A 76.76.21.21"
echo
echo "# Add CNAME record for www subdomain"
echo "vercel dns add ${APEX_DOMAIN} CNAME www cname.vercel-dns.com"
echo

echo "Option 2: Using Your Registrar's DNS"
echo "-----------------------------------"
echo "Add these records to your domain registrar's DNS settings:"
echo
echo "Record Type: A"
echo "Name: @ (or leave empty for apex)"
echo "Value: 76.76.21.21"
echo "TTL: 3600 (or default)"
echo
echo "Record Type: CNAME"
echo "Name: www"
echo "Value: cname.vercel-dns.com"
echo "TTL: 3600 (or default)"
echo

echo "🔍 Checking domain and certificate status..."
echo

echo "Domains:"
vercel domains ls

echo
echo "Certificates:"
vercel certs ls ${APEX_DOMAIN} || echo "No certificate found for ${APEX_DOMAIN}"
vercel certs ls ${PROD_DOMAIN} || echo "No certificate found for ${PROD_DOMAIN}"

echo
echo "✅ Vercel setup complete!"
echo
echo "Next steps:"
echo "1. Configure DNS records (see options above)"
echo "2. Wait for DNS propagation (can take up to 48 hours)"
echo "3. Run: npm run vercel:deploy"
echo "4. Run: npm run vercel:verify"
