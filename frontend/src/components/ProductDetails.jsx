import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import data from '../data/data.json';

const ProductDetails = () => {
  const { name } = useParams();
  const [productData, setProductData] = useState([]);
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const url = `${API_BASE_URL}/api/products/name/${name}`;
        const response = await axios.get(url);
        setProductData(response.data);

        // Determine if the product is a fruit or vegetable
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

  if (!productInfo) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <div className="flex gap-6">
        {/* Product Info Section */}
        <div className="flex-1">
          <div className="flex flex-col items-center mb-6">
            <img
              src={`/${productInfo.image}`} // Ensure correct path format
              alt={productInfo.name}
              className="w-1/2 h-auto rounded-lg shadow-lg"
            />
            <h3 className="text-xl font-semibold mt-4">{productInfo.name}</h3>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 shadow-lg">
            <h4 className="text-lg font-semibold mb-2">Nutritional Facts</h4>
            <ul className="list-disc pl-5">
              <li><strong>Calories:</strong> {productInfo.calories} kcal</li>
              <li><strong>Carbohydrates:</strong> {productInfo.carbohydrates} g</li>
              <li><strong>Protein:</strong> {productInfo.protein} g</li>
              <li><strong>Fibers:</strong> {productInfo.fibers} g</li>
              {Object.entries(productInfo.vitamins).map(([vitamin, quantity]) => (
                <li key={vitamin}><strong>{vitamin}:</strong> {quantity}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vendor Offerings Section */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">Vendor Offerings</h3>
          {productData.map((product, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-lg mb-4">
              <h4 className="text-lg font-semibold">Vendor Name: {product.vendorName}</h4>
              <p className="text-xl font-bold text-green-600">Price per Kg: ₹{product.pricePerKg}</p>
              <p className="text-sm text-gray-600">Quantity Weight: {product.totalQuantityWeight} kg</p>
              <p className="text-sm text-gray-600">Date Added: {new Date(product.dateAdded).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Vendor Contact: {product.vendorContact}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
