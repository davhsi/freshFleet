import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config"; // Ensure the import path is correct

const VendorProductsTable = ({ vendorProducts, setVendorProducts }) => {
    // Function to handle deletion of a product
    const handleDelete = async (productId) => {
        // Confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return; // Exit if user cancels

        try {
            // Send a delete request to the API
            const response = await axios.delete(`${API_BASE_URL}/api/vendor/products/${productId}`);

            // Check if the deletion was successful
            if (response.status === 200) {
                // Update the vendorProducts state to reflect the deletion
                const updatedProducts = vendorProducts.filter(product => product._id !== productId);
                setVendorProducts(updatedProducts);
                alert('Product deleted successfully!'); // Optional: success message
            } else {
                console.error('Failed to delete product:', response.data);
                alert('Failed to delete product. Please try again later.'); // Error message
            }
        } catch (error) {
            // Handle any errors during the delete operation
            console.error('Error deleting product:', error);
            alert("There was an error deleting the product. Please try again.");
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Products</h2>
            {vendorProducts.length > 0 ? (
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Quantity (kg)</th>
                            <th className="border border-gray-300 p-2">Price per kg (₹)</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendorProducts.map((product) => (
                            <tr key={product._id}>
                                <td className="border border-gray-300 p-2">{product.name}</td>
                                <td className="border border-gray-300 p-2">{product.totalQuantityWeight}</td>
                                <td className="border border-gray-300 p-2">{product.pricePerKg}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => handleDelete(product._id)} // Call handleDelete with the product ID
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600 text-center">No products added yet.</p>
            )}
        </div>
    );
};

export default VendorProductsTable;
