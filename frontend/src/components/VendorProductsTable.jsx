import React from 'react';

const VendorProductsTable = ({ vendorProducts }) => {
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
                        </tr>
                    </thead>
                    <tbody>
                        {vendorProducts.map((product, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">{product.name}</td>
                                <td className="border border-gray-300 p-2">{product.totalQuantityWeight}</td>
                                <td className="border border-gray-300 p-2">{product.pricePerKg}</td>
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
