const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    filename: { type: String, required: true }, // Stored filename
    originalName: { type: String, required: true }, // Original uploaded filename
    path: { type: String }, // Full path to file
    fileData: { type: Buffer }, // PDF binary data
    contentType: { type: String }, // MIME type
    isActive: { type: Boolean, default: false },
    downloadCount: { type: Number, default: 0 },
    uploadedAt: { type: Date, default: Date.now }
});

// Ensure only one resume is active (logic handled in controller usually, but index helps)
ResumeSchema.index({ isActive: 1 });

module.exports = mongoose.model('Resume', ResumeSchema);
