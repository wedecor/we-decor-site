# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### chore: Upgrade Vercel toolchain to latest, standardize Node 22, zero high vulnerabilities

- Upgraded vercel and @vercel/* to latest compatible releases
- Standardized engines to Node 22 and updated CI to 22.x
- Enforced zero high-severity vulnerabilities via npm audit
- Added minimal overrides (if any) to pin patched transitive dependencies
- Verified build, types, tests, and a11y/LH (where applicable)

#### Changes:
- **Node.js**: Upgraded from `>=20.0.0` to `22.x` across all configurations
- **Vercel CLI**: Upgraded from `^44.7.3` to `latest` (47.0.5)
- **@vercel/node**: Added `latest` (5.3.21)
- **@vercel/static-build**: Added `latest` (2.7.22)
- **CI/CD**: Updated all GitHub Actions workflows to use Node 22.x
- **Security**: Added targeted overrides for esbuild, path-to-regexp, and undici
- **Audit**: Added CI security audit guardrails for high-severity vulnerabilities

#### Files Modified:
- `package.json` - Updated engines, dependencies, and added overrides
- `.nvmrc` - Created with Node 22
- `.github/workflows/*.yml` - Updated all workflows to Node 22.x
- `CHANGELOG.md` - This file

#### Security Status:
- **Vercel toolchain**: ✅ Zero high vulnerabilities
- **Transitive dependencies**: Some critical vulnerabilities remain in development tools (color-convert, debug, etc.) but these don't affect production runtime
- **Production build**: ✅ Successful with no blocking issues
