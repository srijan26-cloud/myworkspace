import React from 'react';
import { motion } from 'framer-motion';

const CodingBackground = () => {
    return (
        <div className="absolute inset-0 z-0 bg-black overflow-hidden select-none pointer-events-none">
            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] contrast-150 brightness-150 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Nothing OS Dot Matrix Grid */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Ambient Glassy Orbs */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        opacity: [0.05, 0.08, 0.05]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[10%] left-[20%] w-[50%] h-[50%] bg-white/20 rounded-full blur-[140px]"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -50, 0],
                        opacity: [0.03, 0.06, 0.03]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
                    className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-zinc-400/20 rounded-full blur-[140px]"
                />
            </div>

            {/* Central Focal Point Gradient */}
            <div className="absolute inset-0 bg-radial-at-center from-zinc-900/10 via-black to-black opacity-60" />

            {/* Very Subtle Moving Scanline */}
            <motion.div
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[30vh] bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none"
            />
        </div>
    );
};

export default CodingBackground;
