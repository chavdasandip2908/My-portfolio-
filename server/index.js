require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const setupKeepAlive = require('./utils/keepAlive');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api', apiRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Keep-alive endpoint (for self-ping)
app.get('/api/keep-alive', (req, res) => {
    res.json({
        success: true,
        message: 'Server is alive',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Health Check
app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Start keep-alive cron job (only in production)
    setupKeepAlive();
});
