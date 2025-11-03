const express = require('express');
const router = express.Router();
const directories = require('../data/directories.json');

// Get all available directories
router.get('/', (req, res) => {
  try {
    const { category, country } = req.query;

    let filteredDirectories = directories;

    if (category) {
      filteredDirectories = filteredDirectories.filter(dir =>
        dir.categories.includes(category)
      );
    }

    if (country) {
      filteredDirectories = filteredDirectories.filter(dir =>
        dir.countries.includes(country) || dir.countries.includes('global')
      );
    }

    res.json({
      success: true,
      total: filteredDirectories.length,
      directories: filteredDirectories
    });
  } catch (error) {
    console.error('Directory fetch error:', error);
    res.status(500).json({ error: 'Failed to get directories', details: error.message });
  }
});

// Get categories
router.get('/categories', (req, res) => {
  try {
    const categories = [...new Set(directories.flatMap(dir => dir.categories))];
    res.json({
      success: true,
      categories: categories.sort()
    });
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ error: 'Failed to get categories', details: error.message });
  }
});

module.exports = router;
