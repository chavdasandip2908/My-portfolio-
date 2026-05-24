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
    const frontendUrl = process.env.FRONTEND_URL_V2 || 'http://localhost:3000';

    // Run every 14 minutes (Render sleeps after 15 minutes of inactivity)
    cron.schedule('*/14 * * * *', async () => {
        try {
            // Ping Backend
            const response = await axios.get(`${serverUrl}/api/keep-alive`);
            console.log(`✓ Backend keep-alive ping successful at ${new Date().toISOString()}`);

            // Ping Frontend
            try {
                await axios.get(frontendUrl);
                console.log(`✓ Frontend keep-alive ping successful at ${new Date().toISOString()}`);
            } catch (frontendError) {
                console.error(`✗ Frontend ping failed: ${frontendError.message}`);
            }

        } catch (error) {
            console.error(`✗ Keep-alive ping failed at ${new Date().toISOString()}`);
            console.error(`  Error: ${error.message}`);
        }
    });

    console.log('✓ Keep-alive cron job started (pinging backend & frontend every 14 minutes)');
};

module.exports = setupKeepAlive;
