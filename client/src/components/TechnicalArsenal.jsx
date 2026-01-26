import React from 'react';
import { motion } from 'framer-motion';

const TechnicalArsenal = () => {
    const skillCategories = [
        {
            title: "Frontend",
            color: "from-blue-600 via-cyan-500 to-blue-400",
            glowColor: "rgba(59, 130, 246, 0.5)",
            skills: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "Redux"]
        },
        {
            title: "Backend",
            color: "from-emerald-600 via-green-500 to-teal-400",
            glowColor: "rgba(16, 185, 129, 0.5)",
            skills: ["Node.js", "Express.js", "Go", "Nest.js", "REST APIs", "GraphQL", "JWT/Auth"]
        },
        {
            title: "Database",
            color: "from-amber-500 via-orange-500 to-yellow-400",
            glowColor: "rgba(245, 158, 11, 0.5)",
            skills: ["MongoDB", "PostgreSQL", "Redis", "MySQL", "Prisma", "Mongoose"]
        },
        {
            title: "Cloud & DevOps",
            color: "from-purple-600 via-pink-500 to-indigo-400",
            glowColor: "rgba(147, 51, 234, 0.5)",
            skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Nginx", "Linux"]
        },
        {
            title: "Tools",
            color: "from-slate-600 via-gray-500 to-slate-400",
            glowColor: "rgba(71, 85, 105, 0.5)",
            skills: ["VS Code", "Postman", "Git", "Figma", "Vite/Webpack", "Jest"]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <section id="skills" className="relative py-32 bg-[#020617] transition-colors duration-500 overflow-hidden">
            {/* Immersive Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-sm font-semibold tracking-wider text-primary uppercase">Expertise</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
                        Technical <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Arsenal</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        A curated collection of tools and technologies I've mastered to build high-performance, scalable applications.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="flex justify-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 max-w-6xl w-full"
                    >
                        {skillCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{
                                    y: -15,
                                    transition: { type: "spring", stiffness: 300, damping: 15 }
                                }}
                                className="group relative"
                            >
                                {/* Card Glow Effect */}
                                <div
                                    className="absolute -inset-1 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                                    style={{ background: `radial-gradient(circle at center, ${category.glowColor}, transparent 70%)` }}
                                />

                                {/* Card Body */}
                                <div className="relative h-full bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center overflow-hidden group-hover:border-white/20 transition-all duration-500">

                                    {/* Subtle Gradient Overlay */}
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <h3 className="text-3xl font-black text-white mb-8 tracking-tight group-hover:scale-105 transition-transform duration-300">
                                        {category.title}
                                    </h3>

                                    <div className="flex flex-wrap justify-center gap-3 mt-auto">
                                        {category.skills.map((skill, sIndex) => (
                                            <span
                                                key={sIndex}
                                                className="px-4 py-2 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium rounded-2xl hover:bg-white/10 hover:border-white/30 hover:text-white hover:scale-110 hover:-rotate-2 transition-all duration-300 cursor-default"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Corner Accent */}
                                    <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 blur-2xl rounded-full transition-opacity duration-700`} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TechnicalArsenal;
