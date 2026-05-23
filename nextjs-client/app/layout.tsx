import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/hooks/useTheme';
import ToastProvider from '@/components/ui/ToastProvider';
import CustomCursor from '@/components/ui/CustomCursor';

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sandip-dev.onrender.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sandip Chavda — Senior Full-Stack Engineer',
    template: '%s | Sandip Chavda',
  },
  description:
    'Senior Full-Stack Engineer specializing in scalable APIs, interactive frontends, and robust full-stack applications. Available for new opportunities.',
  keywords: [
    'Full Stack Engineer', 'Senior Developer', 'React Developer',
    'Next.js Developer', 'Node.js', 'MongoDB', 'TypeScript',
    'Docker', 'Kubernetes', 'Sandip Chavda', 'Web Developer India',
    'Hire Full Stack Developer',
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
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <head>
        {/* Anti-FOUT: apply theme before React hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme') || 'system';
                  var dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-light-bg dark:bg-dark-bg font-sans transition-colors duration-300">
        <ThemeProvider>
          <CustomCursor />
          <ToastProvider />
          <main id="main-content" role="main">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
