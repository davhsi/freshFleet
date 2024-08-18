import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/customer/ProductCard';
import data from '../data/data.json';

const CustomerHome = () => {
  const [customerName, setCustomerName] = useState('Guest');
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('customerName');
    if (storedName && storedName.trim()) {
      setCustomerName(storedName);
    }

    const allProducts = [...data.fruits, ...data.vegetables];
    setProducts(allProducts);
  }, []);

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

      <div className="flex justify-end mb-6"> {/* Adjusted layout */}
        <button
          onClick={() => navigate('/cart')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          View Cart
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
  