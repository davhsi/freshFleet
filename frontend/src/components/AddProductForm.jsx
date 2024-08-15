import React from 'react';

const AddProductForm = ({
    products,
    selectedProduct,
    quantityWeight,
    pricePerKg,
    handleProductChange,
    handleQuantityWeightChange,
    handlePricePerKgChange,
    handleSubmit,
    successMessage,
    errorMessage
}) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
            <div>
                <label className="block text-gray-600 font-semibold mb-2">Select Product</label>
                <select 
                    value={selectedProduct} 
                    onChange={handleProductChange} 
                    className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a product</option>
                    {products.map((product, index) => (
                        <option key={index} value={product.name}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-gray-600 font-semibold mb-2">Total Quantity Weight (kg)</label>
                <input
                    type="number"
                    value={quantityWeight}
                    onChange={handleQuantityWeightChange}
                    placeholder="Enter weight in kg"
                    className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-600 font-semibold mb-2">Price per kg (₹)</label>
                <input
                    type="number"
                    value={pricePerKg}
                    onChange={handlePricePerKgChange}
                    placeholder="Enter price per kg"
                    className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Product
            </button>
            {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
        </form>
    );
};

export default AddProductForm;
