import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from './../../config';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // Added loading state
    const { token } = useParams();  // Grab token from URL params
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setIsLoading(true);  // Start loading
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post(`${API_BASE_URL}/api/customer/reset-password`, {
                token,  // Include the token in the request body
                newPassword
            });

            setSuccessMessage('Password reset successful! You will be redirected to the login page in a few seconds.');
            setTimeout(() => {
                alert('Mail sent');  // Show pop-up when successful
                navigate('/auth/customer'); // Redirect to login page
            }, 3000); // Redirect after 3 seconds
        } catch (error) {
            console.error('Error resetting password:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Failed to reset password');
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);  // Stop loading
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
             style={{ backgroundImage: `url('/loginPage.jpeg')` }}>
            <div className="w-full max-w-md p-6 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-green-700">Reset Password</h2>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                        <label className="block text-green-800">New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                            required
                            disabled={isLoading}  // Disable input while loading
                        />
                    </div>
                    <div>
                        <label className="block text-green-800">Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                            required
                            disabled={isLoading}  // Disable input while loading
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md ${isLoading && 'opacity-50 cursor-not-allowed'}`}
                        disabled={isLoading}  // Disable button while loading
                    >
                        {isLoading ? 'Processing...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
