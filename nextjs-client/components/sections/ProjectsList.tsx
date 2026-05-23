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
  hidden: { opacity: 0, y: 20 },
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
      className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-[#0B0F19] dark:to-[#080c14] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-light-muted dark:text-dark-muted max-w-2xl mx-auto text-lg">
            Explore my portfolio of projects showcasing innovative solutions and technical expertise.
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16">
            <p className="text-xl">No projects available yet.</p>
          </div>
        ) : (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            aria-label="Portfolio projects"
          >
            {projects.map((project) => {
              const technologies = project.technology || [];

              return (
                <motion.li
                  key={project._id}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => handleProjectClick(project)}
                  className="group cursor-pointer"
                >
                  <div
                    className="block relative bg-white dark:bg-[#111827] rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 transition-all h-full"
                    aria-label={`View details of ${project.title}`}
                  >
                    {/* Gradient Overlay on Hover */}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    {/* Project Image */}
                    {project.projectImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.projectImage}
                          alt={`${project.title} project screenshot`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}

                    <div className="relative p-6 z-20">
                      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
                        {technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            role="listitem"
                            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-medium rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                        {technologies.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-lg">
                            +{technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-primary font-medium text-sm transition-colors group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
                        View Details
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
