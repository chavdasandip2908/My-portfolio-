/**
 * Server-side data fetchers — used only in Server Components and generateMetadata.
 * Never imported in Client Components.
 */

import { Project, ProjectSummary } from './types';
import { API_ENDPOINTS } from './api';

export async function fetchAllProjectSummaries(): Promise<ProjectSummary[]> {
  try {
    const res = await fetch(API_ENDPOINTS.projectsSummary, {
      next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  try {
    const res = await fetch(API_ENDPOINTS.projectDetail(id), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchAllProjects(): Promise<Project[]> {
  try {
    const res = await fetch(API_ENDPOINTS.projects, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
