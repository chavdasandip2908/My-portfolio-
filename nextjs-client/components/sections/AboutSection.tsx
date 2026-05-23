'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Years Experience', value: '1+' },
  { label: 'Projects Completed', value: '20+' },
  { label: 'Collaborations', value: '10+' },
  { label: 'Technologies', value: '15+' },
];

const skills = [
  'ReactJS', 'NextJS', 'Node.js', 'Kubernetes',
  'Docker', 'MongoDB', 'SQL', 'TypeScript', 'Git & GitHub',
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 bg-white dark:bg-[#0B0F19] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="about-heading" className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
            Passionate full-stack developer with expertise in building scalable web applications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
              Senior Full-Stack Engineer
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              I&apos;m a passionate full-stack developer with over 1 year of experience building
              modern web applications. I specialize in creating scalable, performant, and
              user-friendly solutions that solve real business problems.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              My expertise spans across frontend technologies like React and Vue, backend
              frameworks like Node.js and Go, and databases including MongoDB and PostgreSQL.
              Beyond development, I specialize in DevOps practices, leveraging Docker for
              containerization and Kubernetes for orchestrating complex multi-container applications.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              When I&apos;m not coding, I enjoy contributing to open-source projects, learning new
              technologies, and sharing knowledge with the developer community.
            </p>

            {/* Core Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">Core Skills</h3>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Core technical skills">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    role="listitem"
                    className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-6"
            role="list"
            aria-label="Career statistics"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                role="listitem"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-[#111827] dark:to-[#0B0F19] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center"
              >
                <div
                  className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2"
                  aria-label={`${stat.value} ${stat.label}`}
                >
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
}
