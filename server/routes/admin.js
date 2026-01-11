const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    login,
    verifyToken,
    getStats,
    getResumes,
    uploadResume,
    activateResume,
    deleteResume,
    getContacts,
    markAsRead,
    deleteContact
} = require('../controllers/adminController');

// Public routes
router.post('/login', login);

// Protected routes (require authentication)
router.use(authMiddleware); // All routes below require auth

router.get('/verify', verifyToken);
router.get('/stats', getStats);

// Resume routes
router.get('/resumes', getResumes);
router.post('/resumes/upload', uploadResume);
router.put('/resumes/:id/activate', activateResume);
router.delete('/resumes/:id', deleteResume);

// Contact routes
router.get('/contacts', getContacts);
router.put('/contacts/:id/read', markAsRead);
router.delete('/contacts/:id', deleteContact);

module.exports = router;
