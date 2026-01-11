const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    problem: { type: String },
    solution: { type: String },
    techStack: { type: [String], required: true },
    liveUrl: { type: String },
    githubUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['live', 'in-progress', 'archived'],
        default: 'live'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
