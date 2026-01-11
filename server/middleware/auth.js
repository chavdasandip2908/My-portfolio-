const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized. Invalid or missing token.'
            });
        }

        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.substring(7);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        // Attach user info to request
        req.admin = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized. Invalid or expired token.'
        });
    }
};

module.exports = adminAuth;
