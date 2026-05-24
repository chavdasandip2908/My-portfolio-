'use client';

import { motion, Variants } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    accentColor: 'text-cli-cyan',
    borderColor: 'border-cli-cyan/30',
    hoverBg: 'hover:bg-cli-cyan/5',
    skills: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
  },
  {
    title: 'Backend',
    accentColor: 'text-cli-green',
    borderColor: 'border-cli-green/30',
    hoverBg: 'hover:bg-cli-green/5',
    skills: ['Node.js', 'Express.js', 'Python', 'Socket.io', 'REST APIs', 'JWT/Auth'],
  },
  {
    title: 'Database',
    accentColor: 'text-yellow-400',
    borderColor: 'border-yellow-400/30',
    hoverBg: 'hover:bg-yellow-400/5',
    skills: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL', 'Prisma', 'Mongoose'],
  },
  {
    title: 'Cloud & DevOps',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-400/30',
    hoverBg: 'hover:bg-purple-400/5',
    skills: ['GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx'],
  },
  {
    title: 'Tools',
    accentColor: 'text-cli-muted',
    borderColor: 'border-cli-muted/30',
    hoverBg: 'hover:bg-cli-muted/5',
    skills: ['VS Code', 'Postman', 'Xampp', 'Figma', 'Git & GitHub'],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
};

export default function TechnicalArsenal() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 bg-cli-surface cli-grid-bg transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center w-full mb-4">
            <div className="flex-1 h-px bg-cli-green/20" />
            <h2
              id="skills-heading"
              className="px-6 font-jetbrains text-lg tracking-widest text-cli-muted uppercase"
            >
              TECHNICAL ARSENAL
            </h2>
            <div className="flex-1 h-px bg-cli-green/20" />
          </div>

        </motion.div>

        {/* Responsive grid — max 3 per row */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Technical skill categories"
        >
          {skillCategories.map((category) => (
            <motion.li
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
              className="group relative"
            >
              {/* Card */}
              <div
                className={`relative h-full border ${category.borderColor} bg-cli-bg ${category.hoverBg} hover:border-opacity-70 transition-all duration-300`}
              >
                {/* Card title bar */}
                <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${category.borderColor} bg-cli-surface`}>
                  <div className="w-2 h-2 rounded-full bg-cli-red" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-cli-green" />
                  <span className={`ml-2 font-jetbrains text-xs font-bold tracking-widest uppercase ${category.accentColor}`}>
                    {category.title}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5">

                  {/* Skill chips */}
                  <ul
                    className="flex flex-wrap gap-2"
                    aria-label={`${category.title} skills`}
                  >
                    {category.skills.map((skill) => (
                      <li key={skill}>
                        <span
                          className={`inline-block px-3 py-1 border ${category.borderColor} text-cli-muted text-xs font-medium font-jetbrains hover:text-cli-text transition-colors duration-200`}
                        >
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
