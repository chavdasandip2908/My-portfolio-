'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/types';
import { API_ENDPOINTS } from '@/lib/api';
import Image from 'next/image';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [fullProject, setFullProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch full project details when modal opens
  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (isOpen && project && project._id) {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(API_ENDPOINTS.projectDetail(project._id));
          if (!res.ok) throw new Error('Failed to load project details');
          const data = await res.json();
          setFullProject(data);
        } catch (err) {
          console.error('Failed to fetch project details:', err);
          setError('Failed to load project details');
          // Fallback to summary data
          setFullProject(project);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjectDetails();
  }, [isOpen, project]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  // Use full project data if available, otherwise use summary
  const displayProject = fullProject || project;

  // Backward compatibility
  const technologies = displayProject.technology || displayProject.techStack || [];
  const sourceLink = displayProject.sourceCodeLink || displayProject.githubUrl;
  const liveLink = displayProject.liveViewLink || displayProject.liveUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-100 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-md"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[90vh]">
                {/* Loading State */}
                {loading && (
                  <div className="flex items-center justify-center h-64">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-label="Loading details..." />
                  </div>
                )}

                {/* Error State */}
                {error && !loading && (
                  <div className="p-8 text-center">
                    <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                  </div>
                )}

                {/* Content */}
                {!loading && !error && (
                  <>
                    {/* Project Image */}
                    {displayProject.projectImage && (
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        <Image
                          src={displayProject.projectImage}
                          alt={`${displayProject.title} screenshot`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 896px"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                        <h2 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-extrabold text-white z-20 tracking-tight">
                          {displayProject.title}
                        </h2>
                      </div>
                    )}

                    {/* Content Body */}
                    <div className="p-6 md:p-8 space-y-6">
                      {/* Title (if no image) */}
                      {!displayProject.projectImage && (
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                          {displayProject.title}
                        </h2>
                      )}

                      {/* Description */}
                      <section aria-labelledby="modal-desc-heading">
                        <h3 id="modal-desc-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          Description
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                          {displayProject.description}
                        </p>
                      </section>

                      {/* Roles & Responsibility */}
                      {displayProject.rolesResponsibility && (
                        <section aria-labelledby="modal-roles-heading">
                          <h3 id="modal-roles-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Roles & Responsibility
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                            {displayProject.rolesResponsibility}
                          </p>
                        </section>
                      )}

                      {/* Technologies */}
                      <section aria-labelledby="modal-tech-heading">
                        <h3 id="modal-tech-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 rounded-xl font-semibold text-xs md:text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </section>

                      {/* Duration */}
                      {displayProject.duration && (
                        <section aria-labelledby="modal-duration-heading">
                          <h3 id="modal-duration-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            Duration
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                            {displayProject.duration}
                          </p>
                        </section>
                      )}

                      {/* Links */}
                      {(sourceLink || liveLink) && (
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                          {sourceLink && (
                            <a
                              href={sourceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl transition font-bold shadow-md"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                              Source Code
                            </a>
                          )}
                          {liveLink && (
                            <a
                              href={liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition font-bold shadow-md shadow-indigo-600/20"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Live Demo
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
