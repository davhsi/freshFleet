import React, { useEffect, useState } from 'react';

const CustomerHome = () => {
  const [customerName, setCustomerName] = useState('Guest'); // Set default to 'Guest'

  useEffect(() => {
    // Retrieve the customer name from localStorage
    const storedName = localStorage.getItem('customerName');
    if (storedName && storedName.trim()) {
      setCustomerName(storedName);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">
        Hello {customerName}!
      </h1>
    </div>
  );
};

export default CustomerHome;
