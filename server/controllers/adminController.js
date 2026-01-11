const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Resume = require('../models/Resume');
const Contact = require('../models/Contact');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for resume uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../public/resumes');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `resume_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'));
        }
    }
});

// Admin Login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check credentials against env variables
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (username !== adminUsername || password !== adminPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
};

// Verify Token
const verifyToken = (req, res) => {
    res.json({
        success: true,
        message: 'Token is valid',
        admin: req.admin
    });
};

// Get Dashboard Stats
const getStats = async (req, res) => {
    try {
        const totalResumes = await Resume.countDocuments();
        const activeResume = await Resume.findOne({ isActive: true });
        const totalDownloads = await Resume.aggregate([
            { $group: { _id: null, total: { $sum: '$downloadCount' } } }
        ]);
        const totalContacts = await Contact.countDocuments();
        const unreadContacts = await Contact.countDocuments({ isRead: false });
        const recentContacts = await Contact.find()
            .sort({ submittedAt: -1 })
            .limit(5)
            .select('name email submittedAt isRead');

        res.json({
            success: true,
            stats: {
                totalResumes,
                activeResume: activeResume ? activeResume.originalName : 'None',
                totalDownloads: (totalDownloads[0] && totalDownloads[0].total) || 0,
                totalContacts,
                unreadContacts,
                recentContacts
            }
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stats'
        });
    }
};

// Get All Resumes
const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find().sort({ uploadedAt: -1 });
        res.json({
            success: true,
            resumes
        });
    } catch (error) {
        console.error('Get resumes error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resumes'
        });
    }
};

// Upload Resume
const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const resume = new Resume({
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            isActive: false
        });

        await resume.save();

        res.json({
            success: true,
            message: 'Resume uploaded successfully',
            resume
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload resume'
        });
    }
};

// Activate Resume
const activateResume = async (req, res) => {
    try {
        const { id } = req.params;

        // Deactivate all resumes
        await Resume.updateMany({}, { isActive: false });

        // Activate selected resume
        const resume = await Resume.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // Copy to public folder as resume.pdf
        const sourcePath = resume.path;
        const destPath = path.join(__dirname, '../public/resume.pdf');
        fs.copyFileSync(sourcePath, destPath);

        res.json({
            success: true,
            message: 'Resume activated successfully',
            resume
        });
    } catch (error) {
        console.error('Activate error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to activate resume'
        });
    }
};

// Delete Resume
const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;

        const resume = await Resume.findById(id);
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // Delete file
        if (fs.existsSync(resume.path)) {
            fs.unlinkSync(resume.path);
        }

        // Delete from database
        await Resume.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Resume deleted successfully'
        });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete resume'
        });
    }
};

// Get All Contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ submittedAt: -1 });
        res.json({
            success: true,
            contacts
        });
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts'
        });
    }
};

// Mark Contact as Read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Marked as read',
            contact
        });
    } catch (error) {
        console.error('Mark as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark as read'
        });
    }
};

// Delete Contact
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Delete contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact'
        });
    }
};

module.exports = {
    login,
    verifyToken,
    getStats,
    getResumes,
    uploadResume: [upload.single('resume'), uploadResume],
    activateResume,
    deleteResume,
    getContacts,
    markAsRead,
    deleteContact
};
