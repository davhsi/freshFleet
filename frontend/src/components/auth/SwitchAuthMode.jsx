// components/SwitchAuthMode.js
import React from 'react';

const SwitchAuthMode = ({ isSignUp, toggleAuthMode }) => {
    return (
        <button
            onClick={toggleAuthMode}
            className="w-full mt-4 text-sm font-bold text-green-600 hover:underline"
        >
            Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
    );
};

export default SwitchAuthMode;
