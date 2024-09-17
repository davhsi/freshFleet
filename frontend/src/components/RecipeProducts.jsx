import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/customer/ProductCard';

const RecipeProducts = () => {
  const location = useLocation();
  const { recipe } = location.state || {};
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) {
      setError('No recipe or ingredients selected.');
      setLoading(false);  // Stop loading if no recipe or ingredients are found
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const productData = await response.json();
        
        // Log the product data for debugging
        console.log('Fetched products:', productData);
        
        // Remove duplicate products based on ID
        const uniqueProducts = Array.from(new Set(productData.map(product => product.id)))
          .map(id => productData.find(product => product.id === id));

        // Filter products based on recipe ingredients
        const matchingProducts = uniqueProducts.filter(product =>
          recipe.ingredients.some(ingredient =>
            product.name.toLowerCase().includes(ingredient.toLowerCase())
          )
        );

        setFilteredProducts(matchingProducts);
      } catch (error) {
        setError(`Error fetching products: ${error.message}`);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchProducts();
  }, [recipe]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
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
