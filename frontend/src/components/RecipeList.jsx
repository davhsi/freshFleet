import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(`Error fetching recipes: ${error.message}`);
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Recipes
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{recipe.name}</h2>
              <img src={`/public/recipes/${recipe.image}`} alt={recipe.name} className="w-full h-auto"/>
              <ul className="list-disc pl-5 mt-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
