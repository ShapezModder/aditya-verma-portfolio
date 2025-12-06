require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const contactApi = require('./contact/api/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// API Routes
app.post('/api/contact', contactApi);

// Fallback to index.html for SPA rules (optional, mainly for the root)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Email Service Configured: ${process.env.EMAIL_PASS ? 'YES' : 'NO'}`);
});
