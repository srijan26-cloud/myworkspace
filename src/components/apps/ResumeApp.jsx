import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, UserCheck, ShieldAlert } from 'lucide-react';

const ResumeApp = () => {
    const resumeFile = '/resume.pdf';
    const [isVerified, setIsVerified] = useState(false);
    const [step, setStep] = useState('prompt'); // 'prompt' | 'passcode'
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState(false);

    const handleVerify = (e) => {
        e.preventDefault();
        const secureKey = import.meta.env.VITE_RECRUITER_PASSCODE || '2611';
        if (passcode === secureKey) {
            setIsVerified(true);
            setError(false);
        } else {
            setError(true);
            setPasscode('');
            setTimeout(() => setError(false), 500);
        }
    };

    const handlePasscodeChange = (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        if (val.length <= 4) {
            setPasscode(val);
        }
    };

    if (!isVerified) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black font-sans relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

                <AnimatePresence mode="wait">
                    {step === 'prompt' ? (
                        <motion.div
                            key="prompt"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="z-10 flex flex-col items-center gap-8 p-12 bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl max-w-sm w-full mx-4"
                        >
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                                <UserCheck size={32} className="text-blue-400" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-black text-white uppercase tracking-widest">Access Protocol</h3>
                                <p className="text-zinc-500 text-xs font-bold leading-relaxed tracking-wider uppercase">Are you a recruiter looking for Srijan's professional profile?</p>
                            </div>
                            <div className="flex flex-col w-full gap-3">
                                <button
                                    onClick={() => setStep('passcode')}
                                    className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-zinc-200 transition-all active:scale-95"
                                >
                                    Identify as Recruiter
                                </button>
                                <button
                                    className="w-full py-4 bg-white/5 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl border border-white/5 hover:bg-white/10 transition-all"
                                >
                                    Standard Access
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="passcode"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="z-10 flex flex-col items-center gap-8 p-12 bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl max-w-sm w-full mx-4"
                        >
                            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                                <Lock size={32} className={`${error ? 'text-red-500' : 'text-zinc-400'} transition-colors`} />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-black text-white uppercase tracking-widest">Entry Key</h3>
                                <p className="text-zinc-500 text-[9px] font-black tracking-[0.2em] uppercase">Enter the recruiter passcode provided by Srijan</p>
                            </div>

                            <form onSubmit={handleVerify} className="w-full space-y-6">
                                <input
                                    type="password"
                                    inputMode="numeric"
                                    value={passcode}
                                    onChange={handlePasscodeChange}
                                    placeholder="••••"
                                    autoFocus
                                    maxLength={4}
                                    className={`w-full bg-black/40 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-4 text-center text-2xl tracking-[1em] text-white focus:outline-none focus:border-blue-500/50 transition-all font-mono`}
                                />
                                {error && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] text-red-500 font-black uppercase text-center tracking-widest">
                                        Access Denied: Invalid Key
                                    </motion.p>
                                )}
                                <div className="flex flex-col gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                                    >
                                        Verify Identity
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep('prompt')}
                                        className="text-zinc-600 text-[8px] font-black uppercase tracking-widest hover:text-zinc-400 transition-colors"
                                    >
                                        Back to selection
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )
                    }
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950">
            <div className="w-full h-full relative group">
                <object
                    data={resumeFile}
                    type="application/pdf"
                    className="w-full h-full"
                >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8 text-center bg-zinc-950 text-white font-sans">
                        <ShieldAlert size={48} className="text-zinc-700 mb-4" />
                        <p className="text-xl font-black uppercase tracking-widest">Embedded view blocked</p>
                        <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase max-w-xs">Your browser environment prevents direct PDF rendering.</p>
                        <a
                            href={resumeFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-zinc-200 transition-all shadow-xl"
                        >
                            Open External PDF
                        </a>
                    </div>
                </object>
            </div>
        </div>
    );
};

export default ResumeApp;
