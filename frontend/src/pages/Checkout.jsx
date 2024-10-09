import React from 'react';
import axios from 'axios';

const Checkout = () => {
  const handleCheckout = async () => {
    try {
      const checkoutData = {
        amount: 10000, // Total amount in paise
        merchantTransactionId: `MT${Date.now()}`, // Unique transaction ID
        merchantUserId: "MUID123", // Unique customer ID
        mobileNumber: "9999999999" // Optional: Customer's mobile number
      };

      const response = await axios.post('http://localhost:5000/api/payment/pay', checkoutData);
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
