import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const userId = localStorage.getItem("customerId");

  useEffect(() => {
    if (!userId) {
      setError("User ID is not available");
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/cart/${userId}`);
        const cartItems = response.data?.cart?.items || [];
        setCart(cartItems);
        calculateTotal(cartItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const calculateTotal = (items) => {
    const totalCost = items.reduce(
      (acc, item) => acc + (item.quantity * item.pricePerKg || 0),
      0
    );
    setTotal(totalCost);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/cart/${userId}/remove/${itemId}`);
      // Update the cart state directly
      setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
      calculateTotal(cart.filter((item) => item._id !== itemId)); // Recalculate total
      alert("Item removed from cart");
    } catch (err) {
      console.error("Error removing item from cart:", err);
      alert("Error removing item");
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/cart/${userId}/update/${itemId}`,
        { quantity: newQuantity }
      );
      if (response.status === 200) {
        const updatedCart = response.data.cart.items; // Get the updated cart from the response
        setCart(updatedCart); // Update the state with the new cart
        calculateTotal(updatedCart); // Recalculate total
        alert("Item quantity updated");
      }
    } catch (err) {
      console.error("Error updating item quantity:", err);
      alert("Error updating item");
    }
  };

  const handleIncreaseQuantity = (itemId, quantity) => {
    handleUpdateQuantity(itemId, quantity + 1);
  };

  const handleDecreaseQuantity = (itemId, quantity) => {
    if (quantity > 1) {
      handleUpdateQuantity(itemId, quantity - 1);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/cart/${userId}/clear`
      );
      if (response.status === 200) {
        setCart([]);
        setTotal(0);
        alert("Cart cleared");
      }
    } catch (err) {
      console.error("Error clearing cart:", err);
      alert("Error clearing cart");
    }
  };

  if (loading) return <div className="text-center text-2xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-2xl text-red-500">
        Error loading cart: {error}
      </div>
    );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-center text-3xl mb-6 font-bold">Your Cart</h1>
          <div className="text-center">
            <p className="text-lg mb-4">
              Your cart is empty. Please add items to your cart!
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              onClick={() => (window.location.href = "/home")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl mb-6 font-bold">Your Cart</h1>
        <div className="text-right text-xl font-bold mb-4">
          Total: ₹{total.toFixed(2)}
        </div>

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border border-gray-300 p-4 rounded-lg"
            >
              <img
                src={
                  item.product?.name
                    ? `/${item.product.name
                        .toLowerCase()
                        .replace(/ /g, "_")}.jpg`
                    : "/default.jpeg" // Use a default placeholder if the product name is undefined
                }
                alt={item.product?.name || "Product Image"}
                className="w-20 h-20 object-cover rounded"
                onError={(e) => {
                  const imgElement = e.target;
                  imgElement.src = `/${item.product?.name
                    .toLowerCase()
                    .replace(/ /g, "_")}.jpeg`; // Fallback to .jpeg
                  imgElement.onerror = () => {
                    imgElement.src = "/placeholder.jpg"; // Fallback to a generic placeholder if both fail
                    console.error(
                      `Image not found for product: ${
                        item.product?.name || "Unknown"
                      }`
                    );
                  };
                }}
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-bold">
                  {item.product?.name || "Unknown Product"}
                </h3>
                <p>
                  Vendor: {item.vendorId ? item.vendorId.name : "Vendor Name"}
                </p>
                <p className="text-gray-600">
                  Price per Kg: ₹{item.pricePerKg}
                </p>
                <p className="font-bold text-blue-600">
                  Total: ₹{(item.pricePerKg * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-gray-200 p-2 rounded"
                  onClick={() =>
                    handleDecreaseQuantity(item._id, item.quantity)
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  readOnly
                  className="mx-2 w-12 text-center border border-gray-300 rounded"
                />
                <button
                  className="bg-gray-200 p-2 rounded"
                  onClick={() =>
                    handleIncreaseQuantity(item._id, item.quantity)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="ml-4 bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => handleRemoveItem(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => (window.location.href = "/home")}
          >
            Continue Shopping
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => {
              localStorage.setItem("totalAmount", total.toFixed(2));

              window.location.href = "/checkout";
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
