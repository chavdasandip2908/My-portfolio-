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
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://sandip-dev.onrender.com',
            "http://localhost:5001",
            process.env.FRONTEND_URL,
            process.env.SERVER_URL,
        ].filter(Boolean);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`CORS Warning: Origin ${origin} is not in allowed list, but allowing for development.`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
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
