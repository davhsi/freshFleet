import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Import the QRCodeSVG component
import { useNavigate } from 'react-router-dom'; // for navigation
import { FaArrowLeft } from 'react-icons/fa'; // Import the arrow icon from react-icons

const CheckoutPage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTotal = localStorage.getItem('totalAmount');
    if (storedTotal) {
      setTotalAmount(parseFloat(storedTotal));
    }
  }, []);

  const upiLink = `upi://pay?pa=davishoffl@oksbi&pn=FreshFleet&am=${totalAmount}&cu=INR`;

  const handleGoBack = () => {
    navigate(-1); // This navigates to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="relative bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
        
        {/* Back Button with icon */}
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 flex items-center text-gray-700 text-lg font-medium hover:text-gray-900"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h1 className="text-4xl font-bold mb-4 text-gray-800">Scan to Pay</h1>
        <p className="mb-6 text-lg text-gray-600">
          Please scan the QR code below to complete the payment via any UPI app.
        </p>
        
        {/* Use QRCodeSVG for SVG format */}
        <QRCodeSVG value={upiLink} size={250} className="mx-auto" />

        <p className="mt-6 text-2xl font-bold text-green-600">Total: ₹{totalAmount.toFixed(2)}</p>
        <p className="mt-2 text-gray-600">Pay to: <span className="font-semibold">Fresh Fleet</span></p>
        <p className="mt-4 text-sm text-gray-500">
          You can use apps like Google Pay, PhonePe, Paytm, etc.
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
