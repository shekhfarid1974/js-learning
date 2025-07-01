import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AuthForm from './components/AuthForm';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthForm setToken={setToken} setRole={setRole} />} />
                <Route path="/*" element={token ? <Dashboard role={role} /> : <AuthForm setToken={setToken} setRole={setRole} />} />
            </Routes>
        </Router>
    );
}

export default App;