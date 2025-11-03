const express = require('express');
const router = express.Router();
const otpService = require('../services/otpService');

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// Send OTP
router.post('/send', async (req, res) => {
  try {
    const { email, phone, whatsapp, method } = req.body;

    if (!method || !['email', 'sms', 'whatsapp'].includes(method)) {
      return res.status(400).json({ error: 'Invalid verification method' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP with expiration (5 minutes)
    const identifier = email || phone || whatsapp;
    otpStore.set(identifier, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      method
    });

    // Send OTP based on method
    let result;
    switch (method) {
      case 'email':
        result = await otpService.sendEmailOTP(email, otp);
        break;
      case 'sms':
        result = await otpService.sendSMSOTP(phone, otp);
        break;
      case 'whatsapp':
        result = await otpService.sendWhatsAppOTP(whatsapp, otp);
        break;
    }

    if (result.success) {
      res.json({
        success: true,
        message: `OTP sent successfully via ${method}`,
        identifier
      });
    } else {
      res.status(500).json({
        error: 'Failed to send OTP',
        details: result.error
      });
    }
  } catch (error) {
    console.error('OTP send error:', error);
    res.status(500).json({ error: 'Failed to send OTP', details: error.message });
  }
});

// Verify OTP
router.post('/verify', (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({ error: 'Identifier and OTP are required' });
    }

    const storedData = otpStore.get(identifier);

    if (!storedData) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(identifier);
      return res.status(400).json({ error: 'OTP has expired' });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP verified successfully
    otpStore.delete(identifier);

    res.json({
      success: true,
      message: 'OTP verified successfully',
      verified: true
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: 'Failed to verify OTP', details: error.message });
  }
});

module.exports = router;
