import React from 'react';

const ProductInfo = ({ productInfo }) => {
  if (!productInfo) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={`/${productInfo.image}`} // Adjust the image path
          alt={productInfo.name}
          className="w-48 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{productInfo.name}</h2>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Price:</strong> ${productInfo.pricePerKg} per kg
          </p>
          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-xl font-semibold mb-2">Nutritional Facts</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Calories:</strong> {productInfo.calories} kcal</li>
              <li><strong>Carbohydrates:</strong> {productInfo.carbohydrates} g</li>
              <li><strong>Protein:</strong> {productInfo.protein} g</li>
              <li><strong>Fibers:</strong> {productInfo.fibers} g</li>
              {Object.entries(productInfo.vitamins).map(([vitamin, quantity]) => (
                <li key={vitamin}><strong>{vitamin}:</strong> {quantity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
