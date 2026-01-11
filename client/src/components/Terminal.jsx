import React, { useState, useEffect, useRef } from 'react';

const commands = {
    help: "Available commands:\n  • about\n  • skills\n  • projects\n  • services\n  • experience\n  • contact\n  • hire\n  • clear",
    about: "I am a Senior Full-Stack Engineer with a passion for clean code and scalable systems.",
    skills: "Frontend: React, Tailwind, Framer Motion\nBackend: Node.js, Express, MongoDB, Docker\nLanguages: JavaScript, TypeScript, Python, SQL",
    projects: "Type 'projects' to see my work... actually, just scroll down to the Projects section!",
    services: "- API Development\n- Web Application Architecture\n- Performance Optimization\n- Technical Consulting",
    experience: "5+ years of experience building enterprise-grade applications and freelancing for global clients.",
    contact: "Email: sandip@example.com\nLinkedIn: linkedin.com/in/sandip\nGitHub: github.com/sandip",
    hire: "Redirecting to contact section...",
    clear: "CLEAR_History"
};

const Terminal = () => {
    const [history, setHistory] = useState([
        { type: 'output', content: "Welcome to Sandip's Terminal v1.0.0" },
        { type: 'output', content: "Type 'help' to see available commands." }
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        if (!trimmedCmd) {
            setHistory(prev => [...prev, { type: 'input', content: '' }]);
            return;
        }

        const newHistory = [...history, { type: 'input', content: cmd }];

        if (trimmedCmd === 'clear') {
            setHistory([{ type: 'output', content: "Terminal cleared." }]);
            return;
        }

        if (trimmedCmd === 'hire') {
            newHistory.push({ type: 'output', content: commands.hire });
            // Smooth scroll to contact
            setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        } else if (commands[trimmedCmd]) {
            newHistory.push({ type: 'output', content: commands[trimmedCmd] });
        } else {
            newHistory.push({ type: 'error', content: `Command not found: ${trimmedCmd}. Type 'help' for list.` });
        }

        setHistory(newHistory);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    const [isInitialMount, setIsInitialMount] = useState(true);

    useEffect(() => {
        // Skip scroll on initial mount to prevent page from jumping on load
        if (isInitialMount) {
            setIsInitialMount(false);
            return;
        }

        // Scroll only within the terminal container, not the whole page
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
    }, [history]);

    return (
        <section id="terminal" className="py-20 bg-gray-100 dark:bg-[#0d1117] transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700 font-mono text-sm md:text-base">
                    {/* Terminal Header */}
                    <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-4 text-gray-400 text-xs select-none">guest@sandip-portfolio:~</span>
                    </div>

                    {/* Terminal Body */}
                    <div
                        className="p-6 h-96 overflow-y-auto cursor-text text-gray-300"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {history.map((line, index) => (
                            <div key={index} className="mb-2 whitespace-pre-wrap">
                                {line.type === 'input' ? (
                                    <div className="flex">
                                        <span className="text-green-500 mr-2">➜</span>
                                        <span className="text-blue-400 mr-2">~</span>
                                        <span>{line.content}</span>
                                    </div>
                                ) : line.type === 'error' ? (
                                    <div className="text-red-400">{line.content}</div>
                                ) : (
                                    <div className="text-gray-300">{line.content}</div>
                                )}
                            </div>
                        ))}

                        <div className="flex items-center">
                            <span className="text-green-500 mr-2">➜</span>
                            <span className="text-blue-400 mr-2">~</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none flex-1 text-gray-100 placeholder-transparent"
                                spellCheck="false"
                                autoComplete="off"
                            />
                        </div>
                        <div ref={bottomRef} />
                    </div>
                </div>
                <p className="text-center text-gray-500 mt-4 text-sm">
                    Try typing <span className="text-primary font-bold">help</span>
                </p>
            </div>
        </section>
    );
};

export default Terminal;
