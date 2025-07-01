import React, { useState } from 'react';
import axios from 'axios';

function AuthForm({ setToken, setRole }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/dashboard/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            setToken(res.data.token);
            setRole(res.data.role);
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Login</h2>
                <input className="w-full mb-3 p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="Email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="w-full mb-3 p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </div>
        </div>
    );
}

export default AuthForm;