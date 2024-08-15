import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/tailwind.css';
import { API_BASE_URL } from '../config';
import AuthForm from '../components/auth/AuthForm';
import SwitchAuthMode from '../components/auth/SwitchAuthMode';

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
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const url = `${API_BASE_URL}/api/${role}/${isSignUp ? 'signup' : 'signin'}`;
            const data = isSignUp ? { name, email, password } : { email, password };
            const response = await axios.post(url, data);

            const retrievedName = response.data[`${role}Name`];
            const id = response.data[`${role}Id`];

            localStorage.setItem(`${role}Name`, retrievedName);
            localStorage.setItem(`${role}Id`, id);

            setSuccessMessage(`${role.charAt(0).toUpperCase() + role.slice(1)} ${isSignUp ? 'sign up' : 'sign in'} successful! Redirecting to your dashboard.`);
            
            setTimeout(() => {
                if (role === 'vendor') {
                    navigate('/add-product');
                } else if (role === 'customer') {
                    navigate('/home');
                }
            }, 2000);
        } catch (error) {
            console.error('Error during sign-up/sign-in:', error);

            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.message.includes('Incorrect password')) {
                    setErrorMessage('Password is incorrect. Please try again.');
                } else if (errorData.message.includes('Email does not exist')) {
                    setErrorMessage('Email does not exist. Please sign up.');
                } else {
                    setErrorMessage(errorData.message);
                }
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="flex items-center justify-end min-h-screen bg-cover bg-center" 
             style={{ backgroundImage: `url('/loginPage.jpeg')`}}>
            <div className="w-full max-w-md p-8 m-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-left text-green-700">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
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
                <SwitchAuthMode 
                    isSignUp={isSignUp}
                    toggleAuthMode={toggleAuthMode}
                />
            </div>
        </div>
    );
};

export default Auth;
