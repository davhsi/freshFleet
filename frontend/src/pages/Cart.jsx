import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      axios.get(`${API_BASE_URL}/api/cart/${userId}`)
        .then(response => {
          console.log('Cart Response:', response.data); // Log response data
          setCartItems(Array.isArray(response.data.items) ? response.data.items : []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading cart:', err);
          setError(err.message || 'Error loading cart');
          setLoading(false);
        });
    } else {
      setError('User ID not found');
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error loading cart: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            item ? (
              <li key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                <div className="text-lg font-medium">{item.name || 'Unknown'}</div>
                <div className="text-sm text-gray-600">Price Per Kg: {item.pricePerKg || 'N/A'}</div>
                <div className="text-sm text-gray-600">Vendor: {item.vendorName || 'Unknown'}</div>
                <div className="text-sm text-gray-600">Quantity: {item.quantity || 0}</div>
              </li>
            ) : (
              <li key={index} className="text-red-600">Invalid item data</li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
