import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserRoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/auth/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Select Role</h2>
      <div className="space-x-4">
        <button 
          onClick={() => handleRoleSelect('customer')} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Customer
        </button>
        <button 
          onClick={() => handleRoleSelect('vendor')} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Vendor
        </button>
      </div>
    </div>
  );
};

export default UserRoleSelection;
