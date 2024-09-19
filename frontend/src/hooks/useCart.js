// hooks/useCart.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const useCart = (userId) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/cart/${userId}`);
        setCart(response.data.cart.items || []); // Ensure proper data structure
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const addToCart = async (product) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/cart/add`, {
        userId,
        product,
      });
      if (response.status === 200) {
        alert('Product added to cart successfully!');
        setCart(response.data.cart.items || []); // Update cart state
      } else {
        alert('Failed to add product to cart');
      }
    } catch (err) {
      setError(err);
      alert('Error adding product to cart');
    }
  };

  return {
    cart,
    loading,
    error,
    addToCart,
  };
};

export default useCart;
