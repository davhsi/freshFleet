import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/tailwind.css";
import { API_BASE_URL, CDN_BASE_URL } from "../config";
import AuthForm from "../components/auth/AuthForm";
import SwitchAuthMode from "../components/auth/SwitchAuthMode";
import Footer from "../components/footer/Footer";

const Auth = ({ role }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Clear success and error messages when switching modes
  useEffect(() => {
    setSuccessMessage("");
    setErrorMessage("");
  }, [isSignUp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const url = `${API_BASE_URL}/api/${role}/${
        isSignUp ? "signup" : "signin"
      }`;
      const data = isSignUp ? { name, email, password } : { email, password };
      const response = await axios.post(url, data);

      const retrievedName = response.data[`${role}Name`];
      const id = response.data[`${role}Id`];

      // Store user data in local storage
      localStorage.setItem(`${role}Name`, retrievedName);
      localStorage.setItem(`${role}Id`, id);

      setSuccessMessage(
        `${role.charAt(0).toUpperCase() + role.slice(1)} ${
          isSignUp ? "sign up" : "sign in"
        } successful! Redirecting to your dashboard.`
      );

      setTimeout(() => {
        if (role === "vendor") {
          navigate("/add-product");
        } else if (role === "customer") {
          navigate("/home");
        }
      }, 2000);
    } catch (error) {
      console.error("Error during sign-up/sign-in:", error);

      // Handle backend validation errors
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.message.includes("Incorrect password")) {
          setErrorMessage("Password is incorrect. Please try again.");
        } else if (errorData.message.includes("Email does not exist")) {
          setErrorMessage("Email does not exist. Please sign up.");
        } else {
          setErrorMessage(errorData.message);
        }
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Main Content */}
      <div
        className="flex-grow flex justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${CDN_BASE_URL}/products/loginPage.jpeg)`,
        }}
      >
        {/* Form positioned in the right-center */}
        <div className="w-full max-w-md p-8 m-8 space-y-6 bg-white rounded shadow-md absolute right-0 top-1/2 transform -translate-y-1/2">
          <h2 className="text-2xl font-bold text-center text-green-600">
            {isSignUp
              ? `Sign Up as ${role === "vendor" ? "Vendor" : "Customer"}`
              : `Sign In as ${role === "vendor" ? "Vendor" : "Customer"}`}
          </h2>

          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <AuthForm
            isSignUp={isSignUp}
            name={name}
            email={email}
            password={password}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />

          <SwitchAuthMode isSignUp={isSignUp} toggleAuthMode={toggleAuthMode} />

          {!isSignUp && (
            <Link
              to="/forgot-password"
              className="w-full mt-4 text-sm font-bold text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          )}
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Auth;
