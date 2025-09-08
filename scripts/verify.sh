#!/usr/bin/env bash

# Production Readiness Verification Script
# Orchestrates all checks, sets environment, calls subtasks, writes markdown report
# Usage: ./scripts/verify.sh [--ci] [--skip-build]

set -Eeuo pipefail

# Configuration
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ART="$ROOT/artifacts"
PORT="${PORT:-3001}"
BASE="http://localhost:$PORT"
SITE_URL="${NEXT_PUBLIC_SITE_URL:-}"
CI_MODE=false
SKIP_BUILD=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --ci)
      CI_MODE=true
      shift
      ;;
    --skip-build)
      SKIP_BUILD=true
      shift
      ;;
    *)
      echo "Unknown option $1"
      exit 1
      ;;
  esac
done

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Initialize artifacts directory
init_artifacts() {
  log_info "Initializing artifacts directory..."
  mkdir -p "$ART"
  echo "## Production Readiness Run ($(date -Is))" > "$ART/production_readiness_report.md"
}

# Start production server
start_server() {
  if [ "$SKIP_BUILD" = true ]; then
    log_info "Skipping build and server start"
    return 0
  fi

  log_info "Starting production server on port $PORT..."
  
  # Kill any existing server on the port
  pkill -f "next start -p $PORT" || true
  
  # Start server in background
  cd "$ROOT"
  export NEXT_PUBLIC_SITE_URL="$BASE"
  (next start -p "$PORT" & echo $! > "$ART/.server.pid")
  
  # Wait for server to be ready
  log_info "Waiting for server to be ready..."
  for i in {1..30}; do
    if curl -s "$BASE" >/dev/null 2>&1; then
      log_success "Server is ready!"
      return 0
    fi
    sleep 2
  done

  log_error "Server failed to start within 60 seconds"
  return 1
}

# Stop production server
stop_server() {
  if [ -f "$ART/.server.pid" ]; then
    local pid=$(cat "$ART/.server.pid")
    if kill -0 "$pid" 2>/dev/null; then
      log_info "Stopping production server (PID: $pid)..."
      kill -TERM "$pid" 2>/dev/null || true
      sleep 3
      kill -KILL "$pid" 2>/dev/null || true
    fi
    rm -f "$ART/.server.pid"
  fi
}

# Run a check and capture results
run_check() {
  local name="$1"
  local command="$2"
  local threshold="$3"  # "hard" or "soft"
  
  log_info "Running check: $name"
  
  if eval "$command" > "$ART/${name// /_}.log" 2>&1; then
    log_success "$name: PASSED"
    echo "✅ $name" >> "$ART/production_readiness_report.md"
    return 0
  else
    local status="FAILED"
    if [ "$threshold" = "soft" ]; then
      status="WARNING"
      log_warning "$name: $status"
      echo "⚠️ $name" >> "$ART/production_readiness_report.md"
    else
      log_error "$name: $status"
      echo "❌ $name" >> "$ART/production_readiness_report.md"
      return 1
    fi
  fi
}

# Generate report header
generate_report_header() {
  cat > "$ART/production_readiness_report.md" << EOF
# Production Readiness Report

**Generated:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")  
**Environment:** ${CI_MODE:+CI}${CI_MODE:-Local}  
**Node Version:** $(node --version)  
**NPM Version:** $(npm --version)  

## Summary

This report contains the results of comprehensive production readiness checks.

## Check Results

EOF
}

# Generate report footer
generate_report_footer() {
  local exit_code=$1
  
  cat >> "$ART/production_readiness_report.md" << EOF

## Artifacts

- Server logs: [server.log](server.log)
- Bundle analysis: [bundle_analysis.json](bundle_analysis.json)
- Lighthouse reports: [lighthouse-desktop.html](lighthouse-desktop.html), [lighthouse-mobile.html](lighthouse-mobile.html)
- Accessibility report: [axe_results.json](axe_results.json)
- Security headers: [headers_verification.json](headers_verification.json)
- License audit: [license_audit.json](license_audit.json)
- Secrets scan: [secrets_scan.json](secrets_scan.json)

## Thresholds

- **Hard Thresholds:** Must pass for production deployment
- **Soft Thresholds:** Warnings that should be addressed

## Next Steps

$(if [ $exit_code -eq 0 ]; then
  echo "✅ All checks passed! Ready for production deployment."
else
  echo "❌ Some checks failed. Please address the issues above before deploying."
fi)

EOF
}

