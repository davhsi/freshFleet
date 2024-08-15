import React from 'react';

const VendorOfferings = ({ sortedProductData, handleAddToCart }) => {
  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-4">Vendor Offerings</h3>
      {sortedProductData.map((product, index) => (
        <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-lg mb-4">
          <h4 className="text-lg font-semibold">Vendor Name: {product.vendorName}</h4>
          <p className="text-xl font-bold text-green-600">Price per Kg: ₹{product.pricePerKg}</p>
          <p className="text-sm text-gray-600">Quantity Weight: {product.totalQuantityWeight} kg</p>
          <p className="text-sm text-gray-600">Date Added: {new Date(product.dateAdded).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600">Vendor Contact: {product.vendorContact}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default VendorOfferings;
