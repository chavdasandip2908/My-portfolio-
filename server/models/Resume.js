const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    version: { type: String, required: true }, // e.g., "v1.0"
    fileName: { type: String, required: true },
    filePath: { type: String, required: true }, // Path in server/uploads
    isActive: { type: Boolean, default: false },
    downloadCount: { type: Number, default: 0 },
    uploadedAt: { type: Date, default: Date.now }
});

// Ensure only one resume is active (logic handled in controller usually, but index helps)
ResumeSchema.index({ isActive: 1 });

module.exports = mongoose.model('Resume', ResumeSchema);
