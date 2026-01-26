import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import ProjectDetailModal from './ProjectDetailModal';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Use summary API for faster initial load
                const res = await axios.get(API_ENDPOINTS.projectsSummary);
                setProjects(res.data);
            } catch (err) {
                console.error("Failed to fetch projects", err);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="projects" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
                        Featured <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Projects</span>
                    </h2>
                    <p className="text-light-muted dark:text-dark-muted max-w-2xl mx-auto text-lg">
                        Explore my portfolio of projects showcasing innovative solutions and technical expertise.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center">
                        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <p className="text-xl">No projects available yet.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.map((project) => {
                            // Backward compatibility
                            const technologies = project.technology || project.techStack || [];
                            const projectImage = project.projectImage || null;

                            return (
                                <motion.div
                                    key={project._id}
                                    variants={cardVariants}
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    onClick={() => handleProjectClick(project)}
                                    className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all cursor-pointer"
                                >
                                    {/* Gradient Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Project Image */}
                                    {projectImage && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={projectImage}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>
                                    )}

                                    <div className="relative p-6">
                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>

                                        {/* Description (Truncated) */}
                                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Technology Stack */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {technologies.slice(0, 3).map((tech, index) => (
                                                <span
                                                    key={index}
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

                                        {/* View Details Button */}
                                        <div className="flex items-center text-primary group-hover:text-indigo-700 dark:group-hover:text-indigo-400 font-medium text-sm transition-colors">
                                            View Details
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </div>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </section>
    );
};

export default Projects;
