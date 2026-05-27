import type { Metadata } from 'next';
import { Inter, Fira_Code, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/hooks/useTheme';
import ToastProvider from '@/components/ui/ToastProvider';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sandip-chavda-dev.onrender.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sandip Chavda — Senior Full-Stack Engineer',
    template: '%s | Sandip Chavda',
  },
  description:
    'Senior Full-Stack Engineer specializing in scalable APIs, interactive frontends, and robust full-stack applications. Available for new opportunities.',
  keywords: [
    // Personal Brand & General
    'Sandip Chavda', 'Sandip Chavda Portfolio', 'Sandip Chavda Web Developer', 
    'Sandip Chavda Software Engineer', 'Chavda Sandip', 'Sandip Developer',
    
    // Roles & Titles
    'Full Stack Engineer', 'Senior Full Stack Developer', 'Software Engineer India',
    'Frontend Developer', 'Backend Developer', 'Web Developer India', 
    'Freelance Web Developer', 'Full Stack Web Developer', 'Software Developer',
    'UI/UX Developer', 'Web Application Developer', 'SaaS Developer',
    
    // Technologies & Stacks
    'React Developer', 'Next.js Developer', 'MERN Stack Developer', 
    'Node.js Developer', 'TypeScript Expert', 'Docker', 'Kubernetes', 'MongoDB',
    'Express.js Developer', 'Tailwind CSS', 'API Development', 'REST APIs', 
    'GraphQL', 'Redux', 'JavaScript Developer',
    
    // Hiring Intent
    'Hire Full Stack Developer', 'Hire React Developer', 'Hire Next.js Developer',
    'Hire Node.js Developer', 'Hire Web Developer India', 'Looking for Web Developer',
    'Remote Full Stack Developer', 'Contract Web Developer',
    
    // Niches & Descriptors
    'Top Web Developer', 'Creative Developer', 'Best Portfolio Website',
    'Scalable Web Apps', 'Custom Software Development', 'High-Performance Websites',
    'Interactive Frontends', 'Robust Backend Systems'
  ],
  authors: [{ name: 'Sandip Chavda', url: SITE_URL }],
  creator: 'Sandip Chavda',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Sandip Chavda Portfolio',
    title: 'Sandip Chavda — Senior Full-Stack Engineer',
    description:
      'Senior Full-Stack Engineer building high-performance web solutions with React, Next.js, Node.js, and cloud technologies.',
    images: [
      {
        url: '/developer2.png',
        width: 1200,
        height: 630,
        alt: 'Sandip Chavda — Senior Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandip Chavda — Senior Full-Stack Engineer',
    description:
      'Senior Full-Stack Engineer specializing in scalable APIs, interactive frontends, and robust full-stack applications. Available for new opportunities.',
    images: ['/developer2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: 'I1JHyBupT4DanuEE3nYATCj2mdgpghipNcsUaAg615I',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Anti-FOUT: apply theme before React hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme') || 'dark';
                  var dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-[#10141a] font-sans transition-colors duration-300 cli-scanlines">
        <ThemeProvider>
          <ToastProvider />
          <main id="main-content" role="main">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
