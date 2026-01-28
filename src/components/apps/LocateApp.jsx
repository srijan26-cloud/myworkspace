import React from 'react';
import { MapPin, Navigation, Map as MapIcon, Globe, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const LocateApp = () => {
    // Bengaluru 560066 coordinates for Google Maps embed
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.156104278474!2d77.740003!3d12.953835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6f1a8e100d07%3A0x8e8a600c00000000!2sBengaluru%2C%20Karnataka%20560066!5e0!3m2!1sen!2sin!4v1706350000000!5m2!1sen!2sin&hl=en&night=1";

    return (
        <div className="w-full h-full flex flex-col bg-[#1a1a1a] text-gray-300 font-sans overflow-hidden">
            {/* Top Toolbar */}
            <div className="h-12 bg-[#2d2d2d] border-b border-black/20 flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <MapPin size={18} className="text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white leading-tight">Locate Srijan</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Bengaluru, IN • 560066</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
                        <Navigation size={16} />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
                        <MapIcon size={16} />
                    </button>
                </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative bg-[#0f0f0f]">
                <iframe
                    title="Srijan's Location"
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="opacity-90"
                />

                {/* Premium Location Overlay */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-6 right-6 w-64 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl z-10"
                >
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <Globe size={20} className="text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">Current Base</h4>
                            <p className="text-[11px] text-gray-400 leading-relaxed">
                                Bengaluru, Karnataka<br />
                                Whitefield Region<br />
                                Pin: 560066
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span>GPS ACTIVE</span>
                        </div>
                        <span>12.9538° N, 77.7400° E</span>
                    </div>
                </motion.div>

                {/* Footer Tip */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/5 rounded-full text-[10px] text-gray-400">
                    <Info size={12} className="text-blue-400" />
                    <span>Showing primary workspace region in Bengaluru</span>
                </div>
            </div>

            {/* Application Footer */}
            <div className="h-6 bg-[#2d2d2d] border-t border-black/20 flex items-center px-4 text-[9px] text-gray-500 uppercase tracking-widest leading-none shrink-0 overflow-hidden">
                Satellite Uplink Established • Latency: 24ms • Zone: IST
            </div>
        </div>
    );
};

export default LocateApp;
