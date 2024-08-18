import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import data from '../data/data.json';
import ProductInfo from '../components/customer/ProductInfo';
import VendorOfferings from '../components/customer/VendorOfferings';
import SortOptions from '../components/customer/SortOptions';
import { useCart } from '../context/CartContext'; 

const ProductDetails = () => {
  const { name } = useParams();
  const [productData, setProductData] = useState([]);
  const [productInfo, setProductInfo] = useState(null);
  const [sortOption, setSortOption] = useState('price');
  const [sortOrder, setSortOrder] = useState('desc');
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const url = `${API_BASE_URL}/api/products/name/${name}`;
        const response = await axios.get(url);
        setProductData(response.data);

        const product =
          data.fruits.find((item) => item.name === name) ||
          data.vegetables.find((item) => item.name === name);

        setProductInfo(product);

        if (!product) {
          console.error('Product not found in data.json');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductData();
  }, [name]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <div className="flex gap-6">
        <ProductInfo productInfo={productInfo} />
        <div>
          <SortOptions
            sortOption={sortOption}
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}
            handleSortOrderChange={handleSortOrderChange}
          />
          <VendorOfferings
            sortedProductData={sortedProductData}
            handleAddToCart={addToCart} // Pass the addToCart function
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
