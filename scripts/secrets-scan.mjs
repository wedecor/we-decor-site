#!/usr/bin/env node

/**
 * Secrets Scanning Script
 * Simple regex-based scan + git-secrets (if available)
 * Usage: node scripts/secrets-scan.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(PROJECT_ROOT, 'artifacts');

// Secret patterns to scan for
const SECRET_PATTERNS = [
  {
    name: 'API Keys',
    pattern: /(api[_-]?key|apikey)\s*[:=]\s*['"]?([a-zA-Z0-9_-]{20,})['"]?/gi,
    severity: 'high'
  },
  {
    name: 'AWS Access Keys',
    pattern: /(aws[_-]?access[_-]?key[_-]?id|aws[_-]?secret[_-]?access[_-]?key)\s*[:=]\s*['"]?([a-zA-Z0-9/+=]{20,})['"]?/gi,
    severity: 'high'
  },
  {
    name: 'Database URLs',
    pattern: /(mongodb|postgres|mysql|redis):\/\/[^\s'"]+/gi,
    severity: 'high'
  },
  {
    name: 'JWT Secrets',
    pattern: /(jwt[_-]?secret|jwt[_-]?key)\s*[:=]\s*['"]?([a-zA-Z0-9_-]{32,})['"]?/gi,
    severity: 'high'
  },
  {
    name: 'Private Keys',
    pattern: /-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----[\s\S]*?-----END\s+(?:RSA\s+)?PRIVATE\s+KEY-----/gi,
    severity: 'critical'
  },
  {
    name: 'OAuth Tokens',
    pattern: /(oauth[_-]?token|access[_-]?token)\s*[:=]\s*['"]?([a-zA-Z0-9_-]{20,})['"]?/gi,
    severity: 'high'
  },
  {
    name: 'GitHub Tokens',
    pattern: /(ghp_[a-zA-Z0-9]{36}|gho_[a-zA-Z0-9]{36}|ghu_[a-zA-Z0-9]{36}|ghs_[a-zA-Z0-9]{36}|ghr_[a-zA-Z0-9]{36})/gi,
    severity: 'high'
  },
  {
    name: 'Slack Tokens',
    pattern: /(xox[baprs]-[a-zA-Z0-9-]+)/gi,
    severity: 'high'
  },
  {
    name: 'Stripe Keys',
    pattern: /(sk_live_[a-zA-Z0-9]{24}|pk_live_[a-zA-Z0-9]{24})/gi,
    severity: 'high'
  },
  {
    name: 'Sentry DSN',
    pattern: /(https:\/\/[a-f0-9]{32}@[a-z0-9.-]+\.ingest\.sentry\.io\/[0-9]+)/gi,
    severity: 'high'
  },
  {
    name: 'Google API Keys',
    pattern: /(AIza[0-9A-Za-z\\-_]{35})/gi,
    severity: 'high'
  },
  {
    name: 'Generic Secrets',
    pattern: /(secret|password|passwd|pwd)\s*[:=]\s*['"]?([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,})['"]?/gi,
    severity: 'medium'
  }
];

// File extensions to scan
const SCAN_EXTENSIONS = [
  '.js', '.ts', '.jsx', '.tsx', '.json', '.env', '.yaml', '.yml',
  '.md', '.txt', '.sh', '.bash', '.zsh', '.fish', '.py', '.rb',
  '.php', '.java', '.cs', '.cpp', '.c', '.h', '.hpp'
];

// Directories to exclude
const EXCLUDE_DIRS = [
  'node_modules', '.git', '.next', 'dist', 'build', 'coverage',
  'artifacts', '.vercel', '.cache', 'tmp', 'temp'
];

// Files to exclude
const EXCLUDE_FILES = [
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
  'lighthouse-report.html', 'bundle-analysis.html'
];

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function shouldScanFile(filePath) {
  const ext = extname(filePath);
  const fileName = filePath.split('/').pop();
  
  // Check if file extension should be scanned
  if (!SCAN_EXTENSIONS.includes(ext)) {
    return false;
  }
  
  // Check if file should be excluded
  if (EXCLUDE_FILES.includes(fileName)) {
    return false;
  }
  
  return true;
}

function shouldScanDirectory(dirPath) {
  const dirName = dirPath.split('/').pop();
  return !EXCLUDE_DIRS.includes(dirName);
}

function scanFile(filePath) {
  const findings = [];
  
  try {
    const content = readFileSync(filePath, 'utf8');
    
    for (const pattern of SECRET_PATTERNS) {
      const matches = [...content.matchAll(pattern.pattern)];
      
      for (const match of matches) {
        findings.push({
          pattern: pattern.name,
          severity: pattern.severity,
          match: match[0],
          line: content.substring(0, match.index).split('\n').length,
          file: filePath
        });
      }
    }
  } catch (error) {
    // Skip files that can't be read (binary files, etc.)
  }
  
  return findings;
}

function scanDirectory(dirPath) {
  const findings = [];
  
  try {
    const items = readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = join(dirPath, item);
      const stat = statSync(itemPath);
      
      if (stat.isDirectory()) {
        if (shouldScanDirectory(itemPath)) {
          findings.push(...scanDirectory(itemPath));
        }
      } else if (stat.isFile()) {
        if (shouldScanFile(itemPath)) {
          findings.push(...scanFile(itemPath));
        }
      }
    }
  } catch (error) {
    // Skip directories that can't be read
  }
  
  return findings;
}

function runGitSecrets() {
  try {
    // Check if git-secrets is installed
    execSync('git-secrets --version', { stdio: 'pipe' });
    
    log('Running git-secrets scan...', 'blue');
    const output = execSync('git-secrets --scan', { 
      stdio: 'pipe', 
      cwd: PROJECT_ROOT 
    }).toString();
    
    return {
      success: true,
      output: output.trim(),
      findings: output.trim() ? output.trim().split('\n') : []
    };
  } catch (error) {
    return {
      success: false,
      output: 'git-secrets not available or no secrets found',
      findings: []
    };
  }
}

function main() {
  try {
    log('Starting secrets scan...', 'blue');
    
    const results = {
      timestamp: new Date().toISOString(),
      scanType: 'regex',
      findings: [],
      gitSecrets: null,
      summary: {
        totalFindings: 0,
        criticalFindings: 0,
        highFindings: 0,
        mediumFindings: 0,
        status: 'PASS'
      }
    };

    // Run regex-based scan
    log('Running regex-based secret scan...', 'blue');
    results.findings = scanDirectory(PROJECT_ROOT);
    
    // Run git-secrets if available
    results.gitSecrets = runGitSecrets();
    
    // Analyze findings
    for (const finding of results.findings) {
      results.summary.totalFindings++;
      
      switch (finding.severity) {
        case 'critical':
          results.summary.criticalFindings++;
          break;
        case 'high':
          results.summary.highFindings++;
          break;
        case 'medium':
          results.summary.mediumFindings++;
          break;
      }
    }
    
    // Determine status (fail on critical or high findings)
    results.summary.status = (results.summary.criticalFindings + results.summary.highFindings) === 0 ? 'PASS' : 'FAIL';

    // Console output
    log('\n🔍 Secrets Scan Results', 'blue');
    log('='.repeat(50), 'blue');
    
    log(`\nTotal Findings: ${results.summary.totalFindings}`);
    log(`Critical: ${results.summary.criticalFindings}`);
    log(`High: ${results.summary.highFindings}`);
    log(`Medium: ${results.summary.mediumFindings}`);
    
    if (results.gitSecrets.success) {
      log(`\nGit-secrets: ${results.gitSecrets.findings.length} findings`);
    } else {
      log('\nGit-secrets: Not available or no findings');
    }

    // Show detailed findings
    if (results.findings.length > 0) {
      log('\n❌ Secret Findings:', 'red');
      
      // Group by severity
      const criticalFindings = results.findings.filter(f => f.severity === 'critical');
      const highFindings = results.findings.filter(f => f.severity === 'high');
      const mediumFindings = results.findings.filter(f => f.severity === 'medium');
      
      if (criticalFindings.length > 0) {
        log('\n🚨 Critical Findings:', 'red');
        criticalFindings.forEach(finding => {
          log(`  • ${finding.file}:${finding.line} - ${finding.pattern}`, 'red');
          log(`    ${finding.match.substring(0, 50)}...`, 'red');
        });
      }
      
      if (highFindings.length > 0) {
        log('\n⚠️ High Severity Findings:', 'yellow');
        highFindings.forEach(finding => {
          log(`  • ${finding.file}:${finding.line} - ${finding.pattern}`, 'yellow');
          log(`    ${finding.match.substring(0, 50)}...`, 'yellow');
        });
      }
      
      if (mediumFindings.length > 0) {
        log('\nℹ️ Medium Severity Findings:', 'blue');
        mediumFindings.forEach(finding => {
          log(`  • ${finding.file}:${finding.line} - ${finding.pattern}`, 'blue');
          log(`    ${finding.match.substring(0, 50)}...`, 'blue');
        });
      }
    }

    if (results.gitSecrets.findings.length > 0) {
      log('\n🔍 Git-secrets Findings:', 'yellow');
      results.gitSecrets.findings.forEach(finding => {
        log(`  • ${finding}`, 'yellow');
      });
    }

    if (results.summary.status === 'PASS') {
      log('\n✅ No secrets found!', 'green');
    } else {
      log('\n❌ Secrets scan failed!', 'red');
    }

    // Save report
    const reportPath = join(ARTIFACTS_DIR, 'secrets_scan.json');
    writeFileSync(reportPath, JSON.stringify(results, null, 2));
    log(`\n📄 Report saved to: ${reportPath}`);

    // Exit with error code if there are critical or high findings
    if (results.summary.status === 'FAIL') {
      process.exit(1);
    }

    process.exit(0);

  } catch (error) {
    log(`\n❌ Secrets scan failed: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

main();