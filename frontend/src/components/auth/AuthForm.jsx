import React from 'react';

const AuthForm = ({ isSignUp, name, email, password, setName, setEmail, setPassword, handleSubmit }) => {
    return (
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
    );
};

export default AuthForm;
