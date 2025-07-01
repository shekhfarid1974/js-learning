document.addEventListener('DOMContentLoaded', () => {
    fetchDashboardData();
});

function fetchDashboardData() {
    fetch('http://localhost:3000/api/dashboard-data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateKPIs(data.kpis);
            renderRevenueChart(data.revenueChart);
        })
        .catch(error => {
            console.error('Error fetching dashboard data:', error);
            // You could display an error message to the user on the page
        });
}

function updateKPIs(kpis) {
    const formatCurrency = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    document.getElementById('kpi-revenue').textContent = formatCurrency(kpis.revenue);
    document.getElementById('kpi-profit').textContent = formatCurrency(kpis.profit);
    document.getElementById('kpi-expenses').textContent = formatCurrency(kpis.expenses);
}

function renderRevenueChart(chartData) {
    const ctx = document.getElementById('revenueChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Monthly Revenue',
                data: chartData.data,
                backgroundColor: 'rgba(41, 128, 185, 0.2)',
                borderColor: 'rgba(41, 128, 185, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(41, 128, 185, 1)',
                tension: 0.4 // Makes the line curvy
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => '$' + value / 1000 + 'k'
                    }
                }
            }
        }
    });
}