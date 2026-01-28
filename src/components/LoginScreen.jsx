import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../context/OSContext';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu } from 'lucide-react';

const LoadingScreen = () => {
    const [statusIndex, setStatusIndex] = useState(0);
    const statuses = [
        "Initializing kernel...",
        "Loading system assets...",
        "Verifying encrypted sectors...",
        "Establishing secure connection...",
        "Ready."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex(prev => (prev < statuses.length - 1 ? prev + 1 : prev));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]"
        >
            <div className="relative">
                {/* Rotating Loader */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-t-2 border-r-2 border-blue-500/50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Cpu size={32} className="text-blue-500" />
                    </motion.div>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <p className="text-[10px] text-blue-400 font-mono tracking-[0.2em] uppercase">
                    System Boot
                </p>
                <motion.p
                    key={statusIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] text-zinc-500 font-mono uppercase tracking-[0.1em]"
                >
                    {statuses[statusIndex]}
                </motion.p>
            </div>
        </motion.div>
    );
};

const LoginScreen = () => {
    const { login } = useOS();
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);

    // Rotation state
    const rotation = useMotionValue(0);
    const lastAngle = useRef(0);
    const accumulatedRotation = useRef(0);
    const lastImgUpdateRotation = useRef(0);

    const images = ['/img1.jpg', '/img2.png', '/img3.jpg'];

    useEffect(() => {
        // Preload images
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        const img = new Image();
        img.src = images[0];
        img.onload = () => {
            setTimeout(() => setIsLoaded(true), 1500);
        };
    }, []);

    // Auto-rotation effect
    useEffect(() => {
        let frame;
        const animate = () => {
            if (!isInteracting) {
                const current = rotation.get();
                const next = current + 0.5; // Very slow rotation
                rotation.set(next);

                // Update image based on accumulated rotation
                if (next - lastImgUpdateRotation.current >= 360) {
                    setActiveImgIndex((prev) => (prev + 1) % images.length);
                    lastImgUpdateRotation.current = next;
                }
            }
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [isInteracting, images.length]);

    const handleInteraction = (clientX, clientY) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let currentAngle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
        if (currentAngle < 0) currentAngle += 360;

        let delta = currentAngle - lastAngle.current;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        const newRotation = rotation.get() + delta;
        rotation.set(newRotation);

        lastAngle.current = currentAngle;

        // Update image if we've crossed a 360 threshold
        if (Math.abs(newRotation - lastImgUpdateRotation.current) >= 360) {
            const direction = newRotation > lastImgUpdateRotation.current ? 1 : -1;
            setActiveImgIndex((prev) => (prev + direction + images.length) % images.length);
            lastImgUpdateRotation.current = newRotation;
        }
    };

    const onPointerDown = (e) => {
        setIsInteracting(true);
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        if (startAngle < 0) startAngle += 360;
        lastAngle.current = startAngle;
    };

    const onPointerMove = (e) => {
        if (!isInteracting) return;
        handleInteraction(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
        setIsInteracting(false);
        // Sync lastImgUpdateRotation to prevent jumps when auto-rotation resumes
        lastImgUpdateRotation.current = rotation.get();
    };

    return (
        <div
            className="w-full h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden select-none touch-none"
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
        >
            <AnimatePresence>
                {!isLoaded && <LoadingScreen key="loader" />}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black z-0" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
                transition={{ duration: 1 }}
                className="z-10 flex flex-col items-center gap-12"
            >
                <div className="relative group">
                    {/* Decorative Outer Rings */}
                    <div className="absolute inset-[-40px] rounded-full border border-white/5 pointer-events-none" />
                    <div className="absolute inset-[-60px] rounded-full border border-white/5 pointer-events-none opacity-50" />

                    {/* Rotating Ring SVG */}
                    <svg
                        className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none overflow-visible"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' }}
                    >
                        <motion.circle
                            cx="50%"
                            cy="50%"
                            r="115"
                            fill="none"
                            stroke="url(#ringGradient)"
                            strokeWidth="3"
                            strokeDasharray="100 300"
                            strokeLinecap="round"
                            style={{ rotate: rotation }}
                        />
                        <defs>
                            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#9333ea" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Image Container */}
                    <div
                        ref={containerRef}
                        onPointerDown={onPointerDown}
                        className="relative w-48 h-48 md:w-56 md:h-56 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center p-1.5 bg-zinc-900 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                        {images.map((img, idx) => (
                            <motion.img
                                key={img}
                                src={img}
                                className="absolute inset-0 w-full h-full object-cover rounded-full pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: activeImgIndex === idx ? 1 : 0,
                                    scale: activeImgIndex === idx ? 1 : 1.1,
                                }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                        ))}
                        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.7)] pointer-events-none border border-white/5" />
                    </div>

                    {/* Glow effect */}
                    <motion.div
                        animate={{
                            opacity: isInteracting ? [0.15, 0.3, 0.15] : [0.05, 0.1, 0.05],
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute inset-[-50px] bg-blue-500/10 blur-3xl rounded-full -z-10"
                    />
                </div>

                <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-3xl font-extralight text-white tracking-[0.4em] uppercase">
                            Srijan
                        </h1>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-medium">
                            Authorized Access Only
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={login}
                        className="flex items-center gap-3 px-10 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl rounded-full transition-all group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <ShieldCheck size={18} className="text-blue-500" />
                        <span className="text-xs font-bold text-white tracking-[0.2em] uppercase">
                            Launch Interface
                        </span>
                    </motion.button>
                </div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[8px] text-zinc-700 uppercase tracking-[0.8em] font-black">
                Terminal V2.4.0
            </div>
        </div>
    );
};


export default LoginScreen;
