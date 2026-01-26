const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Resume = require('../models/Resume');
const Project = require('../models/Project');
const adminAuth = require('../middleware/auth');

// Multer Config for PDF Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir); // Ensure directory exists
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // e.g., resume-1634567890.pdf
        cb(null, 'resume-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// =======================
// RESUME ROUTES
// =======================

// POST /api/admin/resume/upload - Admin only
router.post('/admin/resume/upload', adminAuth, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a PDF file.' });
        }

        // Deactivate all previous resumes
        await Resume.updateMany({}, { isActive: false });

        const newResume = new Resume({
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            isActive: true
        });

        await newResume.save();
        res.status(201).json({ message: 'Resume uploaded and activated.', resume: newResume });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/resume/latest - Public
router.get('/resume/latest', async (req, res) => {
    try {
        const resume = await Resume.findOne({ isActive: true });
        if (!resume) {
            return res.status(404).json({ error: 'No active resume found.' });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/resume/download - Public (Stream file)
router.get('/resume/download', async (req, res) => {
    try {
        const resume = await Resume.findOne({ isActive: true });
        if (!resume) {
            return res.status(404).json({ error: 'No active resume found.' });
        }

        // Increment download count
        resume.downloadCount += 1;
        await resume.save();

        const filePath = resume.path; // Use 'path' from new schema
        if (fs.existsSync(filePath)) {
            res.download(filePath, resume.originalName || 'Resume.pdf');
        } else {
            res.status(404).json({ error: 'File not found on server.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =======================
// PROJECT ROUTES
// =======================

// =======================
// PROJECT ROUTES
// =======================

// GET /api/projects/summary - Public (Optimized for listing)
router.get('/projects/summary', async (req, res) => {
    try {
        // Only return fields needed for card display
        const projects = await Project.find()
            .select('title description projectImage technology techStack createdAt')
            .sort({ createdAt: -1 });

        // Transform to ensure consistent field names
        const summaries = projects.map(p => ({
            _id: p._id,
            title: p.title,
            description: p.description,
            projectImage: p.projectImage,
            technology: p.technology || p.techStack || [],
            createdAt: p.createdAt
        }));

        res.json(summaries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/projects/:id - Public (Full details)
router.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/projects - Public (All fields - for backward compatibility)
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// POST /api/admin/projects - Admin only
router.post('/admin/projects', adminAuth, async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/admin/projects/:id - Admin only
router.put('/admin/projects/:id', adminAuth, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/admin/projects/:id - Admin only
router.delete('/admin/projects/:id', adminAuth, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
