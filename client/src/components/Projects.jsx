import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(API_ENDPOINTS.projects);
                setProjects(res.data);
            } catch (err) {
                console.error("Failed to fetch projects, using fallback data", err);
                setProjects([
                    {
                        _id: '1',
                        title: 'E-Commerce Platform',
                        description: 'A scalable e-commerce solution with real-time inventory.',
                        techStack: ['React', 'Node.js', 'Redis'],
                        status: 'live',
                        liveUrl: '#',
                        githubUrl: '#',
                        problem: 'Legacy system was slow and unable to handle flash sales.',
                        solution: 'Rebuilt using microservices architecture and Redis caching.'
                    },
                    {
                        _id: '2',
                        title: 'Task Management App',
                        description: 'Collaborative task manager for remote teams.',
                        techStack: ['Vue', 'Firebase', 'Tailwind'],
                        status: 'in-progress',
                        liveUrl: '#',
                        githubUrl: '#',
                        problem: 'Existing tools were too complex for small teams.',
                        solution: 'Simplified UI with realtime updates via Firebase.'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

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
                        A selection of projects that demonstrate my ability to solve complex problems.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center">
                        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.map((project) => (
                            <motion.div
                                key={project._id}
                                variants={cardVariants}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all"
                            >
                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-primary/10 rounded-xl">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${project.status === 'live' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                            project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                <span className="w-1 h-1 bg-red-500 rounded-full"></span> Problem
                                            </h4>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{project.problem}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                <span className="w-1 h-1 bg-green-500 rounded-full"></span> Solution
                                            </h4>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{project.solution}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.techStack.map(tech => (
                                            <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-700/50 text-xs font-medium rounded-lg text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-center py-2.5 bg-primary text-white rounded-lg hover:bg-indigo-700 transition font-medium text-sm"
                                            >
                                                Live Demo
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-center py-2.5 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium text-sm"
                                            >
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;

