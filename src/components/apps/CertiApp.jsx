import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const CertiApp = () => {
    // Generate certificate data for JPGs
    const certificates = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        src: `/certi_${i + 1}_page-0001.jpg`,
    }));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = certificates.length - 1;
            if (nextIndex >= certificates.length) nextIndex = 0;
            return nextIndex;
        });
    };

    // Preload images
    const [imagesLoaded, setImagesLoaded] = useState({});

    React.useEffect(() => {
        certificates.forEach((cert) => {
            const img = new Image();
            img.src = cert.src;
            img.onload = () => {
                setImagesLoaded(prev => ({ ...prev, [cert.id]: true }));
            };
        });
    }, [certificates]);

    return (
        <div className="w-full h-full bg-zinc-900 flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="h-16 bg-zinc-950/90 backdrop-blur-md border-b border-white/10 flex items-center px-6 justify-between z-10 shrink-0">
                <h2 className="text-xl font-light tracking-widest text-white uppercase">Certifications</h2>
                <div className="text-xs text-zinc-500 font-mono">
                    {currentIndex + 1} / {certificates.length}
                </div>
            </div>

            {/* Gallery Container - Full Screen */}
            <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                    >
                        {/* Loading Indicator */}
                        {!imagesLoaded[certificates[currentIndex].id] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-20">
                                <div className="w-8 h-8 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin" />
                            </div>
                        )}

                        {/* 
                           Using img tag for simple rendering of JPGs.
                           object-contain ensures the full certificate is visible without cropping.
                        */}
                        <img
                            src={certificates[currentIndex].src}
                            alt={`Certificate ${currentIndex + 1}`}
                            className="w-full h-full object-contain pointer-events-none"
                            onLoad={() => setImagesLoaded(prev => ({ ...prev, [certificates[currentIndex].id]: true }))}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors border border-white/10 backdrop-blur-md group"
                    onClick={() => paginate(-1)}
                >
                    <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors border border-white/10 backdrop-blur-md group"
                    onClick={() => paginate(1)}
                >
                    <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default CertiApp;
