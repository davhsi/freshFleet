import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config'; 

const ContactInformation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    try {
      const res = await axios.post(`${API_BASE_URL}/api/contact`, formData);
      setSuccessMessage(res.data.message);
      setErrorMessage('');
      setFormData({ name: '', email: '', message: '' }); // Clear form on success
    } catch (error) {
      console.error('Error details:', error);
      setErrorMessage('Failed to send the message. Please try again later.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Contact Information</h1>
        
        <p className="mb-4">
          We're here to assist you! If you have any questions, feedback, or inquiries about our services, please don't hesitate to reach out.
        </p>
        
        <h2 className="text-xl font-semibold mt-4">Why Reach Out to Us?</h2>
        <p className="mb-4">
          At FreshFleet, we value your input and strive to improve our services continuously. Whether you need assistance with your orders, have suggestions for new products, or want to inquire about our partnerships with local vendors, we're eager to hear from you.
        </p>

        <h2 className="text-xl font-semibold mt-4">Your Feedback Matters</h2>
        <p className="mb-4">
          We believe that communication is key to a successful relationship with our customers. Your feedback helps us enhance our offerings and ensure we meet your expectations.
        </p>

        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="border p-2 rounded"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={isLoading} // Disable button while sending
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        
        <p className="mt-4 text-gray-600">
          Your message is important to us. We aim to respond within 24 hours. Thank you for reaching out!
        </p>

        <h2 className="text-xl font-semibold mt-4">Connect with Us</h2>
        <p className="mb-4">
          Don't forget to follow us on our social media platforms for the latest updates, promotions, and fresh product arrivals!
        </p>
        <p className="mb-4">
          We appreciate your support and look forward to serving you better every day!
        </p>
      </div>
    </div>
  );
};

export default ContactInformation;
