import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const stats = [
        { label: 'Years Experience', value: '3+' },
        { label: 'Projects Completed', value: '20+' },
        { label: 'Collaborations', value: '10+' },
        { label: 'Technologies', value: '15+' }
    ];

    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
                        About <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Me</span>
                    </h2>
                    <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
                        Passionate full-stack developer with expertise in building scalable web applications
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                            Senior Full-Stack Engineer
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            I'm a passionate full-stack developer with over 3 years of experience building modern web applications.
                            I specialize in creating scalable, performant, and user-friendly solutions that solve real business problems.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            My expertise spans across frontend technologies like React and Vue, backend frameworks like Node.js and Go,
                            and databases including MongoDB and PostgreSQL. Beyond development, I specialize in **DevOps practices**,
                            leveraging **Docker** for containerization and **Kubernetes** for orchestrating complex multi-container applications.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            When I'm not coding, I enjoy contributing to open-source projects, learning new technologies,
                            and sharing knowledge with the developer community.
                        </p>

                        {/* Skills */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-light-text dark:text-dark-text">Core Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {['ReactJS', 'NextJS', 'Node.js', 'Kubernetes', 'Docker', 'MongoDB', 'SQL', 'TypeScript', 'Git & GitHub'].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center"
                            >
                                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
