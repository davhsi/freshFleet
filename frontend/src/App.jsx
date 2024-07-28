import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerAuth from './components/CustomerAuth'; 
import VendorAuth from './components/VendorAuth'; 
import UserRoleSelection from './components/UserRoleSelection'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRoleSelection />} />
        <Route path="/auth/customer" element={<CustomerAuth />} />
        <Route path="/auth/vendor" element={<VendorAuth />} />
      </Routes>
    </Router>
  );
};

export default App;