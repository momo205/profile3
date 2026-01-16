#!/usr/bin/env node

/**
 * Secret Scanning Script
 * 
 * Scans the codebase for potential secrets and sensitive information
 * that should not be committed or exposed in client bundles.
 * 
 * Usage: npm run security:scan
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Patterns that indicate potential secrets
const SECRET_PATTERNS = [
  // API Keys
  /(?:api[_-]?key|apikey)\s*[=:]\s*['"`]?([a-zA-Z0-9_\-]{20,})['"`]?/gi,
  /(?:secret[_-]?key|secretkey)\s*[=:]\s*['"`]?([a-zA-Z0-9_\-]{20,})['"`]?/gi,
  
  // Private keys
  /(?:private[_-]?key|privatekey)\s*[=:]\s*['"`]?-----BEGIN\s+[A-Z\s]+-----/gi,
  /PRIVATE[_-]?KEY\s*[=:]\s*['"`]?([a-zA-Z0-9_\-]{20,})['"`]?/gi,
  
  // Tokens
  /(?:access[_-]?token|accesstoken)\s*[=:]\s*['"`]?([a-zA-Z0-9_\-]{20,})['"`]?/gi,
  /(?:bearer[_-]?token|bearertoken)\s*[=:]\s*['"`]?([a-zA-Z0-9_\-]{20,})['"`]?/gi,
  
  // Secret patterns
  /(?:secret|password|passwd|pwd)\s*[=:]\s*['"`]?([a-zA-Z0-9_\-!@#$%^&*]{8,})['"`]?/gi,
  
  // AWS/Azure/GCP keys
  /(?:aws[_-]?secret|aws[_-]?access[_-]?key)\s*[=:]\s*['"`]?([a-zA-Z0-9_\-/+=]{20,})['"`]?/gi,
  /AKIA[0-9A-Z]{16}/gi, // AWS Access Key ID pattern
  /(?:azure[_-]?key|gcp[_-]?key)\s*[=:]\s*['"`]?([a-zA-Z0-9_\-]{20,})['"`]?/gi,
  
  // Database connections
  /(?:database[_-]?url|db[_-]?url|connection[_-]?string)\s*[=:]\s*['"`]?(mongodb|postgres|mysql):\/\/[^'"`\s]+['"`]?/gi,
  
  // OAuth secrets
  /(?:oauth[_-]?secret|client[_-]?secret)\s*[=:]\s*['"`]?([a-zA-Z0-9_\-]{20,})['"`]?/gi,
  
  // Stripe keys (secret keys, not publishable)
  /sk_[a-zA-Z0-9]{24,}/gi,
  
  // Generic secret patterns
  /['"`](?:sk|pk|tk|tk_)[a-zA-Z0-9_\-]{20,}['"`]/gi,
];

// Files/directories to ignore
const IGNORE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /dist/,
  /build/,
  /coverage/,
  /\.env\.local$/,
  /\.env\.example$/,
  /package-lock\.json$/,
  /yarn\.lock$/,
  /pnpm-lock\.yaml$/,
  /secret-scan\.ts$/,
  /\.d\.ts$/,
];

// Allowed patterns (known safe public keys/IDs)
const ALLOWED_PATTERNS = [
  /NEXT_PUBLIC_EMAILJS_PUBLIC_KEY/, // EmailJS public key is meant to be public
  /NEXT_PUBLIC_/, // All NEXT_PUBLIC_ vars are intentionally public
  /process\.env\.NEXT_PUBLIC_/, // Accessing public env vars
];

interface ScanResult {
  file: string;
  line: number;
  match: string;
  pattern: string;
}

function shouldIgnoreFile(filePath: string): boolean {
  return IGNORE_PATTERNS.some(pattern => pattern.test(filePath));
}

function isAllowedMatch(match: string, line: string): boolean {
  return ALLOWED_PATTERNS.some(pattern => {
    return pattern.test(line);
  });
}

function scanFile(filePath: string): ScanResult[] {
  const results: ScanResult[] = [];
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      SECRET_PATTERNS.forEach(pattern => {
        const matches = line.matchAll(pattern);
        for (const match of matches) {
          if (match[0] && !isAllowedMatch(match[0], line)) {
            results.push({
              file: filePath,
              line: index + 1,
              match: match[0].substring(0, 50), // Truncate for display
              pattern: pattern.toString(),
            });
          }
        }
      });
    });
  } catch (error) {
    // Skip files that can't be read (binary files, etc.)
  }
  
  return results;
}

function scanDirectory(dirPath: string, basePath: string = dirPath): ScanResult[] {
  const results: ScanResult[] = [];
  
  try {
    const entries = readdirSync(dirPath);
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry);
      const relativePath = fullPath.replace(basePath + '/', '');
      
      if (shouldIgnoreFile(relativePath)) {
        continue;
      }
      
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        results.push(...scanDirectory(fullPath, basePath));
      } else if (stat.isFile()) {
        // Only scan text files
        if (/\.(ts|tsx|js|jsx|mjs|cjs|json|env|md|txt)$/.test(entry)) {
          results.push(...scanFile(fullPath));
        }
      }
    }
  } catch (error) {
    // Skip directories that can't be read
  }
  
  return results;
}

function main() {
  console.log('🔍 Scanning for potential secrets...\n');
  
  const rootDir = join(process.cwd());
  const results = scanDirectory(rootDir);
  
  if (results.length === 0) {
    console.log('✅ No potential secrets found!\n');
    process.exit(0);
  }
  
  console.error('❌ Potential secrets found:\n');
  
  // Group by file
  const byFile = new Map<string, ScanResult[]>();
  results.forEach(result => {
    if (!byFile.has(result.file)) {
      byFile.set(result.file, []);
    }
    byFile.get(result.file)!.push(result);
  });
  
  byFile.forEach((fileResults, file) => {
    console.error(`📄 ${file}:`);
    fileResults.forEach(result => {
      console.error(`   Line ${result.line}: ${result.match}`);
    });
    console.error('');
  });
  
  console.error(`\n⚠️  Found ${results.length} potential secret(s) across ${byFile.size} file(s)`);
  console.error('   Please review and remove any actual secrets before committing.\n');
  console.error('   Note: NEXT_PUBLIC_* variables are intentionally public and safe.\n');
  
  process.exit(1);
}

main();

