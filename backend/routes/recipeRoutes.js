const express = require('express');
const path = require('path');
const router = express.Router();

// Serve the recipes.json file from the data folder
router.get('/recipes', (req, res) => {
  res.sendFile(path.join(__dirname, '../data/recipes.json'));
});

module.exports = router;
