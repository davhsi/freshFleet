import React, { createContext, useState, useContext } from 'react';
import ToastNotification from '../components/customer/ToastNotification';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setNotification(`Product added to cart: ${product.name}`);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCloseNotification = () => {
    setNotification('');
  };

  return (
    <CartContext.Provider value={{ cartItems: cart, addToCart, removeFromCart, clearCart }}>
      {children}
      {notification && <ToastNotification message={notification} onClose={handleCloseNotification} />}
    </CartContext.Provider>
  );
};
