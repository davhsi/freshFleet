import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/customer/ProductCard';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import data from '../data/data.json';
import Footer from '../components/footer/Footer';

const CustomerHome = () => {
  const [customerName, setCustomerName] = useState('Guest');
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();
  const userId = localStorage.getItem('customerId');
  const calculateTotalVitamins = (vitamins) => {
    return Object.values(vitamins)
      .map(parseFloat)
      .reduce((sum, value) => sum + (isNaN(value) ? 0 : value), 0);
  };

  useEffect(() => {
    const storedName = localStorage.getItem('customerName');
    if (storedName && storedName.trim()) {
      setCustomerName(storedName);
    }

    const transformProductName = (name) => name.toLowerCase().replace(/\s+/g, '_');

    const allProducts = data.ingredients.map((product) => ({
      ...product,
      transformedName: transformProductName(product.name),
      totalVitamins: calculateTotalVitamins(product.vitamins),
    }));

    setProducts(allProducts);

    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/cart/${userId}`);
        setCart(response.data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (!sortBy) return 0;
        const valueA = parseFloat(a[sortBy] || a.vitamins['Omega-3 Fatty Acid']);
        const valueB = parseFloat(b[sortBy] || b.vitamins['Omega-3 Fatty Acid']);
        const comparison = valueA - valueB;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [products, searchTerm, sortBy, sortOrder]);

  const handleLogout = () => {
    localStorage.removeItem('customerId');
    localStorage.removeItem('customerName');
    navigate('/');
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between lg:ml-6 mb-4">
        
        <div className="flex items-center space-x-4">
          <img
            src="/logo.png" 
            alt="FreshFleet Logo"
            className="w-100 h-24 object-contain ml-0" // Increased size for the logo
          />
        </div>

        {/* Greeting Section */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700 ml-4">
          <span style={{ color: 'black', fontWeight: 'bold', fontFamily: "'Edu Australia', cursive" }}>Hello</span>{' '}
          <span style={{ color: 'green', fontWeight: 'bold', fontFamily: "'Edu Australia', cursive" }}>{customerName}!</span>
        </h1>
      </div>

      {/* Search box, sort, and buttons container */}
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 lg:mx-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="border border-gray-900 p-2 rounded-lg w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search for products"
        />

        {/* Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 lg:space-x-6">
          <select
            className="border border-gray-900 p-2 rounded-lg bg-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by Nutrient</option>
            <option value="calories">Sort by Calories</option>
            <option value="carbohydrates">Sort by Carbohydrates</option>
            <option value="protein">Sort by Protein</option>
            <option value="fibers">Sort by Fibers</option>
            <option value="totalVitamins">Sort by Total Vitamins</option>
            <option value="Omega-3 Fatty Acid">Sort by Omega-3 Fatty Acid</option>
          </select>

          <select
            className="border border-gray-900 p-2 rounded-lg bg-transparent"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Buttons container */}
        <div className="flex space-x-4 lg:space-x-6">
          <button
            onClick={() => navigate('/cart')}
            className="custom-button px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            My Cart
          </button>
          <button
            onClick={() => navigate('/recipes')}
            className="custom-button px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Recipes
          </button>
          <button
            onClick={() => navigate('/order-history')}
            className="custom-button px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Order History
          </button>
          <button
            onClick={handleLogout}
            className="custom-button px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 lg:mx-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p className="text-center lg:text-left lg:ml-8">No products found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CustomerHome;
