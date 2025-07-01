const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all routes to allow frontend to call the API
app.use(cors());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// A simple API endpoint that sends a greeting
app.get('/api/greeting', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// A new API endpoint for dashboard data
app.get('/api/dashboard-data', (req, res) => {
  const data = {
    kpis: {
      revenue: 542300.75,
      profit: 123800.21,
      expenses: 418500.54,
    },
    revenueChart: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      data: [65000, 59000, 80000, 81000, 56000, 95000],
    }
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});