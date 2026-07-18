#!/bin/bash

# Usage: ./verify-preview.sh <PREVIEW_URL>
PREVIEW_URL="$1"

if [ -z "$PREVIEW_URL" ]; then
    echo "Usage: ./verify-preview.sh <PREVIEW_URL>"
    echo "Example: ./verify-preview.sh https://we-decor-site-git-fix-a11y-tests-csp-lhci-wedecor.vercel.app"
    exit 1
fi

echo "🔍 Verifying Preview: $PREVIEW_URL"
echo ""

# Headers check
echo "📋 Headers (first 30 lines):"
curl -sI "$PREVIEW_URL" | sed -n '1,30p'
echo ""

# Lighthouse CI against preview
echo "🚀 Running Lighthouse CI against preview..."
jq -r '.ci.collect.url |= ["'"$PREVIEW_URL"'", "'"$PREVIEW_URL"'/gallery", "'"$PREVIEW_URL"'/contact"]' .lighthouserc.json > .lighthouserc.tmp.json
npx @lhci/cli autorun --config=.lighthouserc.tmp.json || true
echo ""

# Playwright smoke tests
echo "🧪 Running Playwright smoke tests..."
npx playwright test || true
echo ""

echo "✅ Verification complete!"

