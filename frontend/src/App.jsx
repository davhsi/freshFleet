import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerAuth from './components/CustomerAuth'; 
import VendorAuth from './components/VendorAuth'; 
import UserRoleSelection from './components/UserRoleSelection'; 
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRoleSelection />} />
        <Route path="/auth/customer" element={<CustomerAuth />} />
        <Route path="/auth/vendor" element={<VendorAuth />} />
        <Route path="/add-product" element={<AddProduct />} />  
        
      </Routes>
    </Router>
  );
};

export default App;
