import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../context/OSContext';
import Sidebar from './layout/Sidebar';
import Window from './window/Window';
import ResumeApp from './apps/ResumeApp';
import MusicPlayerApp from './apps/MusicPlayerApp';
import CodingBackground from './common/CodingBackground';
import { APPS } from '../constants/apps';
import { FileText, Music, Award, MapPin, Braces, Mail, User, Calendar as CalendarIcon, Terminal, Battery, Wifi, Signal, Home, Monitor } from 'lucide-react';
import CertiApp from './apps/CertiApp';
import LocateApp from './apps/LocateApp';
import SCCodeApp from './apps/SCCodeApp';
import ContactApp from './apps/ContactApp';
import AboutMeApp from './apps/AboutMeApp';
import CalendarApp from './apps/CalendarApp';
import TerminalApp from './apps/TerminalApp';

const DesktopIcon = ({ title, icon: Icon, onClick, colorClass = "from-zinc-800 to-black" }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-3 w-24 p-3 rounded-2xl hover:bg-white/[0.03] active:bg-white/[0.05] transition-all duration-300 group outline-none"
    >
        <div className="relative">
            <div className={`w-14 h-14 bg-gradient-to-br ${colorClass} backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:border-white/20 transition-all duration-500 overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                <Icon size={26} className="text-white drop-shadow-lg relative z-10" />
            </div>
        </div>
        <span className="text-zinc-400 text-[9px] font-black tracking-[0.2em] uppercase transition-colors group-hover:text-zinc-100">{title}</span>
    </button>
);

// Map IDs to Components for cleaner rendering
const COMPONENT_MAP = {
    [APPS.RESUME.id]: ResumeApp,
    [APPS.MUSIC.id]: MusicPlayerApp,
    [APPS.CERTI.id]: CertiApp,
    [APPS.LOCATE.id]: LocateApp,
    [APPS.SC_CODE.id]: SCCodeApp,
    [APPS.CONTACT.id]: ContactApp,
    [APPS.ABOUT_ME.id]: AboutMeApp,
    [APPS.CALENDAR.id]: CalendarApp,
    [APPS.TERMINAL.id]: TerminalApp,
};

const Desktop = () => {
    // 1. Destructure windows from your OSContext
    const { openApp, windows, logout } = useOS();
    const [isEdgePanelOpen, setIsEdgePanelOpen] = useState(false);

    const getAppIcon = (appId) => {
        if (appId === APPS.RESUME.id) return <FileText size={20} />;
        if (appId === APPS.MUSIC.id) return <Music size={20} />;
        if (appId === APPS.CERTI.id) return <Award size={20} />;
        if (appId === APPS.LOCATE.id) return <MapPin size={20} />;
        if (appId === APPS.CONTACT.id) return <Mail size={20} />;
        if (appId === APPS.ABOUT_ME.id) return <User size={20} />;
        if (appId === APPS.CALENDAR.id) return <CalendarIcon size={20} />;
        if (appId === APPS.TERMINAL.id) return <Terminal size={20} />;
        if (appId === APPS.SC_CODE.id) return <Braces size={20} />;
        return <Monitor size={20} />;
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-black overflow-hidden font-sans">
            {/* Wallpaper Layer */}
            <CodingBackground />

            {/* Desktop Icons */}
            <div className="relative z-10 w-full h-full p-6 pt-12 pb-24 md:pb-6 md:pr-24 flex flex-wrap content-start justify-center md:justify-start gap-4 md:gap-8 capitalize">
                <DesktopIcon
                    title={APPS.RESUME.title}
                    icon={FileText}
                    colorClass="from-blue-600/80 to-indigo-900/90"
                    onClick={() => openApp(APPS.RESUME.id, APPS.RESUME.title)}
                />
                <DesktopIcon
                    title={APPS.MUSIC.title}
                    icon={Music}
                    colorClass="from-fuchsia-600/80 to-purple-900/90"
                    onClick={() => openApp(APPS.MUSIC.id, APPS.MUSIC.title)}
                />
                <DesktopIcon
                    title={APPS.CERTI.title}
                    icon={Award}
                    colorClass="from-cyan-500/80 to-blue-800/90"
                    onClick={() => openApp(APPS.CERTI.id, APPS.CERTI.title)}
                />
                <DesktopIcon
                    title={APPS.LOCATE.title}
                    icon={MapPin}
                    colorClass="from-green-500/80 to-emerald-900/90"
                    onClick={() => openApp(APPS.LOCATE.id, APPS.LOCATE.title)}
                />
                <DesktopIcon
                    title={APPS.SC_CODE.title}
                    icon={Braces}
                    colorClass="from-yellow-500/80 to-orange-800/90"
                    onClick={() => openApp(APPS.SC_CODE.id, APPS.SC_CODE.title)}
                />
                <DesktopIcon
                    title={APPS.CONTACT.title}
                    icon={Mail}
                    colorClass="from-indigo-600/80 to-purple-900/90"
                    onClick={() => openApp(APPS.CONTACT.id, APPS.CONTACT.title)}
                />
                <DesktopIcon
                    title={APPS.ABOUT_ME.title}
                    icon={User}
                    colorClass="from-emerald-600/80 to-teal-900/90"
                    onClick={() => openApp(APPS.ABOUT_ME.id, APPS.ABOUT_ME.title)}
                />
                <DesktopIcon
                    title={APPS.CALENDAR.title}
                    icon={CalendarIcon}
                    colorClass="from-rose-500/80 to-red-900/90"
                    onClick={() => openApp(APPS.CALENDAR.id, APPS.CALENDAR.title)}
                />
                <DesktopIcon
                    title={APPS.TERMINAL.title}
                    icon={Terminal}
                    colorClass="from-gray-700/80 to-black/90"
                    onClick={() => openApp(APPS.TERMINAL.id, APPS.TERMINAL.title)}
                />
            </div>

            {/* Window Layer */}
            {windows.map((win) => {
                const SelectedComponent = COMPONENT_MAP[win.appId];
                return (
                    <Window key={win.id} window={win}>
                        {SelectedComponent ? (
                            <SelectedComponent />
                        ) : (
                            <p className="p-4 text-white">App content not found for {win.appId}.</p>
                        )}
                    </Window>
                );
            })}

            <Sidebar />

            {/* Edge Panel for Mobile Desktop */}
            {!isEdgePanelOpen && (
                <motion.div
                    className="md:hidden fixed top-0 right-0 w-8 h-full z-[90] touch-none cursor-pointer"
                    onPointerDown={(e) => e.stopPropagation()}
                    onPan={(event, info) => {
                        if (info.offset.x < -20) {
                            setIsEdgePanelOpen(true);
                        }
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEdgePanelOpen(true);
                    }}
                >
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[5px] h-24 bg-white/20 hover:bg-white/40 transition-colors rounded-l-md shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                </motion.div>
            )}

            <AnimatePresence>
                {isEdgePanelOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 z-[95] bg-black/40 backdrop-blur-sm touch-none"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEdgePanelOpen(false);
                            }}
                        />
                        {/* Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={{ right: 0.5, left: 0 }}
                            onDragEnd={(e, { offset, velocity }) => {
                                if (offset.x > 30 || velocity.x > 300) {
                                    setIsEdgePanelOpen(false);
                                }
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="md:hidden fixed top-0 right-0 h-full w-24 bg-zinc-950/80 backdrop-blur-2xl border-l border-white/10 z-[100] flex flex-col items-center py-6 overflow-y-auto"
                        >
                            <div className="w-1.5 h-10 bg-white/20 rounded-full mb-8 mt-4 hover:bg-white/30 transition-colors cursor-grab active:cursor-grabbing" />
                            <div className="flex flex-col gap-6 px-2 w-full items-center pb-20">
                                {/* Home app button */}
                                <div className="flex flex-col items-center gap-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsEdgePanelOpen(false);
                                            logout();
                                        }}
                                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-white/5 transition-all transform hover:scale-105 shrink-0"
                                        title="Home (Log Out)"
                                    >
                                        <Home size={20} />
                                    </button>
                                    <span className="text-[9px] text-white/60 font-medium text-center leading-tight">Home</span>
                                </div>

                                {Object.values(APPS).map((app) => (
                                    <div key={app.id} className="flex flex-col items-center gap-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsEdgePanelOpen(false);
                                                setTimeout(() => openApp(app.id, app.title), 300);
                                            }}
                                            className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white border border-white/5 transition-all transform hover:scale-105 shrink-0"
                                            title={app.title}
                                        >
                                            {getAppIcon(app.id)}
                                        </button>
                                        <span className="text-[9px] text-white/50 font-medium text-center leading-tight max-w-[50px] truncate">{app.title}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Desktop;
