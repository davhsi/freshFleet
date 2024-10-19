import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CustomerAuth from "./components/auth/CustomerAuth";
import VendorAuth from "./components/auth/VendorAuth";
import UserRoleSelection from "./components/user/UserRoleSelection";
import AddProduct from "./pages/AddProduct";
import CustomerHome from "./pages/CustomerHome";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import CheckoutPage from "./pages/CheckoutPage";
import RecipeList from "./components/recipe/RecipeList";
import RecipeProducts from "./components/recipe/RecipeProducts";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import RefundPolicy from "./components/footer/RefundPolicy";
import TermsAndConditions from "./components/footer/TermsAndConditions";
import PrivacyPolicy from "./components/footer/PrivacyPolicy";
import AboutBusiness from "./components/footer/AboutBusiness"; 
import ContactInformation from "./components/footer/ContactInformation"; 
import OrderHistoryPage from "./pages/OrderHistoryPage";

const App = () => {
  const [language, setLanguage] = useState("en"); // Default to English

  // Load the language from localStorage when the app loads
  useEffect(() => {
    const storedLanguage = localStorage.getItem("appLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("appLanguage", selectedLanguage);
    // You can apply other necessary actions here if needed
  };

  return (
    <>
      {/* Routes */}
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
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<AboutBusiness />} /> {/* Route for About Business */}
        <Route path="/contact" element={<ContactInformation />} /> {/* Route for Contact Information */}
        <Route path="/order-history" element={<OrderHistoryPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
