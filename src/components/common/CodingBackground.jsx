import React from 'react';
import { motion } from 'framer-motion';

const CodingBackground = () => {
    const codeFragments = [
        '{ }', '=>', '[ ]', '( )', 'const', 'import', 'export', 'void',
        'null', 'true', 'async', 'await', 'git push', 'while', 'for'
    ];

    // Pre-generate stable positions to avoid hydration mismatches or random jumps
    const fragments = Array.from({ length: 20 }).map((_, i) => ({
        text: codeFragments[i % codeFragments.length],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 5
    }));

    return (
        <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden select-none pointer-events-none">
            {/* Base Coder Gradient - Vibrant fallback */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a2e] via-[#1a0a2e] to-black opacity-100" />

            {/* Glowing Depth Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/40 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/40 rounded-full blur-[120px]"
                />
            </div>

            {/* Interactive Grid */}
            <div
                className="absolute inset-0 opacity-[0.1]"
                style={{
                    backgroundImage: `linear-gradient(rgba(79, 70, 229, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.2) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            />

            {/* Floating Fragments */}
            <div className="absolute inset-0">
                {fragments.map((frag, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 0 }}
                        animate={{
                            opacity: [0, 0.2, 0],
                            y: [0, -40, 0]
                        }}
                        transition={{
                            duration: frag.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: frag.delay
                        }}
                        className="absolute font-mono text-[10px] text-blue-300/40 whitespace-nowrap"
                        style={{ left: frag.left, top: frag.top }}
                    >
                        {frag.text}
                    </motion.div>
                ))}
            </div>

            {/* Subtle Pulse Scanline */}
            <motion.div
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[2px] bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] opacity-10"
            />
        </div>
    );
};

export default CodingBackground;
