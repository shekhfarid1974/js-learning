// Keep track of chart instances to prevent duplicates
let revenueChartInstance = null;
let expenseChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // Fetch data immediately on load
    fetchDashboardData();

    // Then fetch data every 10 seconds
    setInterval(fetchDashboardData, 10000);
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
            renderExpenseChart(data.expenseChart);
            updateTimestamp(data.lastUpdated);
        })
        .catch(error => {
            console.error('Error fetching dashboard data:', error);
            // You could display an error message to the user on the page
        });
}

function updateTimestamp(isoString) {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (!lastUpdatedElement) {
        return;
    }

    const date = new Date(isoString);
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    lastUpdatedElement.textContent = `Last Updated: ${formattedTime}`;
}

function updateKPIs(kpis) {
    const formatCurrency = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    document.getElementById('kpi-revenue').textContent = formatCurrency(kpis.revenue);
    document.getElementById('kpi-profit').textContent = formatCurrency(kpis.profit);
    document.getElementById('kpi-expenses').textContent = formatCurrency(kpis.expenses);
}

function renderRevenueChart(chartData) {
    if (revenueChartInstance) {
        revenueChartInstance.destroy();
    }

    const ctx = document.getElementById('revenueChart').getContext('2d');

    revenueChartInstance = new Chart(ctx, {
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

function renderExpenseChart(chartData) {
    if (expenseChartInstance) {
        expenseChartInstance.destroy();
    }

    const ctx = document.getElementById('expenseChart').getContext('2d');

    expenseChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Expenses by Category',
                data: chartData.data,
                backgroundColor: [
                    '#e74c3c', // Alizarin
                    '#f39c12', // Orange
                    '#3498db', // Peter River
                    '#9b59b6', // Amethyst
                    '#1abc9c'  // Turquoise
                ],
                borderColor: '#ffffff',
                borderWidth: 3,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return `${label}: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}`;
                        }
                    }
                }
            }
        }
    });
}