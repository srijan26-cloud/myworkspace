import React from 'react';
import { useOS } from '../../context/OSContext';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';

const Window = ({ window, children }) => {
    const { closeWindow, minimizeWindow, focusWindow } = useOS();
    const { id, appId, title, isMinimized, zIndex } = window;

    // Check for mobile viewport - or just use CSS classes for layout and assume functionality follows
    const isMobile = window.innerWidth < 768; // Simple check for initial render, better to use CSS + Resize listener or media query hook if strictly needed for logic. 
    // However, for framer motion `drag`, we can pass `drag={!isMobile}`? 
    // A better CSS-only approach for layout:
    // Mobile: class `fixed inset-0 w-full h-full`
    // Desktop: class `absolute w-[600px] h-[400px]`
    // But Framer Motion animations need to know sizes. 

    return (
        <motion.div
            drag={window.innerWidth >= 768}
            dragMomentum={false}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, zIndex }}
            onMouseDown={() => focusWindow(id)}
            className={`
        bg-gray-900 border-gray-700 shadow-2xl overflow-hidden flex flex-col
        fixed inset-0 w-full h-full rounded-none md:absolute md:w-[600px] md:h-auto md:min-h-[400px] md:max-h-[85vh] md:rounded-lg md:border
        ${isMinimized ? 'hidden' : ''}
      `}
            style={{
                zIndex,
                top: window.innerWidth >= 768 ? '5rem' : '0',
                left: window.innerWidth >= 768 ? '5rem' : '0'
            }}
        >
            {/* Title Bar */}
            <div className="h-12 md:h-10 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 cursor-move select-none shrink-0"
                onPointerDown={(e) => {
                    // e.stopPropagation(); 
                }}
            >
                <span className="text-sm font-medium text-gray-200">{title}</span>
                <div className="flex items-center gap-4 md:gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                        className="p-2 md:p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                        title="Minimize"
                    >
                        <Minus size={18} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        className="p-2 md:p-1 hover:bg-red-500/20 hover:text-red-400 rounded text-gray-400 transition-colors"
                        title="Close"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto bg-gray-900/90 relative cursor-default custom-scrollbar"
                onMouseDown={(e) => e.stopPropagation()} // Stop drag when clicking content?
            >
                {children}
            </div>
        </motion.div>
    );
};

export default Window;
