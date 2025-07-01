import React from 'react';

function MetricsCard({ title, value }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400">{title}</h3>
            <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
    );
}

export default MetricsCard;