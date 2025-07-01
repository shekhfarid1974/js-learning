import React from 'react';
import { Line } from 'react-chartjs-2';

function Charts({ metric }) {
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: metric === 'sales' ? 'Sales ($)' : 'Conversion (%)',
            data: metric === 'sales' ? [1200, 1500, 1000, 2000, 1800] : [6, 7, 6.5, 8, 7],
            borderColor: metric === 'sales' ? '#3b82f6' : '#10b981',
            fill: false
        }]
    };

    return <Line data={data} options={{ responsive: true }} />;
}

export default Charts;