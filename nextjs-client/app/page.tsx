import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import { fetchAllProjectSummaries } from '@/lib/data-fetchers';
import JsonLd from '@/components/seo/JsonLd';
import { generateUnifiedGraphSchema } from '@/components/seo/schemas';

// Dynamically import heavy and below-the-fold components
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'));
const TerminalSection = dynamic(() => import('@/components/sections/TerminalSection'));
const TechnicalArsenal = dynamic(() => import('@/components/sections/TechnicalArsenal'));
const ProjectsList = dynamic(() => import('@/components/sections/ProjectsList'));
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'));
const Footer = dynamic(() => import('@/components/layout/Footer'));

export const metadata: Metadata = {
  title: 'Sandip Chavda — Senior Full-Stack Engineer',
  description:
    'Architecting high-performance web solutions. Senior Full-Stack Engineer specializing in scalable APIs, interactive frontends, and cloud infrastructure. Open to new opportunities.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sandip Chavda — Senior Full-Stack Engineer',
    description:
      'Architecting high-performance web solutions. Available for new professional opportunities.',
    url: '/',
  },
};

export default async function HomePage() {
  const projects = await fetchAllProjectSummaries();
  const unifiedSchema = generateUnifiedGraphSchema(projects);

  return (
    <>
      <JsonLd data={unifiedSchema} />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TerminalSection />
      <TechnicalArsenal />
      <ProjectsList initialProjects={projects} />
      <ContactSection />
      <Footer />
    </>
  );
}
