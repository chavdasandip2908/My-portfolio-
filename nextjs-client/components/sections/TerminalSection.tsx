'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const commands: Record<string, string> = {
  help: 'Available commands:\n  • about\n  • skills\n  • projects\n  • contact\n  • hire\n  • clear',
  about: 'I am a Senior Full-Stack Engineer with a passion for clean code and scalable systems.',
  skills: 'Navigating to skills section...',
  projects: 'Navigating to projects section...',
  contact: 'Navigating to contact section...',
  hire: 'Navigating to contact section...',
  clear: 'CLEAR',
};

interface HistoryLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export default function TerminalSection() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: 'output', content: "Welcome to Sandip's Terminal v2.0.0" },
    { type: 'output', content: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState('');
  const isInitialMount = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    if (!trimmed) {
      setHistory((prev) => [...prev, { type: 'input', content: '' }]);
      return;
    }

    if (trimmed === 'clear') {
      setHistory([{ type: 'output', content: 'Terminal cleared.' }]);
      return;
    }

    const newLines: HistoryLine[] = [{ type: 'input', content: cmd }];

    if (['hire', 'contact'].includes(trimmed)) {
      newLines.push({ type: 'output', content: commands[trimmed] });
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 600);
    } else if (trimmed === 'projects') {
      newLines.push({ type: 'output', content: commands.projects });
      setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 600);
    } else if (trimmed === 'skills') {
      newLines.push({ type: 'output', content: commands.skills });
      setTimeout(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }), 600);
    } else if (trimmed === 'about') {
      newLines.push({ type: 'output', content: commands.about });
      setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 600);
    } else if (commands[trimmed]) {
      newLines.push({ type: 'output', content: commands[trimmed] });
    } else {
      newLines.push({
        type: 'error',
        content: `Command not found: ${trimmed}. Type 'help' for list.`,
      });
    }

    setHistory((prev) => [...prev, ...newLines]);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [history]);

  return (
    <section
      id="terminal"
      aria-labelledby="terminal-heading"
      className="py-20 bg-gray-100 dark:bg-[#0d1117] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="terminal-heading" className="sr-only">Interactive Terminal</h2>
        <div
          className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700 font-mono text-sm md:text-base"
          role="region"
          aria-label="Interactive terminal — type commands to navigate"
        >
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-gray-400 text-xs select-none">guest@sandip-portfolio:~</span>
          </div>

          {/* Terminal Body */}
          <div
            className="p-6 h-96 overflow-y-auto cursor-text text-gray-300"
            onClick={() => inputRef.current?.focus()}
            aria-live="polite"
            aria-atomic="false"
          >
            {history.map((line, index) => (
              <div key={index} className="mb-2 whitespace-pre-wrap">
                {line.type === 'input' ? (
                  <div className="flex">
                    <span className="text-green-500 mr-2" aria-hidden="true">➜</span>
                    <span className="text-blue-400 mr-2" aria-hidden="true">~</span>
                    <span>{line.content}</span>
                  </div>
                ) : line.type === 'error' ? (
                  <div className="text-red-400" role="alert">{line.content}</div>
                ) : (
                  <div className="text-gray-300">{line.content}</div>
                )}
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center">
              <span className="text-green-500 mr-2" aria-hidden="true">➜</span>
              <span className="text-blue-400 mr-2" aria-hidden="true">~</span>
              <label htmlFor="terminal-input" className="sr-only">Terminal input</label>
              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCommand(input);
                    setInput('');
                  }
                }}
                className="bg-transparent border-none outline-none flex-1 text-gray-100 placeholder-transparent"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command input"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </div>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Try typing{' '}
          <kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-primary font-bold font-mono text-xs">
            help
          </kbd>
        </p>
      </div>
    </section>
  );
}
