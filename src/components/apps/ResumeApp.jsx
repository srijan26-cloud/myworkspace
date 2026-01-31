import React from 'react';
import { ShieldAlert } from 'lucide-react';

const ResumeApp = () => {
    const resumeFile = '/resume.pdf';

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
