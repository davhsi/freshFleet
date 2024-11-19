import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import QuantityModal from "./QuantityModal";

const VendorOfferings = ({ sortedProductData, userId }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productReviews, setProductReviews] = useState({}); // Store reviews for each product
  const [loadingReviews, setLoadingReviews] = useState({});
  const [errorReviews, setErrorReviews] = useState({});

  // Fetch reviews for a product
  const fetchReviewsForProduct = async (productId) => {
    setLoadingReviews((prev) => ({ ...prev, [productId]: true }));
    setErrorReviews((prev) => ({ ...prev, [productId]: null }));

    try {
      console.log(`Fetching reviews for product ID: ${productId}`);
      const response = await axios.get(`${API_BASE_URL}/api/reviews/${productId}`);
      console.log(`Reviews fetched for product ${productId}:`, response.data.reviews);
      setProductReviews((prev) => ({ ...prev, [productId]: response.data.reviews || [] }));
    } catch (error) {
      console.error(`Error fetching reviews for product ${productId}:`, error.message);
      setErrorReviews((prev) => ({ ...prev, [productId]: error.message }));
      setProductReviews((prev) => ({ ...prev, [productId]: [] }));
    } finally {
      setLoadingReviews((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Fetch reviews for all products when the component mounts
  useEffect(() => {
    sortedProductData.forEach((product) => {
      fetchReviewsForProduct(product._id);
    });
  }, [sortedProductData]);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = async (quantity) => {
    try {
      const cartItem = {
        userId,
        product: {
          _id: selectedProduct._id,
          name: selectedProduct.name,
          pricePerKg: selectedProduct.pricePerKg,
          quantity,
        },
      };

      console.log("Adding to cart:", cartItem);

      const response = await axios.post(`${API_BASE_URL}/api/cart/add`, cartItem);

      if (response.status === 200) {
        alert("Product added to cart successfully!");
      } else {
        alert("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart", error.message);
      alert("Error adding product to cart");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Vendor Offerings</h3>
      <ul>
        {sortedProductData.map((product) => (
          <li
            key={product._id}
            className="flex flex-col justify-between items-start mb-6 p-4 border rounded shadow-sm"
          >
            <div className="flex justify-between w-full items-center">
              <div>
                <h4 className="text-xl font-bold">{product.name}</h4>
                <p className="text-gray-700">
                  ₹{product.pricePerKg} per kg
                </p>
                <p className="text-sm text-gray-500">
                  Vendor: {product.vendorName || "Unknown Vendor"}
                  <br />
                  Contact: {product.vendorContact || "No Contact"}
                </p>
              </div>
              <button
                onClick={() => handleAddToCartClick(product)}
                className="bg-blue-500 text-white px-3 py-1 rounded transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg"
              >
                Add to Cart
              </button>
            </div>

            {/* Reviews Section */}
            <div className="mt-4">
              <h5 className="text-md font-semibold">Reviews & Ratings:</h5>
              {loadingReviews[product._id] ? (
                <p className="text-gray-500">Loading reviews...</p>
              ) : errorReviews[product._id] ? (
                <p className="text-red-500">Error loading reviews: {errorReviews[product._id]}</p>
              ) : productReviews[product._id]?.length > 0 ? (
                <ul className="space-y-2 mt-2">
                  {productReviews[product._id].map((review) => (
                    <li key={review._id} className="border-b pb-2">
                      <p className="font-bold">{review.userId?.name || "Anonymous"}:</p>
                      <p className="text-yellow-500">
                        Rating: {"⭐".repeat(review.rating)}
                      </p>
                      <p>{review.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No reviews have been added yet.</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <QuantityModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default VendorOfferings;
