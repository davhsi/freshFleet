import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const userId = localStorage.getItem("customerId");

  // Fetch cart data
  useEffect(() => {
    if (!userId) {
      setError("User ID is not available");
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/cart/${userId}`);
        const cartItems = response.data.cart.items || [];
        setCart(cartItems);
        calculateTotal(cartItems);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  // Calculate total price of all items
  const calculateTotal = (items) => {
    const totalCost = items.reduce(
      (acc, item) => acc + item.quantity * item.pricePerKg,
      0
    );
    setTotal(totalCost);
  };

  // Remove a single item from cart
  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/cart/${userId}/remove/${productId}`
      );
      if (response.status === 200) {
        const updatedCart = cart.filter(
          (item) => item.product._id !== productId
        );
        setCart(updatedCart);
        calculateTotal(updatedCart);
        alert("Item removed from cart");
      }
    } catch (err) {
      console.error("Error removing item from cart:", err);
      alert("Error removing item");
    }
  };

  // Update item quantity in cart
  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/cart/${userId}/update/${productId}`,
        { quantity: newQuantity }
      );
      if (response.status === 200) {
        const updatedCart = cart.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
        setCart(updatedCart);
        calculateTotal(updatedCart);
        alert("Item quantity updated");
      }
    } catch (err) {
      console.error("Error updating item quantity:", err);
      alert("Error updating item");
    }
  };

  // Clear all items from the cart
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">Your cart is empty. Add more items!</p>
          <button
            className="bg-blue-500 text-white p-3 rounded-lg mt-4"
            onClick={() => (window.location.href = "/home")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          {/* Display Total Price at the top */}
          <div className="text-2xl font-semibold mb-6 text-right">
            Total: ${total.toFixed(2)}
          </div>

          {/* Cart Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="border border-gray-300 rounded-lg shadow-lg p-4"
              >
                <img
                  src={`/${item.product.name
                    .toLowerCase()
                    .replace(/ /g, "_")}.jpg`}
                  alt={item.product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    const imgElement = e.target;
                    // Try loading the .jpeg version if .jpg fails
                    if (imgElement.src.includes(".jpg")) {
                      imgElement.src = `/${item.product.name
                        .toLowerCase()
                        .replace(/ /g, "_")}.jpeg`;
                    } else {
                      // Fallback to placeholder if .jpeg also fails
                      imgElement.src = "/placeholder.jpg";
                      console.error(
                        `Image not found for product: ${item.product.name}`
                      );
                    }
                  }}
                />

                <h3 className="text-lg font-bold">{item.product.name}</h3>
                <p className="text-gray-600">
                  Vendor: {item.vendorId ? item.vendorId.name : "Vendor Name"}
                </p>
                <p>Price per Kg: ${item.pricePerKg}</p>
                <p className="font-semibold">
                  Total: ${(item.pricePerKg * item.quantity).toFixed(2)}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center mt-2">
                  <label className="mr-2">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.product._id, e.target.value)
                    }
                    className="w-16 border rounded-lg text-center"
                  />
                </div>

                {/* Remove Item Button */}
                <button
                  className="bg-red-500 text-white p-2 mt-4 rounded-lg"
                  onClick={() => handleRemoveItem(item.product._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Clear Cart Button */}
          <div className="mt-6 flex justify-between items-center">
            <button
              className="bg-gray-500 text-white p-3 rounded-lg"
              onClick={() => (window.location.href = "/home")}
            >
              Continue Shopping
            </button>
            <button
              className="bg-yellow-500 text-white p-3 rounded-lg"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button
              className="bg-green-500 text-white p-3 rounded-lg"
              onClick={() => (window.location.href = "/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
