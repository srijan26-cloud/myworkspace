import React, { useState } from 'react';
import { ExternalLink, Code2, Github, Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

const SCCodeApp = () => {
    const leetcodeUrl = 'https://leetcode.com/u/srijan_chandra/';
    const githubUrl = 'https://github.com/srijan26-cloud';

    return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em]">Coding Profiles</h2>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Mastery & Repositories</p>
                </div>

                <div className="grid gap-4">
                    {/* LeetCode Card */}
                    <motion.a
                        href={leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        className="p-6 bg-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl group transition-all block"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/20">
                                    <Code2 size={24} className="text-yellow-500" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Problem Solving</p>
                                    <p className="text-sm font-medium text-white tracking-wide">LeetCode Profile</p>
                                </div>
                            </div>
                            <div className="p-3 bg-white/5 group-hover:bg-white/10 rounded-xl transition-colors border border-white/5">
                                <ExternalLink size={18} className="text-zinc-400" />
                            </div>
                        </div>
                    </motion.a>

                    {/* GitHub Card */}
                    <motion.a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        className="p-6 bg-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl group transition-all block"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                    <Github size={24} className="text-white" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Version Control</p>
                                    <p className="text-sm font-medium text-white tracking-wide">GitHub Profile</p>
                                </div>
                            </div>
                            <div className="p-3 bg-white/5 group-hover:bg-white/10 rounded-xl transition-colors border border-white/5">
                                <ExternalLink size={18} className="text-zinc-400" />
                            </div>
                        </div>
                    </motion.a>
                </div>
            </div>
        </div>
    );
};

export default SCCodeApp;
