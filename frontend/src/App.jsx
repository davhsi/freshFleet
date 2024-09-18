import { Routes, Route } from 'react-router-dom';
import CustomerAuth from './components/auth/CustomerAuth';
import VendorAuth from './components/auth/VendorAuth';
import UserRoleSelection from './components/user/UserRoleSelection';
import AddProduct from './pages/AddProduct';
import CustomerHome from './pages/CustomerHome';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import PaymentSuccess from './pages/PaymentSuccess';
import Checkout from './pages/Checkout';
import RecipeList from './components/RecipeList';
import RecipeProducts from './components/RecipeProducts';

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
      <Route path="/recipes" element={<RecipeList />} />
      <Route path="/recipe-products/:name" element={<RecipeProducts />} />  
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
