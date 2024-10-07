import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import AddProductForm from '../components/vendor/AddProductForm';
import VendorProductsTable from '../components/vendor/VendorProductsTable';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantityWeight, setQuantityWeight] = useState('');
    const [pricePerKg, setPricePerKg] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [vendorProducts, setVendorProducts] = useState([]);
    const [vendorName, setVendorName] = useState('');
    const navigate = useNavigate(); // Create navigate function

    useEffect(() => {
        import('../data/data.json').then(data => {
            setProducts([...data.ingredients]);
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

    // Logout handler
    const handleLogout = () => {
        // Clear any authentication tokens or user session
        localStorage.removeItem('authToken'); // Assuming you're using localStorage for auth tokens
        // Redirect user to home page after logging out
        navigate('/'); // Redirect to the home page
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 mx-auto">
                <div className="flex justify-between items-center mb-2"> {/* Flex container for greeting and logout button */}
                    <h1 className="text-3xl font-bold text-gray-800">Hello {vendorName}</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>
                <AddProductForm
                    products={products}
                    selectedProduct={selectedProduct}
                    quantityWeight={quantityWeight}
                    pricePerKg={pricePerKg}
                    handleProductChange={handleProductChange}
                    handleQuantityWeightChange={handleQuantityWeightChange}
                    handlePricePerKgChange={handlePricePerKgChange}
                    handleSubmit={handleSubmit}
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                />
                {/* Pass setVendorProducts to VendorProductsTable */}
                <VendorProductsTable vendorProducts={vendorProducts} setVendorProducts={setVendorProducts} />
            </div>
        </div>
    );
};

export default AddProduct;
