import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/customer/ProductCard';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import data from '../data/data.json';

const CustomerHome = () => {
  const [customerName, setCustomerName] = useState('Guest');
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('customerId'); // Get customerId from localStorage

  useEffect(() => {
    const storedName = localStorage.getItem('customerName');
    if (storedName && storedName.trim()) {
      setCustomerName(storedName);
    }

    // Transform product names for image matching
    const transformProductName = (name) => name.toLowerCase().replace(/\s+/g, '_');

    const allProducts = data.ingredients.map(product => ({
      ...product,
      transformedName: transformProductName(product.name)
    }));

    setProducts(allProducts);

    // Fetch user's cart from the server
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/cart/${userId}`);
        setCart(response.data.items); // Set the cart state with the fetched items
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Hello {customerName}!
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="border border-gray-300 p-2 rounded-lg w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search for products"
        />
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/cart')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          View Cart
        </button>
        <button
          onClick={() => navigate('/recipes')}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Recipes
        </button>
      </div>
      

      <div className="flex flex-wrap gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerHome;
