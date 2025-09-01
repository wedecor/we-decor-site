#!/bin/bash

SITE_URL="https://www.wedecorevents.com"
DATE=$(date +"%Y-%m-%d")

echo "🔍 We Decor Live Verification - ${DATE}"
echo "=========================================="

# Check homepage
echo "📋 Checking homepage..."
curl -s -o /dev/null -w "Status: %{http_code}\n" "${SITE_URL}/"

# Check domain canonicalization
echo "🌐 Checking domain canonicalization..."
if curl -s "${SITE_URL}/" | grep -q "wedecorevents.com"; then
    echo "✅ Domain: PASS"
else
    echo "❌ Domain: FAIL"
fi

# Check WhatsApp links
echo "📱 Checking WhatsApp links..."
if curl -s "${SITE_URL}/" | grep -q "wa.me/919880544452"; then
    echo "✅ WhatsApp: PASS"
else
    echo "❌ WhatsApp: FAIL"
fi

# Check phone numbers
echo "📞 Checking phone numbers..."
if curl -s "${SITE_URL}/" | grep -q "+91 88805 44452" && curl -s "${SITE_URL}/" | grep -q "+91 95912 32166"; then
    echo "✅ Phone Numbers: PASS"
else
    echo "❌ Phone Numbers: FAIL"
fi

# Check robots.txt and sitemap
echo "🤖 Checking robots.txt..."
curl -s -o /dev/null -w "Status: %{http_code}\n" "${SITE_URL}/robots.txt"

echo "🗺️  Checking sitemap..."
curl -s -o /dev/null -w "Status: %{http_code}\n" "${SITE_URL}/sitemap.xml"

echo "🎉 Verification completed!" 