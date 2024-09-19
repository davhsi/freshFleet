import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import data from '../data/data.json';
import ProductInfo from '../components/customer/ProductInfo';
import VendorOfferings from '../components/customer/VendorOfferings';
import SortOptions from '../components/customer/SortOptions';
import useCart from '../hooks/useCart'; // Import useCart hook

const ProductDetails = () => {
  const { name } = useParams();
  const [productData, setProductData] = useState([]);
  const [productInfo, setProductInfo] = useState(null);
  const [sortOption, setSortOption] = useState('price');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);  // Add loading state
  const { addToCart } = useCart(); 
  const userId = localStorage.getItem('customerId'); 

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const url = `${API_BASE_URL}/api/products/name/${name}`;
        const response = await axios.get(url);
        setProductData(response.data);

        // Find product in data.json
        const product = data.ingredients.find((item) => item.name === name);

        setProductInfo(product);

        if (!product) {
          console.error('Product not found in data.json');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);  // Set loading to false when the fetch completes
      }
    };

    fetchProductData();
  }, [name]);

  // Handle sorting changes
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Sort vendor offerings
  const sortVendorOfferings = (offerings) => {
    return offerings.sort((a, b) => {
      let comparison = 0;
      if (sortOption === 'price') {
        comparison = a.pricePerKg - b.pricePerKg;
      } else if (sortOption === 'quantity') {
        comparison = a.totalQuantityWeight - b.totalQuantityWeight;
      } else if (sortOption === 'date') {
        comparison = new Date(a.dateAdded) - new Date(b.dateAdded);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const sortedProductData = sortVendorOfferings(productData);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">  {/* Removed background color */}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Product Details</h2>  {/* Updated title styling */}

      {loading ? (
        <p className="text-xl text-blue-500 animate-pulse text-center">Loading product details...</p>  // Display loading indicator
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500"> {/* Added border and shadow */}
            <ProductInfo productInfo={productInfo} />
          </div>
          <div className="col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6 border-l-4 border-yellow-400"> {/* Added border and shadow */}
              <SortOptions
                sortOption={sortOption}
                sortOrder={sortOrder}
                handleSortChange={handleSortChange}
                handleSortOrderChange={handleSortOrderChange}
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-green-500"> {/* Added border and shadow */}
              <VendorOfferings
                sortedProductData={sortedProductData}
                handleAddToCart={addToCart}
                userId={userId}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
