import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerAuth from './components/auth/CustomerAuth'; 
import VendorAuth from './components/auth/VendorAuth'; 
import UserRoleSelection from './components/user/UserRoleSelection'; 
import AddProduct from './pages/AddProduct';
import CustomerHome from './pages/CustomerHome';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

const App = () => {
  const userId = localStorage.getItem('customerId');

  return (
    <Routes>
      <Route path="/" element={<UserRoleSelection />} />
      <Route path="/auth/customer" element={<CustomerAuth />} />
      <Route path="/auth/vendor" element={<VendorAuth />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/home" element={<CustomerHome />} /> 
      <Route path="/product/:name" element={<ProductDetails />} /> 
      <Route path="/cart" element={<Cart userId={userId} />} /> {/* Pass userId */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
