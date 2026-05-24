'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

// Commands that are strings
const simpleCommands: Record<string, string> = {
  about: 'I am a Senior Full-Stack Engineer with a passion for clean code and scalable systems.',
  skills: 'Navigating to skills section...',
  projects: 'Navigating to projects section...',
  contact: 'Navigating to contact section...',
  hire: 'Navigating to contact section...',
};

const HelpCommandOutput = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4 mb-6">
    <div className="flex gap-3">
      <span className="text-cli-cyan min-w-[80px]">about</span>
      <span className="text-cli-muted">- Display professional summary</span>
    </div>
    <div className="flex gap-3">
      <span className="text-cli-cyan min-w-[80px]">skills</span>
      <span className="text-cli-muted">- List technical arsenal</span>
    </div>
    <div className="flex gap-3">
      <span className="text-cli-cyan min-w-[80px]">projects</span>
      <span className="text-cli-muted">- View featured work</span>
    </div>
    <div className="flex gap-3">
      <span className="text-cli-cyan min-w-[80px]">contact</span>
      <span className="text-cli-muted">- Request secure connection</span>
    </div>
    <div className="flex gap-3">
      <span className="text-cli-cyan min-w-[80px]">clear</span>
      <span className="text-cli-muted">- Reset terminal window</span>
    </div>
  </div>

);

interface HistoryLine {
  type: 'input' | 'output' | 'error';
  content: ReactNode;
}

export default function TerminalSection() {
  const [history, setHistory] = useState<HistoryLine[]>([
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
      setHistory([]);
      return;
    }

    const newLines: HistoryLine[] = [{ type: 'input', content: cmd }];

    if (trimmed === 'help') {
      newLines.push({ type: 'output', content: <HelpCommandOutput /> });
    } else if (trimmed === 'about') {
      newLines.push({ type: 'output', content: <div className="mt-2 mb-4 text-cli-muted">{simpleCommands.about}</div> });
      setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 600);
    } else if (['hire', 'contact'].includes(trimmed)) {
      newLines.push({ type: 'output', content: <div className="mt-2 mb-4 text-cli-muted">{simpleCommands.contact}</div> });
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 600);
    } else if (trimmed === 'projects') {
      newLines.push({ type: 'output', content: <div className="mt-2 mb-4 text-cli-muted">{simpleCommands.projects}</div> });
      setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 600);
    } else if (trimmed === 'skills') {
      newLines.push({ type: 'output', content: <div className="mt-2 mb-4 text-cli-muted">{simpleCommands.skills}</div> });
      setTimeout(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }), 600);
    } else if (simpleCommands[trimmed]) {
      newLines.push({ type: 'output', content: <div className="mt-2 mb-4 text-cli-muted">{simpleCommands[trimmed]}</div> });
    } else {
      newLines.push({
        type: 'error',
        content: <div className="mt-2 mb-4">Command not found: ${trimmed}. Type 'help' for list.</div>,
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
      aria-label="Interactive terminal section"
      className="py-16 md:py-24 bg-cli-bg transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center w-full mb-4">
            <div className="flex-1 h-px bg-cli-green/20" />
            <h2
              id="terminal-heading"
              className="px-6 font-jetbrains text-lg tracking-widest text-cli-muted uppercase"
            >
              COMMAND CENTER
            </h2>
            <div className="flex-1 h-px bg-cli-green/20" />
          </div>
        </div>

        {/* Terminal window */}
        <div
          className="border border-cli-green/30 bg-cli-surface cli-box-glow overflow-hidden"
          role="region"
          aria-label="Interactive terminal — type commands to navigate"
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-3 px-4 py-2 border-b border-cli-green/20 bg-cli-surface3"
            aria-hidden="true"
          >
            <svg className="w-4 h-4 text-cli-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-jetbrains text-xs text-cli-muted tracking-widest">
              guest@sandip-portfolio:~ (zsh)
            </span>
          </div>

          {/* Terminal body */}
          <div
            className="p-6 h-[400px] overflow-y-auto font-jetbrains text-sm"
            onClick={() => inputRef.current?.focus()}
            aria-live="polite"
            aria-atomic="false"
          >
            {history.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap leading-relaxed">
                {line.type === 'input' ? (
                  <div className="flex items-start gap-2 mb-2 mt-2">
                    <span className="text-cli-green flex-shrink-0 font-bold" aria-hidden="true">guest@sandip-portfolio:~ $</span>
                    <span className="text-cli-cyan">{line.content}</span>
                  </div>
                ) : line.type === 'error' ? (
                  <div className="text-cli-red" role="alert">
                    <span className="text-cli-red/60 mr-2">[ERR]</span>{line.content}
                  </div>
                ) : (
                  <div className="text-cli-muted">{line.content}</div>
                )}
              </div>
            ))}

            {/* Active input line */}
            <div className="flex items-center gap-2 mt-6">
              <span className="text-cli-green flex-shrink-0" aria-hidden="true">guest@sandip-portfolio:~ $</span>
              <label htmlFor="terminal-input" className="sr-only">Terminal input</label>

              <div className="relative flex-1 flex items-center h-5">
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
                  className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent outline-none border-none focus:ring-0 p-0 m-0 z-10 font-jetbrains text-sm"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal command input"
                />
                <div className="absolute inset-0 pointer-events-none flex items-center font-jetbrains text-sm whitespace-pre text-cli-cyan">
                  {input}<span className="inline-block w-2.5 h-4 bg-cli-green animate-pulse ml-0.5" />
                </div>
              </div>
            </div>

            <div ref={bottomRef} className="h-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
