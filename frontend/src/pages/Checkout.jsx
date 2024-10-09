import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Import API_BASE_URL from config

const Checkout = () => {
  const handleCheckout = async () => {
    try {
      const checkoutData = {
        amount: 10000, // Total amount in paise
        merchantTransactionId: `MT${Date.now()}`, // Unique transaction ID
        merchantUserId: "MUID123", // Unique customer ID
        mobileNumber: "9999999999" // Optional: Customer's mobile number
      };

      const response = await axios.post(`${API_BASE_URL}/api/payment/pay`, checkoutData); // Use API_BASE_URL here
      console.log('Checkout response:', response.data);

      if (response.data.success && response.data.data.instrumentResponse) {
        window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
      } else {
        alert('Payment initiation failed.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during payment initiation.');
    }
  };

  return (
    <div>
      <h2>Checkout Page</h2>
      <button onClick={handleCheckout}>Proceed to Pay</button>
    </div>
  );
};

export default Checkout;
