import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarClock = ({ onClick }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const weekday = currentTime.toLocaleDateString('en-US', { weekday: 'short' });

    return (
        <button
            onClick={onClick}
            className="relative flex flex-col items-center justify-center py-3 px-4 md:px-2 md:mb-8 transition-opacity hover:opacity-100 group outline-none"
        >
            <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] md:text-[10px] font-black text-zinc-500 tracking-[0.3em] uppercase mb-2"
            >
                {weekday}
            </motion.span>

            <div className="flex flex-col items-center">
                <span className="text-base md:text-lg font-bold text-white tracking-widest font-mono">
                    {formatTime(currentTime).split(' ')[0]}
                    <span className="text-[10px] ml-1.5 opacity-40 font-bold uppercase tracking-widest">
                        {formatTime(currentTime).split(' ')[1]}
                    </span>
                </span>
            </div>

            <span className="hidden md:block text-[9px] text-white/20 font-black mt-2 tracking-[0.2em]">
                {formatDate(currentTime)}
            </span>
        </button>
    );
};

export default SidebarClock;
