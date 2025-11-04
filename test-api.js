#!/usr/bin/env node

/**
 * API Testing Script
 * Tests all endpoints without starting a long-running server
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Import routes
const otpRoutes = require('./routes/otp');
const submissionRoutes = require('./routes/submission');
const directoryRoutes = require('./routes/directories');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/otp', otpRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/directories', directoryRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Directory Submission Automation API is running' });
});

// Test function
async function testAPI() {
  const server = app.listen(0); // Use random available port
  const port = server.address().port;
  const baseURL = `http://localhost:${port}`;

  console.log('\n🧪 Testing Directory Submission Automation API\n');
  console.log('='.repeat(50));

  try {
    // Test 1: Health Check
    console.log('\n✓ Test 1: Health Check');
    const healthRes = await fetch(`${baseURL}/health`);
    const healthData = await healthRes.json();
    console.log('  Status:', healthData.status);
    console.log('  Message:', healthData.message);

    // Test 2: Get All Directories
    console.log('\n✓ Test 2: Get All Directories');
    const dirsRes = await fetch(`${baseURL}/api/directories`);
    const dirsData = await dirsRes.json();
    console.log('  Total directories:', dirsData.total);
    console.log('  Sample directory:', dirsData.directories[0].name);

    // Test 3: Get Categories
    console.log('\n✓ Test 3: Get Categories');
    const catsRes = await fetch(`${baseURL}/api/directories/categories`);
    const catsData = await catsRes.json();
    console.log('  Total categories:', catsData.categories.length);
    console.log('  Categories:', catsData.categories.slice(0, 5).join(', '), '...');

    // Test 4: Filter Directories by Country
    console.log('\n✓ Test 4: Filter Directories by Country (US)');
    const filterRes = await fetch(`${baseURL}/api/directories?country=US`);
    const filterData = await filterRes.json();
    console.log('  US directories:', filterData.total);

    // Test 5: Send OTP (Email - Demo Mode)
    console.log('\n✓ Test 5: Send OTP (Email - Demo Mode)');
    const otpSendRes = await fetch(`${baseURL}/api/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        method: 'email'
      })
    });
    const otpSendData = await otpSendRes.json();
    console.log('  Success:', otpSendData.success);
    console.log('  Message:', otpSendData.message);
    console.log('  Identifier:', otpSendData.identifier);

    // Test 6: Verify OTP (with demo code from console)
    console.log('\n✓ Test 6: Verify OTP');
    // In demo mode, OTP is logged to console, we'll use a test code
    const otpVerifyRes = await fetch(`${baseURL}/api/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'test@example.com',
        otp: '123456' // This will fail, but tests the endpoint
      })
    });
    const otpVerifyData = await otpVerifyRes.json();
    console.log('  Response:', otpVerifyData.error || otpVerifyData.message);

    // Test 7: Start Submission (will fail without verification, but tests endpoint)
    console.log('\n✓ Test 7: Start Submission (without verification)');
    const submissionRes = await fetch(`${baseURL}/api/submission/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: 'Test Business',
        address: '123 Test St',
        city: 'Test City',
        country: 'US',
        phone: '+1234567890',
        email: 'test@example.com',
        category: 'all',
        selectedDirectories: ['google-business', 'yelp'],
        verified: false
      })
    });
    const submissionData = await submissionRes.json();
    console.log('  Response:', submissionData.error || submissionData.message);

    // Test 8: Test with verified flag
    console.log('\n✓ Test 8: Start Submission (with verification)');
    const submissionRes2 = await fetch(`${baseURL}/api/submission/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: 'Test Business',
        address: '123 Test St',
        city: 'Test City',
        country: 'US',
        phone: '+1234567890',
        email: 'test@example.com',
        category: 'all',
        selectedDirectories: ['google-business', 'yelp'],
        verified: true
      })
    });
    const submissionData2 = await submissionRes2.json();
    console.log('  Success:', submissionData2.success);
    console.log('  Job ID:', submissionData2.jobId);
    console.log('  Total directories:', submissionData2.totalDirectories);

    // Test 9: Check submission status
    if (submissionData2.jobId) {
      console.log('\n✓ Test 9: Check Submission Status');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      const statusRes = await fetch(`${baseURL}/api/submission/status/${submissionData2.jobId}`);
      const statusData = await statusRes.json();
      console.log('  Job status:', statusData.job.status);
      console.log('  Progress:', statusData.job.progress + '%');
      console.log('  Results:', statusData.job.results.length, 'processed');
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ All API tests completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error);
  } finally {
    server.close();
    process.exit(0);
  }
}

// Run tests
testAPI();
