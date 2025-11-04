#!/usr/bin/env node

/**
 * Setup Verification Script
 * Verifies that all components are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Verifying Directory Submission Automation Setup\n');
console.log('='.repeat(60));

let allChecks = true;

// Check 1: Node.js version
console.log('\n✓ Check 1: Node.js Version');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion >= 18) {
  console.log(`  ✅ Node.js ${nodeVersion} (>= 18.0.0 required)`);
} else {
  console.log(`  ❌ Node.js ${nodeVersion} (>= 18.0.0 required)`);
  allChecks = false;
}

// Check 2: Required files
console.log('\n✓ Check 2: Required Files');
const requiredFiles = [
  'server.js',
  'package.json',
  '.env',
  'routes/directories.js',
  'routes/otp.js',
  'routes/submission.js',
  'services/otpService.js',
  'services/submissionService.js',
  'data/directories.json',
  'public/index.html',
  'public/css/styles.css',
  'public/js/app.js'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allChecks = false;
  }
});

// Check 3: Dependencies
console.log('\n✓ Check 3: Node Modules');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('  ✅ node_modules directory exists');
  
  const requiredPackages = [
    'express',
    'cors',
    'dotenv',
    'puppeteer',
    'nodemailer',
    'twilio',
    'bull',
    'redis',
    'uuid'
  ];
  
  requiredPackages.forEach(pkg => {
    const pkgPath = path.join(nodeModulesPath, pkg);
    if (fs.existsSync(pkgPath)) {
      console.log(`  ✅ ${pkg}`);
    } else {
      console.log(`  ❌ ${pkg} - NOT INSTALLED`);
      allChecks = false;
    }
  });
} else {
  console.log('  ❌ node_modules directory not found');
  console.log('  Run: npm install');
  allChecks = false;
}

// Check 4: Environment configuration
console.log('\n✓ Check 4: Environment Configuration');
require('dotenv').config();

const envVars = [
  'PORT',
  'SMTP_HOST',
  'SMTP_USER',
  'TWILIO_ACCOUNT_SID'
];

envVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`  ✅ ${varName} is set`);
  } else {
    console.log(`  ⚠️  ${varName} not set (demo mode will be used)`);
  }
});

// Check 5: Directory data
console.log('\n✓ Check 5: Directory Database');
try {
  const directories = require('./data/directories.json');
  console.log(`  ✅ Loaded ${directories.length} directories`);
  
  const priorities = {
    1: directories.filter(d => d.priority === 1).length,
    2: directories.filter(d => d.priority === 2).length,
    3: directories.filter(d => d.priority === 3).length
  };
  
  console.log(`  ✅ Priority 1 (High): ${priorities[1]} directories`);
  console.log(`  ✅ Priority 2 (Medium): ${priorities[2]} directories`);
  console.log(`  ✅ Priority 3 (Standard): ${priorities[3]} directories`);
  
  const categories = [...new Set(directories.flatMap(d => d.categories))];
  console.log(`  ✅ Categories: ${categories.length} (${categories.join(', ')})`);
} catch (error) {
  console.log('  ❌ Failed to load directories.json');
  console.log('  Error:', error.message);
  allChecks = false;
}

// Check 6: JavaScript syntax
console.log('\n✓ Check 6: JavaScript Syntax Validation');
const jsFiles = [
  'server.js',
  'routes/directories.js',
  'routes/otp.js',
  'routes/submission.js',
  'services/otpService.js',
  'services/submissionService.js'
];

let syntaxErrors = 0;
jsFiles.forEach(file => {
  try {
    require(path.join(__dirname, file));
    console.log(`  ✅ ${file}`);
  } catch (error) {
    console.log(`  ❌ ${file} - SYNTAX ERROR`);
    console.log(`     ${error.message}`);
    syntaxErrors++;
    allChecks = false;
  }
});

// Check 7: Port availability
console.log('\n✓ Check 7: Port Configuration');
const port = process.env.PORT || 3000;
console.log(`  ✅ Server will run on port ${port}`);

// Check 8: Puppeteer
console.log('\n✓ Check 8: Puppeteer (Browser Automation)');
try {
  const puppeteer = require('puppeteer');
  console.log('  ✅ Puppeteer is installed');
  console.log('  ℹ️  Chromium will be downloaded on first use');
} catch (error) {
  console.log('  ❌ Puppeteer not found');
  allChecks = false;
}

// Summary
console.log('\n' + '='.repeat(60));
if (allChecks) {
  console.log('\n✅ All checks passed! Your setup is ready.\n');
  console.log('Next steps:');
  console.log('  1. Review .env file and configure external services (optional)');
  console.log('  2. Run API tests: node test-api.js');
  console.log('  3. Start server: npm start (opens http://localhost:3000)');
  console.log('  4. Open public/index.html in a browser for testing\n');
} else {
  console.log('\n⚠️  Some checks failed. Please review the errors above.\n');
  console.log('Common fixes:');
  console.log('  - Run: npm install');
  console.log('  - Ensure Node.js >= 18.0.0');
  console.log('  - Check file permissions');
  console.log('  - Review error messages\n');
}

console.log('For detailed documentation, see:');
console.log('  - README.md (full documentation)');
console.log('  - QUICKSTART.md (quick setup guide)');
console.log('  - PROJECT_SUMMARY.md (project overview)\n');
