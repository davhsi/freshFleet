import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerAuth from './components/CustomerAuth'; 
import VendorAuth from './components/VendorAuth'; 
import UserRoleSelection from './components/UserRoleSelection'; 
import AddProduct from './components/AddProduct'; // Import the Add Product component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRoleSelection />} />
        <Route path="/auth/customer" element={<CustomerAuth />} />
        <Route path="/auth/vendor" element={<VendorAuth />} />
        <Route path="/vendor/add-product" element={<AddProduct />} /> {/* Add the Add Product route */}
      </Routes>
    </Router>
  );
};

export default App;
