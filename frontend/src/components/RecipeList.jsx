import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recipes');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        setError(`Error fetching recipes: ${error.message}`);
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const result = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(result);
  }, [searchQuery, recipes]);

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe-products/${recipe.name}`, { state: { recipe } });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Recipes</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border p-2 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleRecipeClick(recipe)}
            >
              <img
                src={`/recipes/${recipe.image}`}
                alt={recipe.name}
                className="w-40 h-40 object-cover"
              />
              <h2 className="text-lg font-semibold mt-2">{recipe.name}</h2>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
