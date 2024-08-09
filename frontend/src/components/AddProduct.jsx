import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [netWeight, setNetWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fiber, setFiber] = useState('');
  const [protein, setProtein] = useState('');
  const [vitamins, setVitamins] = useState([{ name: '', quantity: '' }]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVitaminChange = (index, field, value) => {
    const updatedVitamins = [...vitamins];
    updatedVitamins[index][field] = value;
    setVitamins(updatedVitamins);
  };

  const addVitamin = () => {
    setVitamins([...vitamins, { name: '', quantity: '' }]);
  };

  const removeVitamin = (index) => {
    const updatedVitamins = vitamins.filter((_, i) => i !== index);
    setVitamins(updatedVitamins);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve vendorId from localStorage
    const vendorId = localStorage.getItem('vendorId');
    
    // Ensure vendorId exists before making the API request
    if (!vendorId) {
      setErrorMessage('Vendor ID not found. Please log in again.');
      return;
    }
  
    try {
      const productData = {
        productName,
        description,
        netWeight,
        nutrients: {
          calories,
          carbs,
          fiber,
          protein,
          vitamins,
        },
        vendorId,  // Add vendorId to the product data
      };
  
      const response = await axios.post('http://localhost:5000/api/products', productData);
      setSuccessMessage('Product added successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to add product. Please try again.');
      setSuccessMessage('');
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full"
            required
          ></textarea>
        </div>
        <div>
          <label className="block">Net Weight (kg):</label>
          <input
            type="number"
            value={netWeight}
            onChange={(e) => setNetWeight(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Calories per kg:</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Carbs (g) per kg:</label>
          <input
            type="number"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Fiber (g) per kg:</label>
          <input
            type="number"
            value={fiber}
            onChange={(e) => setFiber(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Protein (g) per kg:</label>
          <input
            type="number"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Vitamins:</label>
          {vitamins.map((vitamin, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <select
                value={vitamin.name}
                onChange={(e) => handleVitaminChange(index, 'name', e.target.value)}
                className="border rounded p-2"
                required
              >
                <option value="" disabled>Select Vitamin</option>
                <option value="A">Vitamin A</option>
                <option value="B">Vitamin B</option>
                <option value="C">Vitamin C</option>
                <option value="D">Vitamin D</option>
                <option value="E">Vitamin E</option>
              </select>
              <input
                type="number"
                placeholder="Quantity (mg)"
                value={vitamin.quantity}
                onChange={(e) => handleVitaminChange(index, 'quantity', e.target.value)}
                className="border rounded p-2"
                required
              />
              <button type="button" onClick={() => removeVitamin(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addVitamin} className="text-blue-500">Add Another Vitamin</button>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
