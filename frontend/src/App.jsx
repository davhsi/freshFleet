import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerAuth from './components/auth/CustomerAuth'; 
import VendorAuth from './components/auth/VendorAuth'; 
import UserRoleSelection from './components/user/UserRoleSelection'; 
import AddProduct from './pages/AddProduct';
import CustomerHome from './pages/CustomerHome';
import ProductDetails from './pages/ProductDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRoleSelection />} />
        <Route path="/auth/customer" element={<CustomerAuth />} />
        <Route path="/auth/vendor" element={<VendorAuth />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/home" element={<CustomerHome />} /> 
        <Route path="/product/:name" element={<ProductDetails />} />  
        
      </Routes>
    </Router>
  );
};

export default App;
