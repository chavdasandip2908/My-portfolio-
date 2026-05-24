import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="py-8 bg-cli-surface border-t border-cli-green/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-jetbrains text-xs">
          {/* Brand */}
          <div className="text-cli-muted flex items-center gap-2">
            <span className="text-cli-green">➜</span>
            <span>
              © {year}{' '}
              <Link href="/" className="text-cli-green hover:text-cli-green-dim transition-colors">
                Sandip Chavda
              </Link>
              {' '}· Built with{' '}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cli-cyan hover:text-cli-text transition-colors"
              >
                Next.js
              </a>
              {' '}&amp; Node.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
