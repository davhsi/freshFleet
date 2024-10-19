import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { QRCodeSVG } from "qrcode.react"; // Import QRCodeSVG

const CheckoutPage = () => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // Store total amount
  const userId = localStorage.getItem("customerId");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPaymentOptions(true);
    }, 5000); // Show the payment options after 5 seconds
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await axios.get(`${API_BASE_URL}/api/cart/${userId}`);
        const cartItems = cartResponse.data?.cart?.items || [];
        const total = cartItems.reduce(
          (acc, item) => acc + (item.quantity * item.pricePerKg || 0),
          0
        );
        setTotalAmount(total);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    fetchCart();
  }, [userId]);

  const handleOrderPlacement = async () => {
    try {
      const cartResponse = await axios.get(`${API_BASE_URL}/api/cart/${userId}`);
      const cartItems = cartResponse.data?.cart?.items || [];
      const orderDetails = {
        customerId: userId,
        items: cartItems,
        totalAmount,
        createdAt: new Date().toISOString(), // Add order timestamp
      };

      const orderResponse = await axios.post(`${API_BASE_URL}/api/orders`, orderDetails);

      if (orderResponse.status === 201) {
        // Clear cart after order is placed
        await axios.delete(`${API_BASE_URL}/api/cart/${userId}/clear`);
        alert("Order placed successfully!");
        window.location.href = "/order-history";
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Error placing order");
    }
  };

  const handleNoPayment = () => {
    window.location.href = "/cart"; // Redirect back to the cart page if payment is not made
  };

  // Generate UPI payment URL
  const upiPaymentUrl = `upi://pay?pa=sujithkumaravel03@okicici&pn=Sujith&am=${totalAmount}&cu=INR`;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-xl mb-4">Paying to <strong>FreshFleet</strong></p>
        <p>Thank you for your purchase! Please complete the payment.</p>

        <div className="mt-4 flex justify-center">
          {/* Display QR Code for the UPI payment */}
          <QRCodeSVG value={upiPaymentUrl} size={256} />
        </div>
        <p className="text-lg mt-4">Scan to Pay ₹{totalAmount.toFixed(2)}</p>

        {showPaymentOptions ? (
          <div className="mt-6 flex justify-center space-x-4">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={handleOrderPlacement}
            >
              Yes, I Have Paid
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={handleNoPayment}
            >
              No, Take Me Back to Cart
            </button>
          </div>
        ) : (
          <p className="mt-6">Processing payment, please wait...</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
