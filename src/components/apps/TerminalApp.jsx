import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { APPS } from '../../constants/apps';

const TerminalApp = () => {
    const [history, setHistory] = useState([
        { type: 'output', text: 'Terminal v1.0.0' },
        { type: 'output', text: 'Type --help for available commands' },
        { type: 'output', text: '' }
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const inputRef = useRef(null);
    const terminalEndRef = useRef(null);
    const { openApp } = useOS();

    // Auto-scroll to bottom when history updates
    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Focus input on mount and when clicking terminal
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const getAppList = () => {
        return Object.values(APPS).map(app => ({
            id: app.id,
            title: app.title
        }));
    };

    const handleCommand = (command) => {
        const trimmedCommand = command.trim();

        // Add command to history
        setHistory(prev => [...prev, { type: 'input', text: `$ ${trimmedCommand}` }]);

        if (!trimmedCommand) {
            setHistory(prev => [...prev, { type: 'output', text: '' }]);
            return;
        }

        if (trimmedCommand === '--help') {
            const helpText = [
                '',
                'Available Commands:',
                '  run <app-name>  - Open the specified application',
                '  --help          - Show this help message',
                '',
                'Available Apps:',
                ...getAppList().map(app => `  - ${app.id.padEnd(15)} (${app.title})`),
                '',
                'Example:',
                '  $ run resume',
                '  $ run music',
                ''
            ];
            setHistory(prev => [...prev, ...helpText.map(text => ({ type: 'output', text }))]);
        } else if (trimmedCommand.startsWith('run ')) {
            const appName = trimmedCommand.substring(4).trim().toLowerCase();
            const app = Object.values(APPS).find(a => a.id.toLowerCase() === appName);

            if (app) {
                setHistory(prev => [...prev,
                { type: 'output', text: `Opening ${app.title}...` },
                { type: 'output', text: '' }
                ]);
                // Open the app
                setTimeout(() => {
                    openApp(app.id, app.title);
                }, 300);
            } else {
                setHistory(prev => [...prev,
                { type: 'error', text: `Error: App '${appName}' not found` },
                { type: 'output', text: 'Type --help to see available apps' },
                { type: 'output', text: '' }
                ]);
            }
        } else {
            setHistory(prev => [...prev,
            { type: 'error', text: `Command not found: ${trimmedCommand}` },
            { type: 'output', text: 'Type --help to see available commands' },
            { type: 'output', text: '' }
            ]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(currentInput);
            setCurrentInput('');
        }
    };

    return (
        <div
            className="w-full h-full bg-black/95 text-green-400 font-mono text-sm p-4 overflow-y-auto cursor-text"
            onClick={handleTerminalClick}
        >
            <div className="space-y-1">
                {history.map((entry, index) => (
                    <div
                        key={index}
                        className={`
                            ${entry.type === 'input' ? 'text-green-300 font-semibold' : ''}
                            ${entry.type === 'error' ? 'text-red-400' : ''}
                            ${entry.type === 'output' ? 'text-green-400/80' : ''}
                        `}
                    >
                        {entry.text}
                    </div>
                ))}

                {/* Current input line */}
                <div className="flex items-center gap-2">
                    <span className="text-green-300 font-semibold">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>

                <div ref={terminalEndRef} />
            </div>
        </div>
    );
};

export default TerminalApp;
