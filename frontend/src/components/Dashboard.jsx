import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MetricsCard from './MetricsCard';
import Charts from './Charts';
import Filters from './Filters';
import DataTable from './DataTable';

function Dashboard({ role }) {
    const [darkMode, setDarkMode] = useState(false);
    const [metrics, setMetrics] = useState({});
    const [filter, setFilter] = useState({ date: '', campaign: '', user: '' });

    useEffect(() => {
        const fetchMetrics = async () => {
            const res = await axios.get('http://localhost:5000/api/dashboard/metrics', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMetrics(res.data);
        };
        fetchMetrics();
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <div className="p-6">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <button onClick={toggleDarkMode} className="px-4 py-2 bg-gray-700 text-white rounded">Toggle Theme</button>
                </header>

                <Filters setFilter={setFilter} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                    <MetricsCard title="Total Sales" value={`$${metrics.totalSales || 0}`} />
                    <MetricsCard title="Daily Active Users" value={metrics.dailyActiveUsers || 0} />
                    <MetricsCard title="Conversion Rate" value={`${metrics.conversionRate || 0}%`} />
                    {(role !== 'agent') && (
                        <MetricsCard title="Top Agent" value={metrics.topAgents?.[0]?.name || 'N/A'} />
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Charts metric="sales" />
                    <Charts metric="conversion" />
                </div>

                {(role !== 'agent') && <DataTable />}
            </div>
        </div>
    );
}

export default Dashboard;