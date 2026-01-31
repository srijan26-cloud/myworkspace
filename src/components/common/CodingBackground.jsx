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

            {/* Ambient Glassy Orbs (Static) */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-[10%] left-[20%] w-[50%] h-[50%] bg-white/[0.03] rounded-full blur-[140px]"
                />
                <div
                    className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-zinc-400/[0.02] rounded-full blur-[140px]"
                />
            </div>

            {/* Central Focal Point Gradient */}
            <div className="absolute inset-0 bg-radial-at-center from-zinc-900/5 via-black to-black opacity-60" />
        </div>
    );
};

export default CodingBackground;
