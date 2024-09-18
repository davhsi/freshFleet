const path = require('path');

// Controller function to get recipes
const getRecipes = (req, res) => {
  try {
    // Serve the recipes.json file from the data folder
    const recipesFilePath = path.join(__dirname, '../data/recipes.json');
    res.sendFile(recipesFilePath);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

module.exports = { getRecipes };
