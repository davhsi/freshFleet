import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/customer/forget-password`, { email });
      setSuccessMessage('Reset password email sent! Please check your inbox.');
    } catch (error) {
      setErrorMessage('Failed to send reset password email.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundImage: `url('/loginPage.jpeg')`, backgroundSize: 'cover' }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-green-700">Forgot Password</h2>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <label className="block text-green-800">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-red-600"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
