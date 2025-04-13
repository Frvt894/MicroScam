const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/api/ip', async (req, res) => {
    try {
        const response = await axios.get('https://ipwho.is/?lang=en');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
