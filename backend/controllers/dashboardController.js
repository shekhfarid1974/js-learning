const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

const mockUsers = [
    { id: 1, name: 'Admin User', role: 'admin', email: 'admin@example.com', password: 'password' },
    { id: 2, name: 'Supervisor User', role: 'supervisor', email: 'supervisor@example.com', password: 'password' },
    { id: 3, name: 'Agent User', role: 'agent', email: 'agent@example.com', password: 'password' }
];

exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token, role: user.role });
};

exports.getMetrics = (req, res) => {
    const metrics = {
        totalSales: 25000,
        dailyActiveUsers: 850,
        conversionRate: 7.6,
        topAgents: [
            { name: "John Doe", sales: 2500 },
            { name: "Jane Smith", sales: 2200 },
        ]
    };
    res.json(metrics);
};