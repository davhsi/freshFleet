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

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/cart/${userId}/remove/${productId}`
      );
      if (response.status === 200) {
        const updatedCart = cart.filter(
          (item) => item.product?._id !== productId
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

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/cart/${userId}/update/${productId}`,
        { quantity: newQuantity }
      );
      if (response.status === 200) {
        const updatedCart = cart.map((item) =>
          item.product?._id === productId
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

  const handleIncreaseQuantity = (productId, quantity) => {
    handleUpdateQuantity(productId, quantity + 1);
  };

  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      handleUpdateQuantity(productId, quantity - 1);
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

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>Error loading cart: {error}</div>;

  return (
    <div style={styles.cartContainer}>
      <div style={styles.cartContent}>
        <h1 style={styles.title}>Your Cart</h1>
        {cart.length === 0 ? (
          <div style={styles.emptyCart}>
            <p>Your cart is empty. Add more items!</p>
            <button
              style={styles.button}
              onClick={() => (window.location.href = "/home")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            <div style={styles.total}>Total: ${total.toFixed(2)}</div>

            <div style={styles.cartItems}>
              {cart.map((item) => (
                <div key={item.product?._id} style={styles.cartItem}>
                  <img
                    src={`/${item.product.name
                      ?.toLowerCase()
                      ?.replace(/ /g, "_")}.jpg`}
                    alt={item.product.name}
                    style={styles.itemImage}
                    onError={(e) => {
                      const imgElement = e.target;
                      if (imgElement.src.includes(".jpg")) {
                        imgElement.src = `/${item.product.name
                          ?.toLowerCase()
                          ?.replace(/ /g, "_")}.jpeg`;
                      } else {
                        imgElement.src = "/placeholder.jpg";
                        console.error(
                          `Image not found for product: ${item.product.name}`
                        );
                      }
                    }}
                  />
                  <div style={styles.itemDetails}>
                    <h3 style={styles.itemName}>{item.product.name}</h3>
                    <p>
                      Vendor: {item.vendorId ? item.vendorId.name : "Vendor Name"}
                    </p>
                    <p style={styles.price}>Price per Kg: ${item.pricePerKg}</p>
                    <p style={styles.totalItemPrice}>
                      Total: ${(item.pricePerKg * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div style={styles.quantityControls}>
                    <button
                      style={styles.controlButton}
                      onClick={() =>
                        handleDecreaseQuantity(item.product._id, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      readOnly
                      style={styles.quantityInput}
                    />
                    <button
                      style={styles.controlButton}
                      onClick={() =>
                        handleIncreaseQuantity(item.product._id, item.quantity)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    style={styles.removeButton}
                    onClick={() => handleRemoveItem(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={styles.actionButtons}>
              <button
                style={styles.actionButton}
                onClick={() => (window.location.href = "/home")}
              >
                Continue Shopping
              </button>
              <button style={styles.actionButton} onClick={handleClearCart}>
                Clear Cart
              </button>
              <button
                style={styles.actionButton}
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

// Updated Styles with media queries
const styles = {
  cartContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  cartContent: {
    maxWidth: "800px",
    width: "100%",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  emptyCart: {
    textAlign: "center",
    fontSize: "1.2rem",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%", // Full-width for small screens
  },
  total: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "right",
  },
  cartItems: {
    marginBottom: "20px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    flexWrap: "wrap", // Wrap items on smaller screens
  },
  itemImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "5px",
    marginRight: "10px",
  },
  itemDetails: {
    flex: "1",
    marginLeft: "10px",
  },
  itemName: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  price: {
    marginBottom: "5px",
  },
  totalItemPrice: {
    fontWeight: "bold",
    color: "#007BFF",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px", // Add space between controls and remove button
  },
  controlButton: {
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    textAlign: "center",
    margin: "0 5px", // Add space between - and + buttons
  },
  quantityInput: {
    width: "40px",
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "red",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px", // Add space between quantity controls and remove button
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap", // Make buttons stack on smaller screens
    gap: "10px",
  },
  actionButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: "1 1 30%", // Adjust button width and allow wrapping
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
  },
  error: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "red",
  },
};

export default CartPage;
