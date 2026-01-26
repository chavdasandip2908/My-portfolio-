// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// API Endpoints
export const API_ENDPOINTS = {
    projects: `${API_BASE_URL}/api/projects`, // All projects (backward compatibility)
    projectsSummary: `${API_BASE_URL}/api/projects/summary`, // Optimized for listing
    projectDetail: (id) => `${API_BASE_URL}/api/projects/${id}`, // Full details by ID
    resumeDownload: `${API_BASE_URL}/api/resume/download`,
    contactSend: `${API_BASE_URL}/api/contact/send`,
};
