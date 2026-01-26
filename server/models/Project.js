const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    // Required fields
    title: { type: String, required: true },
    description: { type: String, required: true },
    projectImage: { type: String, required: true }, // base64 string
    rolesResponsibility: { type: String, required: true },
    technology: { type: [String], required: true },

    // Optional fields
    duration: { type: String },
    sourceCodeLink: { type: String },
    liveViewLink: { type: String },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
