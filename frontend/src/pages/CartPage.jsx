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

  // Handle quantity increase
  const handleIncreaseQuantity = (productId, quantity) => {
    handleUpdateQuantity(productId, quantity + 1);
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      handleUpdateQuantity(productId, quantity - 1);
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
    <div className="cart-container">
      <div className="p-6 w-400">
        <h1 className="text-4xl font-bold mb-6 text-center">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-2xl">Your cart is empty. Add more items!</p>
            <button
              className="bg-blue-500 text-white p-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-200"
              onClick={() => (window.location.href = "/home")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-3xl font-semibold mb-6 text-right">
              Total: ${total.toFixed(2)}
            </div>
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="border border-gray-700 rounded-lg shadow-lg p-6 mb-8"
                >
                  <div className="flex">
                    <img
                      src={`/${item.product.name.toLowerCase().replace(/ /g, "_")}.jpg`}
                      alt={item.product.name}
                      className="w-80 h-64 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        const imgElement = e.target;
                        if (imgElement.src.includes(".jpg")) {
                          imgElement.src = `/${item.product.name.toLowerCase().replace(/ /g, "_")}.jpeg`;
                        } else {
                          imgElement.src = "/placeholder.jpg";
                          console.error(`Image not found for product: ${item.product.name}`);
                        }
                      }}
                    />
                    <div className="ml-8">
                      <h3 className="text-xl font-bold">{item.product.name}</h3>
                      <p className="text-gray-600">
                        Vendor: {item.vendorId ? item.vendorId.name : "Vendor Name"}
                      </p>
                      <p className="text-lg">Price per Kg: ${item.pricePerKg}</p>
                      <p className="font-semibold text-lg">
                        Total: ${(item.pricePerKg * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          className="bg-gray-300 text-black p-2 rounded-lg mr-2 hover:bg-gray-400 transition duration-200"
                          onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          readOnly
                          className="w-16 border rounded-lg text-center text-lg"
                        />
                        <button
                          className="bg-gray-300 text-black p-2 rounded-lg ml-2 hover:bg-gray-400 transition duration-200"
                          onClick={() => handleIncreaseQuantity(item.product._id, item.quantity)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="bg-red-500 text-white p-3 mt-4 rounded-lg hover:bg-red-600 transition duration-200"
                        onClick={() => handleRemoveItem(item.product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="button-container">
              <button
                className="bg-gray-500 text-white p-4 rounded-lg mx-2 text-lg hover:bg-gray-600 transition duration-500"
                onClick={() => (window.location.href = "/home")}
              >
                Continue Shopping
              </button>
              <button
                className="bg-yellow-500 text-white p-4 rounded-lg mx-2 text-lg hover:bg-yellow-600 transition duration-500"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <button
                className="bg-green-500 text-white p-4 rounded-lg mx-2 text-lg hover:bg-green-600 transition duration-500"
                onClick={() => (window.location.href = "/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;