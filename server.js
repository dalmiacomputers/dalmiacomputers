const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Import routes
const otpRoutes = require('./routes/otp');
const submissionRoutes = require('./routes/submission');
const directoryRoutes = require('./routes/directories');

// Routes
app.use('/api/otp', otpRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/directories', directoryRoutes);

// Serve landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Directory Submission Automation API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Landing page: http://localhost:${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/health`);
});

module.exports = app;
