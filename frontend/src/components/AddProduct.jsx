import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    netWeight: '',
    price: '',
    nutritionFacts: {
      carbs: '',
      protein: '',
      vitamins: []
    },
    vendorId: ''
  });

  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const vendorId = params.get('vendorId');
    setProduct((prevProduct) => ({ ...prevProduct, vendorId }));
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleVitaminChange = (index, e) => {
    const { name, value } = e.target;
    const vitamins = [...product.nutritionFacts.vitamins];
    vitamins[index] = { ...vitamins[index], [name]: value };
    setProduct({ ...product, nutritionFacts: { ...product.nutritionFacts, vitamins } });
  };

  const addVitamin = () => {
    setProduct({
      ...product,
      nutritionFacts: { ...product.nutritionFacts, vitamins: [...product.nutritionFacts.vitamins, { name: '', quantity: '' }] }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/vendor/add', product);
      setMessage(`Product added successfully by ${response.data.vendorName}`);
      setProduct({
        productName: '',
        description: '',
        netWeight: '',
        price: '',
        nutritionFacts: {
          carbs: '',
          protein: '',
          vitamins: []
        },
        vendorId: product.vendorId
      });
    } catch (error) {
      console.error('Axios error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code outside the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        setMessage(`Failed to add product: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
        setMessage('Failed to add product: No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setMessage(`Failed to add product: ${error.message}`);
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      
      {message && <p className="text-center text-green-500">{message}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          name="productName"
          value={product.productName}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Net Weight</label>
        <input
          type="number"
          name="netWeight"
          value={product.netWeight}
          onChange={handleInputChange}
          placeholder="Net Weight"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Carbs</label>
        <input
          type="number"
          name="carbs"
          value={product.nutritionFacts.carbs}
          onChange={(e) => setProduct({ ...product, nutritionFacts: { ...product.nutritionFacts, carbs: e.target.value } })}
          placeholder="Carbs"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Protein</label>
        <input
          type="number"
          name="protein"
          value={product.nutritionFacts.protein}
          onChange={(e) => setProduct({ ...product, nutritionFacts: { ...product.nutritionFacts, protein: e.target.value } })}
          placeholder="Protein"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Vitamins</label>
        {product.nutritionFacts.vitamins.map((vitamin, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="name"
              value={vitamin.name}
              onChange={(e) => handleVitaminChange(index, e)}
              placeholder="Vitamin Name"
              required
              className="mt-1 p-2 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="number"
              name="quantity"
              value={vitamin.quantity}
              onChange={(e) => handleVitaminChange(index, e)}
              placeholder="Quantity (mg)"
              required
              className="mt-1 p-2 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addVitamin}
          className="mt-2 p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          Add Vitamin
        </button>
      </div>

      <button
        type="submit"
        className="mt-6 w-full p-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:ring-2 focus:ring-green-500"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
