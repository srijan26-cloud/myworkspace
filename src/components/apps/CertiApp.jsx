import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const CertiApp = () => {
    // Generate certificate data for PDFs
    const certificates = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        src: `/certi_${i + 1}.pdf`,
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

    return (
        <div className="w-full h-full bg-zinc-900 flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="h-16 bg-zinc-950/50 backdrop-blur-md border-b border-white/10 flex items-center px-6 justify-between z-10">
                <h2 className="text-xl font-light tracking-widest text-white uppercase">Certifications</h2>
                <div className="text-xs text-zinc-500 font-mono">
                    {currentIndex + 1} / {certificates.length}
                </div>
            </div>

            {/* Gallery Container */}
            <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
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
                        className="absolute w-full max-w-5xl h-[80%] bg-black rounded-lg shadow-2xl overflow-hidden border border-white/10 flex items-center justify-center"
                    >
                        <iframe
                            src={`${certificates[currentIndex].src}#toolbar=0&navpanes=0&scrollbar=0`}
                            className="w-full h-full border-none"
                            title={`Certificate ${currentIndex + 1}`}
                        />
                        {/* Transparent overlay to capture drag events over the iframe */}
                        <div className="absolute inset-0 bg-transparent" />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons - placed outside the moving container to be always clickable */}
                <button
                    className="absolute left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors border border-white/10 backdrop-blur-md"
                    onClick={() => paginate(-1)}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    className="absolute right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors border border-white/10 backdrop-blur-md"
                    onClick={() => paginate(1)}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default CertiApp;
