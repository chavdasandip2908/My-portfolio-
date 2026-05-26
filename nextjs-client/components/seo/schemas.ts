// JSON-LD structured data schemas for the portfolio
import { ProjectSummary } from '@/lib/types';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sandip-dev.onrender.com';

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Sandip Chavda',
  jobTitle: 'Senior Full-Stack Engineer',
  email: 'chavdasandip2908@gmail.com',
  url: SITE_URL,
  image: `${SITE_URL}/developer2.png`,
  sameAs: [
    'https://www.linkedin.com/in/chavdasandip/',
    'https://github.com/chavdasandip2908',
  ],
  description:
    'Senior Full-Stack Engineer specializing in scalable APIs, interactive frontends, and robust full-stack applications.',
  knowsAbout: [
    'React.js', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB',
    'Docker', 'Kubernetes', 'REST APIs', 'PostgreSQL', 'GCP',
    'Full-Stack Development', 'API Design', 'DevOps', 'CI/CD',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gujarat',
    addressCountry: 'India',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Sandip Chavda Portfolio',
  url: SITE_URL,
  description:
    'Senior Full-Stack Engineer portfolio showcasing projects, skills, and experience.',
  publisher: {
    '@id': `${SITE_URL}/#person`,
  },
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

export function generateUnifiedGraphSchema(projects: ProjectSummary[]) {
  const profilePage = {
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: 'Sandip Chavda | Senior Full-Stack Engineer',
    description:
      'Explore the software engineering portfolio, project case studies, and technical expertise of Sandip Chavda.',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#person`,
    },
    mainEntity: {
      '@id': `${SITE_URL}/#person`,
    },
  };

  const projectListItems = projects.map((project, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: project.title,
      description: project.description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      programmingLanguage: project.technology || [],
      url: SITE_URL,
    },
  }));

  const projectList = {
    '@type': 'ItemList',
    name: 'Featured Projects',
    numberOfItems: projects.length,
    itemListElement: projectListItems,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [personSchema, websiteSchema, profilePage, projectList],
  };
}

