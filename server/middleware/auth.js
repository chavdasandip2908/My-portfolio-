const adminAuth = (req, res, next) => {
    const adminKey = req.header('x-admin-key');

    if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ error: 'Unauthorized. Invalid or missing Admin Key.' });
    }

    next();
};

module.exports = adminAuth;
