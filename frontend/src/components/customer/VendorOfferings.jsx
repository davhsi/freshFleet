import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import QuantityModal from './QuantityModal';

const VendorOfferings = ({ sortedProductData, userId }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = async (quantity) => {
    try {
      const cartItem = {
        userId,
        product: {
          _id: selectedProduct._id,
          name: selectedProduct.name,
          pricePerKg: selectedProduct.pricePerKg,
          quantity,
        },
      };

      console.log('Adding to cart:', cartItem);

      const response = await axios.post(`${API_BASE_URL}/api/cart/add`, cartItem);

      if (response.status === 200) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart', error);
      alert('Error adding product to cart');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Vendor Offerings</h3>
      <ul>
        {sortedProductData.map((product) => (
          <li key={product._id} className="flex justify-between items-center mb-4">
            <div className="text-gray-900 text-xl">
              {product.name} - ₹{product.pricePerKg} per kg
              <div className="text-sm text-gray-500">
                Vendor: {product.vendorId && product.vendorId.name ? product.vendorId.name : 'Unknown Vendor'}
              </div>
            </div>
            <button
              onClick={() => handleAddToCartClick(product)}
              className="bg-blue-500 text-white px-3 py-1 rounded transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <QuantityModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default VendorOfferings;
