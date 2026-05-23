'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 text-center">
      <p className="text-6xl font-black text-red-500 mb-4" aria-hidden="true">⚠️</p>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-sm">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-primary hover:text-primary transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
