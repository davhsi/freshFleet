import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AddProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantityWeight, setQuantityWeight] = useState('');
    const [pricePerKg, setPricePerKg] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [vendorProducts, setVendorProducts] = useState([]);
    const [vendorName, setVendorName] = useState('');

    useEffect(() => {
        import('../data/data.json').then(data => {
            setProducts([...data.fruits, ...data.vegetables]);
        });

        fetchVendorProducts();
        const name = localStorage.getItem('vendorName');
        if (name) {
            setVendorName(name);
        }
    }, []);

    const fetchVendorProducts = async () => {
        const vendorId = localStorage.getItem('vendorId');
        if (vendorId) {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products/vendor/${vendorId}`);
                setVendorProducts(response.data);
            } catch (error) {
                setErrorMessage('Failed to load products. Please try again.');
            }
        }
    };

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handleQuantityWeightChange = (e) => {
        setQuantityWeight(e.target.value);
    };

    const handlePricePerKgChange = (e) => {
        setPricePerKg(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const vendorId = localStorage.getItem('vendorId');

        if (!vendorId) {
            setErrorMessage('Vendor ID not found. Please log in again.');
            return;
        }

        try {
            const productData = {
                name: selectedProduct,
                totalQuantityWeight: quantityWeight,
                pricePerKg,
                vendorId
            };

            await axios.post(`${API_BASE_URL}/api/products`, productData);
            setSuccessMessage('Product added successfully!');
            setErrorMessage('');
            fetchVendorProducts(); // Refresh vendor products list
        } catch (error) {
            setErrorMessage('Failed to add product. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Hello {vendorName}</h1>
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
                        <label className="block text-gray-600 font-semibold mb-2">Price per kg ($)</label>
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

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Products</h2>
                    {vendorProducts.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2">Name</th>
                                    <th className="border border-gray-300 p-2">Quantity (kg)</th>
                                    <th className="border border-gray-300 p-2">Price per kg ($)</th>
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
            </div>
        </div>
    );
};

export default AddProduct;
