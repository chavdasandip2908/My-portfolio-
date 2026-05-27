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

const bioParagraphs = [
  "I'm a passionate full-stack developer with over 1 year of experience building modern web applications. I specialize in creating scalable, performant, and user-friendly solutions that solve real business problems.",
  "My expertise spans across frontend technologies like React and Vue, backend frameworks like Node.js and Go, and databases including MongoDB and PostgreSQL. Beyond development, I specialize in DevOps practices, leveraging Docker for containerization and Kubernetes for orchestrating complex multi-container applications.",
  "When I'm not coding, I enjoy contributing to open-source projects, learning new technologies, and sharing knowledge with the developer community.",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 bg-cli-bg cli-grid-bg transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center w-full mb-16"
        >
          <div className="flex-1 h-px bg-cli-green/20" />
          <h2
            id="about-heading"
            className="px-6 font-jetbrains text-lg tracking-widest text-cli-muted uppercase"
          >
            ABOUT SANDIP CHAVDA
          </h2>
          <div className="flex-1 h-px bg-cli-green/20" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Terminal bio block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Terminal window */}
            <div className="border border-cli-green/30 bg-cli-surface cli-box-glow">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cli-green/20 bg-cli-surface2">
                <div className="w-2.5 h-2.5 rounded-full bg-cli-red" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-cli-green" />
                <span className="ml-3 font-jetbrains text-xs text-cli-muted tracking-widest">
                  ENGINEER :: PROFILE
                </span>
              </div>

              <div className="p-6 font-jetbrains text-sm">

                <h3 className="text-cli-green text-base font-bold mb-4">
                  Senior Full-Stack Engineer
                </h3>

                <div className="space-y-4">
                  {bioParagraphs.map((para, i) => (
                    <p key={i} className="text-cli-muted leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="grid grid-cols-2 gap-4"
              role="list"
              aria-label="Career statistics"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  role="listitem"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group border border-cli-green/20 bg-cli-surface p-6 text-center hover:border-cli-green/50 hover:bg-cli-green/5 transition-all duration-300 cli-box-glow"
                >

                  <div
                    className="font-jetbrains font-bold text-4xl text-cli-green cli-glow-green mb-1"
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    {stat.value}
                  </div>
                  <div className="font-jetbrains text-cli-muted text-xs tracking-wider uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional system log widget */}
            <div className="mt-4 border border-cli-green/20 bg-cli-surface p-4 font-jetbrains text-xs">
              <div className="text-cli-muted mb-2">// SYSTEM LOG</div>
              {[
                { level: 'INFO', msg: 'Building scalable systems daily' },
                { level: 'INFO', msg: 'DevOps stack: Docker + Kubernetes' },
                { level: 'OK', msg: 'Available for new opportunities' },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 py-0.5">
                  <span className={`${log.level === 'OK' ? 'text-cli-green' : 'text-cli-cyan'} w-10 flex-shrink-0`}>
                    [{log.level}]
                  </span>
                  <span className="text-cli-muted">{log.msg}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
