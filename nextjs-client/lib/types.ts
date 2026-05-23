// Project type from MongoDB
export interface Project {
  _id: string;
  title: string;
  description: string;
  projectImage: string; // base64 or URL
  rolesResponsibility: string;
  technology: string[];
  techStack?: string[]; // backward compat
  duration?: string;
  sourceCodeLink?: string;
  liveViewLink?: string;
  githubUrl?: string;  // backward compat
  liveUrl?: string;    // backward compat
  createdAt: string;
}

// Project summary (lighter version for listing page)
export interface ProjectSummary {
  _id: string;
  title: string;
  description: string;
  projectImage: string;
  technology: string[];
  createdAt: string;
}

// Contact form payload
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Resume from MongoDB
export interface Resume {
  _id: string;
  filename: string;
  originalName: string;
  path: string;
  isActive: boolean;
  downloadCount: number;
  uploadedAt: string;
}

// Admin stats
export interface AdminStats {
  totalResumes: number;
  activeResume: string;
  totalDownloads: number;
  totalContacts: number;
  unreadContacts: number;
  totalProjects: number;
  recentContacts: RecentContact[];
}

export interface RecentContact {
  _id: string;
  name: string;
  email: string;
  submittedAt: string;
  isRead: boolean;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
}
