import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserRoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/auth/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold mb-10 text-gray-800">Welcome to Fresh Fleet</h2>
      <div className="space-x-4">
        <button 
          onClick={() => handleRoleSelect('customer')} 
          className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md transition duration-200 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Customer
        </button>
        <button 
          onClick={() => handleRoleSelect('vendor')} 
          className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg shadow-md transition duration-200 hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Vendor
        </button>
      </div>
    </div>
  );
};

export default UserRoleSelection;
