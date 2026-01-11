// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// API Endpoints
export const API_ENDPOINTS = {
    projects: `${API_BASE_URL}/api/projects/featured`,
    resumeDownload: `${API_BASE_URL}/api/resume/download`,
    contactSend: `${API_BASE_URL}/api/contact/send`,
};
