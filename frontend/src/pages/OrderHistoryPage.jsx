import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("customerId");

  useEffect(() => {
    if (!userId) {
      setError("User ID is not available");
      setLoading(false);
      return;
    }

    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/orders/${userId}`);
        setOrders(response.data.orders);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // If a 404 error occurs, it means no orders are found for this user
          setOrders([]); // Treat this as no orders found
        } else {
          setError(err.message); // Handle other errors
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  // Function to get the image path based on the product name
  const getProductImage = (productName) => {
    const formattedName = productName.toLowerCase().replace(/\s+/g, "_");
    const jpgPath = `/${formattedName}.jpg`;
    const jpegPath = `/${formattedName}.jpeg`;

    const image = new Image();
    image.src = jpgPath;
    if (image.complete) {
      return jpgPath;
    } else {
      return jpegPath; // fallback to .jpeg if .jpg doesn't exist
    }
  };

  if (loading) return <div className="text-center text-2xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-2xl text-red-500">
        Error loading order history: {error}
      </div>
    );

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-center text-3xl mb-6 font-bold">Order History</h1>
          <div className="text-center">
            <p className="text-lg mb-4">
              Oops! It looks like you haven't placed any orders yet. 
            </p>
            <p className="text-lg mb-4">
              Your shopping cart is feeling a bit lonely. 🛒 How about we change that?
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              onClick={() => (window.location.href = "/home")}
            >
              Let's Go Shopping! 🛍️
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl mb-6 font-bold">Order History</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 p-4 rounded-lg"
            >
              <h3 className="text-xl font-bold">Order ID: {order._id}</h3>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ₹{order.totalAmount.toFixed(2)}</p>

              <div className="mt-4 space-y-2">
                <h4 className="text-lg font-semibold">Items:</h4>
                {order.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex justify-between border-b pb-2"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Display product image */}
                      <img
                        src={getProductImage(item.product.name)}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-bold">{item.product.name}</p>
                        <p>Quantity: {item.quantity} Kg</p>
                        <p>Price per Kg: ₹{item.pricePerKg.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="font-bold text-blue-600">
                      ₹{(item.pricePerKg * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
