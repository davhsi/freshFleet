import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("customerId");
  const [reviewData, setReviewData] = useState({}); // To manage review input

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
          setOrders([]);
        } else {
          setError(err.message);
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
      return jpegPath;
    }
  };

  // Function to handle adding/updating reviews
  const handleReviewSubmit = async (productId, orderId) => {
    const { rating, comment } = reviewData[productId] || {};
    if (!rating || !comment) {
      alert("Please provide both a rating and a comment!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/reviews`, {
        userId,
        productId,
        orderId,
        rating,
        comment,
      });
      alert("Review submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  };

  // Function to handle review input changes
  const handleReviewChange = (productId, field, value) => {
    setReviewData((prevData) => ({
      ...prevData,
      [productId]: {
        ...prevData[productId],
        [field]: value,
      },
    }));
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
                    className="flex flex-col border-b pb-4 mb-4"
                  >
                    <div className="flex items-center space-x-4">
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
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Leave a Review:</h4>
                      <input
                        type="number"
                        max="5"
                        min="1"
                        placeholder="Rating (1-5)"
                        className="border p-2 rounded w-full mb-2"
                        value={reviewData[item.product._id]?.rating || ""}
                        onChange={(e) =>
                          handleReviewChange(item.product._id, "rating", e.target.value)
                        }
                      />
                      <textarea
                        placeholder="Write your review"
                        className="border p-2 rounded w-full mb-2"
                        value={reviewData[item.product._id]?.comment || ""}
                        onChange={(e) =>
                          handleReviewChange(item.product._id, "comment", e.target.value)
                        }
                      />
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded"
                        onClick={() => handleReviewSubmit(item.product._id, order._id)}
                      >
                        Submit Review
                      </button>
                    </div>
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
