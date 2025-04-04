import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, CDN_BASE_URL } from '../../config'; 
import { FaArrowLeft } from 'react-icons/fa'; // Import back icon

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/recipes`); 
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-serif">
      <button
        onClick={handleBack}
        className="text-gray-700 hover:text-blue-500 flex items-center mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">Recipes List</h1>

      <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow-lg mb-8 text-center">
        <p className="text-xl italic">
          "Making cooking simpler, smarter, and just a click away"
        </p>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search Recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white border p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleRecipeClick(recipe)}
            >
              <img
                src={`${CDN_BASE_URL}/recipes/${recipe.image}`}
                alt={recipe.name}
                className="w-full h-40 object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${CDN_BASE_URL}/recipes/default.jpeg`;
                }}
              />
              <h2 className="text-xl font-semibold mt-4 text-gray-800">{recipe.name}</h2>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
