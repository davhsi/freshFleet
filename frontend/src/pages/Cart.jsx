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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart: {error}</div>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            item ? (
              <li key={index}>
                <div>Product Name: {item.name || 'Unknown'}</div>
                <div>Price Per Kg: {item.pricePerKg || 'N/A'}</div>
                <div>Vendor: {item.vendorName || 'Unknown'}</div>
                <div>Quantity: {item.quantity || 0}</div>
              </li>
            ) : (
              <li key={index}>Invalid item data</li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
