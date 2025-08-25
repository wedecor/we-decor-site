#!/usr/bin/env bash

# Vercel Verify Script
# This script verifies the deployment by checking HTTP responses and redirects

set -e

echo "🔍 Verifying We Decor Website Deployment"
echo "========================================"
echo

# Constants
APEX_DOMAIN="wedecorevents.com"
PROD_DOMAIN="www.wedecorevents.com"

echo "Testing redirects and responses..."
echo

echo "— Apex domain should 301 → www"
echo "curl -IL https://${APEX_DOMAIN}/"
curl -IL "https://${APEX_DOMAIN}/" | sed -n '1,10p'
echo

echo "— WWW homepage should be 200"
echo "curl -IL https://${PROD_DOMAIN}/"
curl -IL "https://${PROD_DOMAIN}/" | sed -n '1,10p'
echo

echo "— Trailing slash normalization"
echo "curl -IL https://${PROD_DOMAIN}/about/"
curl -IL "https://${PROD_DOMAIN}/about/" | sed -n '1,10p'
echo

echo "curl -IL https://${PROD_DOMAIN}/about"
curl -IL "https://${PROD_DOMAIN}/about" | sed -n '1,10p'
echo

echo
echo "✅ Verification complete!"
echo

# Check if canonical homepage is 200 OK
echo "Checking homepage status..."
STATUS_LINE=$(curl -sIL "https://${PROD_DOMAIN}/" | head -n 1)

if [[ $STATUS_LINE == *"200"* ]]; then
    echo "✅ Homepage is accessible (200 OK)"
    exit 0
else
    echo "❌ Homepage is not accessible: $STATUS_LINE"
    echo "Please check the deployment and DNS configuration"
    exit 1
fi
