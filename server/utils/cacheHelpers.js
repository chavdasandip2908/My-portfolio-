const Resume = require('../models/Resume');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const cache = require('./cache');

/**
 * Proactively update the resume caches
 */
const updateResumeCache = async () => {
    const resumes = await Resume.find().sort({ uploadedAt: -1 });
    const latestResume = await Resume.findOne({ isActive: true });

    cache.set('admin_resumes', resumes);
    if (latestResume) {
        cache.set('latest_resume', latestResume);
    } else {
        cache.del('latest_resume');
    }
};

/**
 * Proactively update the project caches
 * @param {string} [specificProjectId] - If provided, also update the cache for this specific project
 */
const updateProjectCache = async (specificProjectId = null) => {
    const allProjects = await Project.find().sort({ createdAt: -1 });

    const summaries = allProjects.map(p => ({
        _id: p._id,
        title: p.title,
        description: p.description,
        projectImage: p.projectImage,
        technology: p.technology || p.techStack || [],
        createdAt: p.createdAt
    }));

    cache.set('all_projects', allProjects);
    cache.set('projects_summary', summaries);
    cache.set('admin_projects', allProjects);

    if (specificProjectId) {
        const project = await Project.findById(specificProjectId);
        if (project) {
            cache.set(`project_${specificProjectId}`, project);
        } else {
            cache.del(`project_${specificProjectId}`);
        }
    }
};

/**
 * Proactively update the contact caches
 */
const updateContactCache = async () => {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    cache.set('admin_contacts', contacts);
};

/**
 * Proactively update the dashboard stats cache
 */
const updateStatsCache = async () => {
    const totalResumes = await Resume.countDocuments();
    const activeResume = await Resume.findOne({ isActive: true });
    const totalDownloads = await Resume.aggregate([
        { $group: { _id: null, total: { $sum: '$downloadCount' } } }
    ]);
    const totalContacts = await Contact.countDocuments();
    const unreadContacts = await Contact.countDocuments({ isRead: false });
    const totalProjects = await Project.countDocuments();
    const recentContacts = await Contact.find()
        .sort({ submittedAt: -1 })
        .limit(5)
        .select('name email submittedAt isRead');

    const stats = {
        totalResumes,
        activeResume: activeResume ? activeResume.originalName : 'None',
        totalDownloads: (totalDownloads[0] && totalDownloads[0].total) || 0,
        totalContacts,
        unreadContacts,
        totalProjects,
        recentContacts
    };

    cache.set('admin_stats', stats);
};

module.exports = {
    updateResumeCache,
    updateProjectCache,
    updateContactCache,
    updateStatsCache
};
