import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TerminalSection from '@/components/sections/TerminalSection';
import TechnicalArsenal from '@/components/sections/TechnicalArsenal';
import ProjectsList from '@/components/sections/ProjectsList';
import ContactSection from '@/components/sections/ContactSection';
import { fetchAllProjectSummaries } from '@/lib/data-fetchers';

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

  return (
    <>
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
