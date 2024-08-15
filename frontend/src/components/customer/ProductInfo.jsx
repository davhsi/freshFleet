import React from 'react';

const ProductInfo = ({ productInfo }) => {
  if (!productInfo) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="flex-1">
      <div className="flex flex-col items-center mb-6">
        <img
          src={`/${productInfo.image}`}
          alt={productInfo.name}
          className="w-1/2 h-auto rounded-lg shadow-lg"
        />
        <h3 className="text-xl font-semibold mt-4">{productInfo.name}</h3>
      </div>
      <div className="border border-gray-300 rounded-lg p-4 shadow-lg">
        <h4 className="text-lg font-semibold mb-2">Nutritional Facts</h4>
        <ul className="list-disc pl-5">
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
  );
};

export default ProductInfo;
