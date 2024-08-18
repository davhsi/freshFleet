import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-lg mb-4">
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-600">Vendor: {item.vendorName}</p>
              <p className="text-sm text-gray-600">Price: ₹{item.pricePerKg}</p>
              <button
                onClick={() => removeFromCart(index)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Clear Cart
          </button>
          <button
            className="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
