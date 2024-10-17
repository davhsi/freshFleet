import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post(`${API_BASE_URL}/api/customer/forget-password`, { email });
      setSuccessMessage('Reset password email sent! Please check your inbox.');

      // Show a pop-up for success
      alert('Mail sent successfully! You will be redirected to the sign-in page.');

      // Redirect to sign-in page after 3 seconds
      setTimeout(() => {
        navigate('/auth/customer');
      }, 3000);
    } catch (error) {
      setErrorMessage('Failed to send reset password email.');

      // Show a pop-up for failure
      alert('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundImage: `url('/loginPage.jpeg')`, backgroundSize: 'cover' }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
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
            className={`w-full px-4 py-2 font-bold text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        {loading && (
          <p className="text-gray-600 text-sm text-center mt-4">Sending email... Please wait.</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
