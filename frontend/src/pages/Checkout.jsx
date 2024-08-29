import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '.././config';


const Checkout = ({ userId }) => {
  const { cartItems, clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleCheckout = async () => {
    try {
      // Logic to process order (not shown)
      console.log('Order placed:', { name, address, paymentMethod, cartItems });

      // Clear the cart in the database
      await axios.delete(`${API_BASE_URL}/api/cart/clear/${userId}`);
      clearCart();

      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        />
      </div>
      <div>
        <label>Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        >
          <option>Credit Card</option>
          <option>Debit Card</option>
          <option>Net Banking</option>
        </select>
      </div>
      <button
        onClick={handleCheckout}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
