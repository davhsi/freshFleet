import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/tailwind.css';

const Auth = ({ role }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setSuccessMessage('');
    setErrorMessage('');
  }, [isSignUp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignUp ? 'signup' : 'signin';
      const response = await axios.post(`http://localhost:5000/api/${role}/${endpoint}`, {
        name,
        email,
        password,
      });

      setSuccessMessage(isSignUp ? 'Sign up successful!' : 'Sign in successful!');
      setErrorMessage('');

      if (!isSignUp) {
        const vendorId = response.data.vendorId;
        localStorage.setItem('vendorId', vendorId);

        setTimeout(() => {
          navigate('/add-product');
        }, 2000);
      } else {
        setTimeout(() => {
          setIsSignUp(false);
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (isSignUp && errorData.message.includes('Email already exists')) {
          setErrorMessage('Email already exists. Please sign in.');
        } else if (!isSignUp && errorData.message.includes('Incorrect password')) {
          setErrorMessage('Password is incorrect. Please try again.');
        } else if (!isSignUp && errorData.message.includes('User not found')) {
          setErrorMessage('Email does not exist. Please sign up.');
        } else {
          setErrorMessage(errorData.message);
        }
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex items-center justify-end min-h-screen bg-cover bg-center" 
         style={{ backgroundImage: "url('/loginPage.jpeg')" }}>
      <div className="w-full max-w-md p-8 m-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-left text-green-700">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-green-800">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-green-800">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-green-800">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-4 text-sm font-bold text-green-600 hover:underline"
        >
          Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
