const ProductInfo = ({ productInfo }) => {
  if (!productInfo) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  return (
    <div className="flex-1">
      {/* Product Image and Name */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-80 h-80 overflow-hidden rounded-lg shadow-lg bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-400"> {/* Increased image size */}
          <img
            src={`/${productInfo.image}`}
            alt={productInfo.name}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="text-3xl font-bold mt-6 text-indigo-700">{productInfo.name}</h3> {/* Increased font size */}
      </div>

      {/* Nutritional Facts */}
      <div className="border border-indigo-300 rounded-lg p-6 shadow-lg bg-indigo-50"> {/* Increased padding */}
        <h4 className="text-xl font-bold mb-4 text-indigo-800">Nutritional Facts</h4> {/* Increased font size */}
        <ul className="list-disc pl-5 text-lg text-gray-700"> {/* Increased font size */}
          <li><strong>Calories:</strong> <span className="text-indigo-600">{productInfo.calories} kcal</span></li>
          <li><strong>Carbohydrates:</strong> <span className="text-indigo-600">{productInfo.carbohydrates} g</span></li>
          <li><strong>Protein:</strong> <span className="text-indigo-600">{productInfo.protein} g</span></li>
          <li><strong>Fibers:</strong> <span className="text-indigo-600">{productInfo.fibers} g</span></li>
          {Object.entries(productInfo.vitamins).map(([vitamin, quantity]) => (
            <li key={vitamin}><strong>{vitamin}:</strong> <span className="text-indigo-600">{quantity}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;