# Fail function for hard errors
fail() { 
  echo "::error::$1" 
  echo "- ❌ $1" >> "$ART/production_readiness_report.md" 
  exit 1 
}

# Run function for ordered checks
run() { 
  echo "#### $1" >> "$ART/production_readiness_report.md" 
  shift 
  "$@" && echo "- ✅ PASS" >> "$ART/production_readiness_report.md" || { 
    echo "- ❌ FAIL" >> "$ART/production_readiness_report.md" 
    exit 1 
  } 
}

# Main execution
main() {
  log_info "Starting production readiness verification..."
  
  # Environment guard
  [[ -n "$SITE_URL" ]] || fail "NEXT_PUBLIC_SITE_URL is not set."
  
  # Initialize
  init_artifacts
  
  # Track overall status
  local overall_status=0
  
  # Clean & build
  export NEXT_TELEMETRY_DISABLED=1
  echo "### Build" >> "$ART/production_readiness_report.md"
  npm run build:prod || fail "next build failed"
  
  # Start server
  echo "### Start server on $BASE" >> "$ART/production_readiness_report.md"
  start_server || fail "server start failed"
  trap 'kill $(cat "$ART/.server.pid") >/dev/null 2>&1 || true' EXIT ERR
  
  # Ordered checks
  run "Typecheck" npm run typecheck
  run "Lint" npm run lint
  run "Unit tests" npm run test:unit
  run "E2E (Playwright)" npm run test
  run "Security headers" npm run verify:headers
  run "Accessibility (axe serious/critical)" npm run verify:a11y
  run "Bundle budgets" npm run verify:bundle
  run "Lighthouse" npm run verify:lighthouse
  run "Licenses" npm run verify:licenses
  run "Secrets scan" npm run verify:secrets
  
  echo "### ✅ All hard gates passed" >> "$ART/production_readiness_report.md"
  
  # Generate comprehensive report with artifact links
  generate_comprehensive_report
  
  log_info "Production readiness verification complete!"
  log_info "Report saved to: $ART/production_readiness_report.md"
  log_success "All checks passed! Ready for production."
}

# Generate comprehensive report with artifact links
generate_comprehensive_report() {
  cat >> "$ART/production_readiness_report.md" << EOF

## 📊 Artifacts & Reports

### Generated Artifacts
- [Bundle Analysis](bundle_analysis.json) - Detailed bundle size analysis
- [Bundle Analysis (Markdown)](bundle_analysis.md) - Bundle size summary table
- [Lighthouse Desktop](lh-desktop/report.html) - Desktop performance report
- [Lighthouse Mobile](lh-mobile/report.html) - Mobile performance report
- [Lighthouse Desktop (JSON)](lh-desktop/report.json) - Desktop performance data
- [Lighthouse Mobile (JSON)](lh-mobile/report.json) - Mobile performance data
- [Accessibility Results](axe_results.json) - Accessibility test results
- [Security Headers](headers_verification.json) - Security headers validation
- [License Audit](license_audit.json) - License compliance analysis
- [License Audit (Markdown)](license_audit.md) - License summary
- [Secrets Scan](secrets_scan.json) - Secrets scanning results
- [Playwright Results](playwright/) - E2E test artifacts

### Thresholds Summary
- **TypeScript**: No type errors ✅
- **ESLint**: Zero errors ✅
- **Tests**: All unit and e2e tests passing ✅
- **Accessibility**: Zero serious/critical violations ✅
- **Security Headers**: All required headers present ✅
- **Bundle Size**: Main bundle ≤ 1.5MB, Pages ≤ 1.2MB ✅
- **Lighthouse Performance**: ≥ 85 on mobile/desktop ✅
- **Lighthouse SEO**: ≥ 90 on mobile/desktop ✅
- **Lighthouse Best Practices**: ≥ 90 on mobile/desktop ✅

### Environment
- **Node Version**: $(node --version)
- **NPM Version**: $(npm --version)
- **Target URL**: $BASE
- **Site URL**: $SITE_URL
- **Timestamp**: $(date -Is)

EOF
}

# Cleanup on exit
cleanup() {
  stop_server
}

trap cleanup EXIT

# Run main function
main "$@"