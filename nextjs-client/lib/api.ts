// API base URL — set NEXT_PUBLIC_API_URL in .env.local
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export const API_ENDPOINTS = {
  // Public endpoints
  projects:        `${API_BASE_URL}/api/projects`,
  projectsSummary: `${API_BASE_URL}/api/projects/summary`,
  projectDetail:   (id: string) => `${API_BASE_URL}/api/projects/${id}`,
  resumeLatest:    `${API_BASE_URL}/api/resume/latest`,
  resumeDownload:  `${API_BASE_URL}/api/resume/download`,
  contactSend:     `${API_BASE_URL}/api/contact/send`,

  // Admin endpoints
  adminLogin:      `${API_BASE_URL}/api/admin/login`,
  adminVerify:     `${API_BASE_URL}/api/admin/verify`,
  adminStats:      `${API_BASE_URL}/api/admin/stats`,
  adminResumes:    `${API_BASE_URL}/api/admin/resumes`,
  adminContacts:   `${API_BASE_URL}/api/admin/contacts`,
  adminProjects:   `${API_BASE_URL}/api/admin/projects`,
  activateResume:  (id: string) => `${API_BASE_URL}/api/admin/resumes/${id}/activate`,
  deleteResume:    (id: string) => `${API_BASE_URL}/api/admin/resumes/${id}`,
  markContactRead: (id: string) => `${API_BASE_URL}/api/admin/contacts/${id}/read`,
  deleteContact:   (id: string) => `${API_BASE_URL}/api/admin/contacts/${id}`,
  updateProject:   (id: string) => `${API_BASE_URL}/api/admin/projects/${id}`,
  deleteProject:   (id: string) => `${API_BASE_URL}/api/admin/projects/${id}`,
};
