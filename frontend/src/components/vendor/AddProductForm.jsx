import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

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
    const navigate = useNavigate();

    // Logout handler
    const handleLogout = () => {
        // Clear any authentication tokens or user session
        localStorage.removeItem('authToken'); // Assuming you're using localStorage for auth tokens
        // Redirect user to home page after logging out
        navigate('/'); // Redirect to the home page
    };

    return (
        <div className="flex flex-col items-center"> {/* Center align all items */}
            {/* Logout Button moved up */}
            <div className="flex justify-end mb-4 w-full px-4"> {/* Logout button container */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div>

            <div className="bg-blue-50 py-12 w-full"> {/* Set width to full */}
                <div className="container mx-auto px-4">
                    {/* Add Product Form Section */}
                    <div className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                Add Product
                            </button>
                            {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
                            {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;
