// JSON-LD structured data schemas for the portfolio

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sandip-dev.onrender.com';

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sandip Chavda',
  jobTitle: 'Senior Full-Stack Engineer',
  email: 'chavdasandip2908@gmail.com',
  url: SITE_URL,
  sameAs: [
    'https://www.linkedin.com/in/chavdasandip/',
    'https://github.com/chavdasandip2908',
  ],
  knowsAbout: [
    'React.js', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB',
    'Docker', 'Kubernetes', 'REST APIs', 'PostgreSQL', 'GCP',
  ],
  alumniOf: { '@type': 'Organization', name: '' },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sandip Chavda Portfolio',
  url: SITE_URL,
  description:
    'Senior Full-Stack Engineer portfolio showcasing projects, skills, and experience.',
  author: { '@type': 'Person', name: 'Sandip Chavda' },
};

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function projectSchema(project: {
  title: string;
  description: string;
  technology: string[];
  liveViewLink?: string;
  sourceCodeLink?: string;
  createdAt: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    programmingLanguage: project.technology,
    url: project.liveViewLink || SITE_URL,
    codeRepository: project.sourceCodeLink,
    datePublished: project.createdAt,
    author: { '@type': 'Person', name: 'Sandip Chavda' },
  };
}
