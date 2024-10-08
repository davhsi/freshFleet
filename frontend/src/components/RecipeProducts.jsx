import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/customer/ProductCard';

const RecipeProducts = () => {
  const location = useLocation();
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
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const productData = await response.json();

        // Transform ingredient names to match image filenames
        const transformIngredientName = (name) => name.toLowerCase().replace(/\s+/g, '_');

        // Create a map to store unique ingredients
        const uniqueIngredients = new Map();

        productData.forEach((product) => {
          const transformedProductName = transformIngredientName(product.name);

          recipe.ingredients.forEach((ingredient) => {
            const transformedIngredientName = transformIngredientName(ingredient);

            // If the product matches the ingredient and is not yet in the map, add it
            if (transformedProductName === transformedIngredientName && !uniqueIngredients.has(transformedIngredientName)) {
              uniqueIngredients.set(transformedIngredientName, {
                ...product,
                transformedName: transformedProductName
              });
            }
          });
        });

        // Convert map values to an array and set the filtered products
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-serif">
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
