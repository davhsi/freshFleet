import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../customer/ProductCard';
import { API_BASE_URL } from '../../config';
import { FaArrowLeft } from 'react-icons/fa'; // Import the back icon

const RecipeProducts = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { recipe } = location.state || {};
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) {
      setError('No recipe or ingredients selected.');
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const productData = await response.json();

        const transformIngredientName = (name) => name.toLowerCase().replace(/\s+/g, '_');

        const uniqueIngredients = new Map();

        productData.forEach((product) => {
          const transformedProductName = transformIngredientName(product.name);

          recipe.ingredients.forEach((ingredient) => {
            const transformedIngredientName = transformIngredientName(ingredient);

            if (transformedProductName === transformedIngredientName && !uniqueIngredients.has(transformedIngredientName)) {
              uniqueIngredients.set(transformedIngredientName, {
                ...product,
                transformedName: transformedProductName,
              });
            }
          });
        });

        const uniqueProductArray = Array.from(uniqueIngredients.values());
        setFilteredProducts(uniqueProductArray);

      } catch (error) {
        setError(`Error fetching products: ${error.message}`);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [recipe]);

  // Back button handler
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-serif">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="text-gray-700 hover:text-blue-500 flex items-center mb-6"
      >
        <FaArrowLeft className="mr-2" /> {/* Back icon */}
        Back
      </button>

      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        Ingredients for {recipe ? recipe.name : 'Recipe'}
      </h1>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p>No matching products found for this recipe.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeProducts;
