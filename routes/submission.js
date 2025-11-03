const express = require('express');
const router = express.Router();
const submissionService = require('../services/submissionService');
const { v4: uuidv4 } = require('uuid');

// Store submission jobs (in production, use Redis/database)
const submissionJobs = new Map();

// Submit NAP to selected directories
router.post('/start', async (req, res) => {
  try {
    const {
      businessName,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      email,
      website,
      category,
      description,
      selectedDirectories,
      verified
    } = req.body;

    // Validate required fields
    if (!businessName || !address || !phone || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!verified) {
      return res.status(400).json({ error: 'Please verify your contact information with OTP first' });
    }

    if (!selectedDirectories || selectedDirectories.length === 0) {
      return res.status(400).json({ error: 'Please select at least one directory' });
    }

    // Create submission job
    const jobId = uuidv4();
    const napData = {
      businessName,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      email,
      website,
      category,
      description
    };

    submissionJobs.set(jobId, {
      id: jobId,
      status: 'queued',
      napData,
      directories: selectedDirectories,
      results: [],
      createdAt: new Date(),
      progress: 0
    });

    // Start submission process asynchronously
    submissionService.processSubmissions(jobId, napData, selectedDirectories, submissionJobs);

    res.json({
      success: true,
      jobId,
      message: 'Submission process started',
      totalDirectories: selectedDirectories.length
    });
  } catch (error) {
    console.error('Submission start error:', error);
    res.status(500).json({ error: 'Failed to start submission', details: error.message });
  }
});

// Get submission status
router.get('/status/:jobId', (req, res) => {
  try {
    const { jobId } = req.params;
    const job = submissionJobs.get(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({
      success: true,
      job: {
        id: job.id,
        status: job.status,
        progress: job.progress,
        total: job.directories.length,
        results: job.results,
        createdAt: job.createdAt
      }
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to get status', details: error.message });
  }
});

// Get all submissions for a user (by email)
router.get('/history/:email', (req, res) => {
  try {
    const { email } = req.params;
    const userJobs = [];

    submissionJobs.forEach((job) => {
      if (job.napData.email === email) {
        userJobs.push({
          id: job.id,
          status: job.status,
          businessName: job.napData.businessName,
          progress: job.progress,
          total: job.directories.length,
          createdAt: job.createdAt
        });
      }
    });

    res.json({
      success: true,
      jobs: userJobs.sort((a, b) => b.createdAt - a.createdAt)
    });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to get history', details: error.message });
  }
});

module.exports = router;
