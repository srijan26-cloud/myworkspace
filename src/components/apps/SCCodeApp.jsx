import React, { useState } from 'react';
import { ExternalLink, Code2, AlertCircle } from 'lucide-react';

const SCCodeApp = () => {
    const leetcodeUrl = 'https://leetcode.com/u/srijan_chandra/';
    const [iframeError, setIframeError] = useState(false);

    return (
        <div className="w-full h-full flex flex-col bg-[#0f0f0f] text-white overflow-hidden">
            {/* Toolbar/Header */}
            <div className="h-10 bg-[#1a1a1a] border-b border-white/5 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-2">
                    <Code2 size={16} className="text-yellow-500" />
                    <span className="text-xs font-medium text-gray-400">LeetCode Profile</span>
                </div>
                <a
                    href={leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-md transition-all group"
                >
                    <span className="text-[10px] font-bold text-gray-300">Open External</span>
                    <ExternalLink size={12} className="text-gray-400 group-hover:text-white" />
                </a>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative">
                {!iframeError ? (
                    <iframe
                        src={leetcodeUrl}
                        title="LeetCode Profile"
                        className="w-full h-full border-none"
                        onError={() => setIframeError(true)}
                        sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#0f0f0f]">
                        <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20">
                            <AlertCircle size={32} className="text-yellow-500" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Iframe Access Restricted</h2>
                        <p className="text-sm text-gray-400 max-w-xs mb-8">
                            LeetCode restricts direct embedding for security. Please use the button below to view the profile.
                        </p>
                        <a
                            href={leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2"
                        >
                            View on LeetCode
                            <ExternalLink size={18} />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SCCodeApp;
