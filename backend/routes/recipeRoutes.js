const express = require('express');
const { getRecipes } = require('../controllers/recipeController');
const router = express.Router();

// Route to get all recipes
router.get('/', getRecipes);

module.exports = router;
