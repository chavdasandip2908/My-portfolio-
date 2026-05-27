'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ProjectSummary, Project } from '@/lib/types';
import ProjectDetailModal from '../ui/ProjectDetailModal';

interface ProjectsListProps {
  initialProjects: ProjectSummary[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [projects] = useState<ProjectSummary[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectSummary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: ProjectSummary) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 bg-cli-surface cli-grid-bg transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center w-full mb-4">
            <div className="flex-1 h-px bg-cli-green/20" />
            <h2
              id="projects-heading"
              className="px-6 font-jetbrains text-lg tracking-widest text-cli-muted uppercase"
            >
              SANDIP CHAVDA'S PROJECTS
            </h2>
            <div className="flex-1 h-px bg-cli-green/20" />
          </div>

        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center border border-cli-green/20 bg-cli-bg p-16 font-jetbrains">
            <div className="text-cli-green text-2xl mb-3">{'[ ]'}</div>
            <p className="text-cli-muted">[INFO] No projects indexed yet.</p>
          </div>
        ) : (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Portfolio projects"
          >
            {projects.map((project, index) => {
              const technologies = project.technology || [];

              return (
                <motion.li
                  key={project._id}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => handleProjectClick(project)}
                  className="group cursor-pointer"
                >
                  {/* Project card — styled as a code file */}
                  <div
                    className="relative h-full border border-cli-green/20 bg-cli-bg hover:border-cli-green/50 transition-all duration-300"
                    aria-label={`View details of ${project.title}`}
                  >
                    {/* File name bar */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cli-green/15 bg-cli-surface">
                      <div className="w-2 h-2 rounded-full bg-cli-red" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-cli-green" />
                      <span className="ml-2 font-jetbrains text-xs text-cli-muted truncate">
                        project_{String(index + 1).padStart(2, '0')}.sys
                      </span>
                    </div>

                    {/* Project Image */}
                    {project.projectImage && (
                      <div className="relative h-44 overflow-hidden border-b border-cli-green/10">
                        <Image
                          src={project.projectImage}
                          alt={`${project.title} project screenshot`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-cli-bg/80 to-transparent" />
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="p-5">
                      <h3 className="font-jetbrains font-bold text-cli-text text-base mb-2 group-hover:text-cli-green transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="font-jetbrains text-cli-muted text-xs leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech chips */}
                      <div className="flex flex-wrap gap-1.5 mb-4" role="list" aria-label="Technologies used">
                        {technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            role="listitem"
                            className="px-2 py-0.5 border border-cli-cyan/30 bg-cli-cyan/5 text-cli-cyan text-[10px] font-medium font-jetbrains"
                          >
                            {tech}
                          </span>
                        ))}
                        {technologies.length > 3 && (
                          <span className="px-2 py-0.5 border border-cli-muted/20 text-cli-muted text-[10px] font-medium font-jetbrains">
                            +{technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* View details link */}
                      <div className="flex items-center gap-2 font-jetbrains text-xs text-cli-green group-hover:text-cli-green/80 transition-colors">
                        <span className="text-cli-green/60">➜</span>
                        <span>View Details</span>
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>

      <ProjectDetailModal
        project={selectedProject as Project}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
