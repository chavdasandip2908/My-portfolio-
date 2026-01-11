const cron = require('node-cron');
const axios = require('axios');

// Self-ping to keep server awake on Render free tier
const setupKeepAlive = () => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') {
        console.log('Keep-alive disabled in development mode');
        return;
    }

    const serverUrl = process.env.SERVER_URL || 'http://localhost:5001';

    // Run every 14 minutes (Render sleeps after 15 minutes of inactivity)
    cron.schedule('*/14 * * * *', async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/keep-alive`);
            console.log(`✓ Keep-alive ping successful at ${new Date().toISOString()}`);
            console.log(`  Response: ${response.data.message}`);
        } catch (error) {
            console.error(`✗ Keep-alive ping failed at ${new Date().toISOString()}`);
            console.error(`  Error: ${error.message}`);
        }
    });

    console.log('✓ Keep-alive cron job started (runs every 14 minutes)');
};

module.exports = setupKeepAlive;
