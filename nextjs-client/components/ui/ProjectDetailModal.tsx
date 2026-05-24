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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-cli-bg/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-cli-surface border border-cli-green/30 cli-box-glow max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-cli-green/20 bg-cli-surface2 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cli-red" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-cli-green" />
                <span className="ml-3 font-jetbrains text-xs text-cli-muted tracking-widest uppercase">
                  PROJECT :: DETAILS
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-cli-muted hover:text-cli-red transition-colors font-jetbrains text-xs tracking-widest focus:outline-none"
                aria-label="Close modal"
              >
                [X]
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 font-jetbrains">
              {/* Skeleton Loading State */}
              {loading && (
                <div className="p-6 md:p-8 space-y-8 animate-pulse">
                  <div className="h-48 md:h-64 bg-cli-green/5 border border-cli-green/10" />
                  <div className="h-8 bg-cli-green/10 w-2/3" />
                  <div className="space-y-3">
                    <div className="h-3 bg-cli-muted/10 w-full" />
                    <div className="h-3 bg-cli-muted/10 w-full" />
                    <div className="h-3 bg-cli-muted/10 w-5/6" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-cli-cyan/10 w-20" />
                    <div className="h-6 bg-cli-cyan/10 w-24" />
                    <div className="h-6 bg-cli-cyan/10 w-16" />
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="p-8 text-center border border-cli-red/30 bg-cli-red/5 m-6">
                  <span className="text-cli-red font-bold">ERR:</span>
                  <span className="text-cli-muted ml-2">{error}</span>
                </div>
              )}

              {/* Content */}
              {!loading && !error && (
                <>
                  {/* Project Image */}
                  {displayProject.projectImage && (
                    <div className="relative h-48 md:h-80 w-full border-b border-cli-green/20">
                      <Image
                        src={displayProject.projectImage}
                        alt={`${displayProject.title} screenshot`}
                        fill
                        className="object-cover opacity-80"
                        sizes="(max-width: 1024px) 100vw, 896px"
                        priority
                      />
                      <div className="absolute inset-0 bg-cli-bg/40 mix-blend-multiply" />
                    </div>
                  )}

                  {/* Content Body */}
                  <div className="p-6 md:p-8 space-y-8">
                    {/* Title */}
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-cli-green mb-2">
                        {displayProject.title}
                      </h2>
                      {displayProject.duration && (
                        <p className="text-cli-muted text-xs tracking-wider">
                          [DURATION: {displayProject.duration}]
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <section>
                      <h3 className="text-sm tracking-widest text-cli-cyan uppercase mb-3 flex items-center gap-2">
                        <span className="text-cli-green">➜</span> Description
                      </h3>
                      <p className="text-cli-muted text-sm leading-relaxed whitespace-pre-line">
                        {displayProject.description}
                      </p>
                    </section>

                    {/* Roles & Responsibility */}
                    {displayProject.rolesResponsibility && (
                      <section>
                        <h3 className="text-sm tracking-widest text-cli-cyan uppercase mb-3 flex items-center gap-2">
                          <span className="text-cli-green">➜</span> Roles & Responsibilities
                        </h3>
                        <p className="text-cli-muted text-sm leading-relaxed whitespace-pre-line">
                          {displayProject.rolesResponsibility}
                        </p>
                      </section>
                    )}

                    {/* Technologies */}
                    <section>
                      <h3 className="text-sm tracking-widest text-cli-cyan uppercase mb-3 flex items-center gap-2">
                        <span className="text-cli-green">➜</span> Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 border border-cli-cyan/30 bg-cli-cyan/5 text-cli-cyan text-[10px] uppercase font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>

                    {/* Links */}
                    {(sourceLink || liveLink) && (
                      <div className="flex flex-wrap gap-4 pt-6 border-t border-cli-green/20">
                        {sourceLink && (
                          <a
                            href={sourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-6 py-2 border border-cli-muted/40 hover:border-cli-green text-cli-muted hover:text-cli-green text-xs font-bold uppercase transition-colors"
                          >
                            <svg className="w-4 h-4 group-hover:text-cli-green transition-colors" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            VIEW_SOURCE
                          </a>
                        )}
                        {liveLink && (
                          <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-6 py-2 border border-cli-green bg-cli-green/10 text-cli-green hover:bg-cli-green hover:text-cli-bg text-xs font-bold uppercase transition-colors shadow-[0_0_10px_rgba(0,255,170,0.2)]"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            EXECUTE_DEMO
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
      )}
    </AnimatePresence>
  );
}
