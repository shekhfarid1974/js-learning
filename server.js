// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  const response = await axios(req.body);
  res.send(response.data);
});

app.listen(3000, () => console.log('Proxy running on port 3000'));