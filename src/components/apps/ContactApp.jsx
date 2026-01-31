import React from 'react';
import { Mail, Linkedin, ExternalLink, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactApp = () => {
    const email = "srijanchandra.work@gmail.com";
    const linkedin = "https://www.linkedin.com/in/srijan-chandra-26469b1a8/";
    const [copied, setCopied] = React.useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em]">Contact Protocol</h2>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Available for professional inquiries</p>
                </div>

                <div className="grid gap-4">
                    {/* Email Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-6 bg-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl group transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                                    <Mail size={24} className="text-blue-400" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Email Address</p>
                                    <p className="text-sm font-medium text-white tracking-wide">{email}</p>
                                </div>
                            </div>
                            <button
                                onClick={copyEmail}
                                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5"
                                title="Copy Email"
                            >
                                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-zinc-400" />}
                            </button>
                        </div>
                    </motion.div>

                    {/* LinkedIn Card */}
                    <motion.a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        className="p-6 bg-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl group transition-all block"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                                    <Linkedin size={24} className="text-indigo-400" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Professional Network</p>
                                    <p className="text-sm font-medium text-white tracking-wide">LinkedIn Profile</p>
                                </div>
                            </div>
                            <div className="p-3 bg-white/5 group-hover:bg-white/10 rounded-xl transition-colors border border-white/5">
                                <ExternalLink size={18} className="text-zinc-400" />
                            </div>
                        </div>
                    </motion.a>
                </div>

                <div className="pt-8 text-center">
                    <div className="inline-block px-4 py-2 bg-zinc-900/80 border border-white/5 rounded-full">
                        <span className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.3em]">System Response Time: &lt; 24h</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactApp;
