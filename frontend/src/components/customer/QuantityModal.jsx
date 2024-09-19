// src/components/customer/QuantityModal.jsx
import React, { useState } from 'react';

const QuantityModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddClick = () => {
    onAddToCart(quantity);
    onClose();
  };

  const cost = (product.pricePerKg * quantity).toFixed(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Add to Cart</h2>
        <div className="mb-4">
          <img
            src={`/${product.name.toLowerCase()}.jpg`}
            alt={product.name}
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">Price per Kg: ${product.pricePerKg}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Quantity (Kg)</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <p className="font-semibold">Total Cost: ${cost}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Add to Cart
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityModal;
