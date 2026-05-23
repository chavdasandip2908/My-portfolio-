import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';

interface ProjectDetailViewProps {
  project: Project;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const technologies = project.technology || project.techStack || [];
  const sourceLink = project.sourceCodeLink || project.githubUrl;
  const liveLink = project.liveViewLink || project.liveUrl;

  return (
    <article
      aria-labelledby="project-title"
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Image */}
        {project.projectImage && (
          <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-2xl mb-8 shadow-2xl">
            <Image
              src={project.projectImage}
              alt={`${project.title} — project screenshot`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h1
              id="project-title"
              className="absolute bottom-6 left-6 text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
            >
              {project.title}
            </h1>
          </div>
        )}

        {/* Title (no image) */}
        {!project.projectImage && (
          <h1 id="project-title" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {project.title}
          </h1>
        )}

        <div className="space-y-10">
          {/* Description */}
          <section aria-labelledby="desc-heading">
            <h2 id="desc-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full inline-block" aria-hidden="true" />
              Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </section>

          {/* Roles & Responsibility */}
          {project.rolesResponsibility && (
            <section aria-labelledby="roles-heading">
              <h2 id="roles-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded-full inline-block" aria-hidden="true" />
                Roles &amp; Responsibility
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {project.rolesResponsibility}
              </p>
            </section>
          )}

          {/* Technologies */}
          <section aria-labelledby="tech-heading">
            <h2 id="tech-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full inline-block" aria-hidden="true" />
              Technologies
            </h2>
            <ul className="flex flex-wrap gap-2" aria-label="Technologies used in this project">
              {technologies.map((tech) => (
                <li key={tech}>
                  <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-lg font-medium text-sm">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Duration */}
          {project.duration && (
            <section aria-labelledby="duration-heading">
              <h2 id="duration-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded-full inline-block" aria-hidden="true" />
                Duration
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{project.duration}</p>
            </section>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-4">
            {sourceLink && (
              <a
                href={sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${project.title} on GitHub`}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-primary dark:hover:border-primary hover:text-primary transition font-medium"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
