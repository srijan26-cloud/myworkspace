import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '../context/OSContext';
import Sidebar from './layout/Sidebar';
import Window from './window/Window';
import ResumeApp from './apps/ResumeApp';
import MusicPlayerApp from './apps/MusicPlayerApp';
import CodingBackground from './common/CodingBackground';
import { APPS } from '../constants/apps';
import { FileText, Music, Globe, MapPin, Braces, User, Calendar as CalendarIcon, Battery, Wifi, Signal } from 'lucide-react';
import BrowserApp from './apps/BrowserApp';
import LocateApp from './apps/LocateApp';
import SCCodeApp from './apps/SCCodeApp';
import KnowSrijanApp from './apps/KnowSrijanApp';
import CalendarApp from './apps/CalendarApp';

const StatusBar = () => (
    <div className="fixed top-0 left-0 right-0 h-12 z-[100] px-6 flex items-center justify-center pointer-events-none">
        {/* Center: Dynamic Island */}
        <motion.div
            initial={{ width: 120, height: 26 }}
            whileHover={{ width: 220, height: 34 }}
            className="flex bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto cursor-pointer"
        >
            <div className="flex items-center gap-2 px-6 transition-all duration-300">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em]">System Active</span>
            </div>
        </motion.div>
    </div>
);

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
    [APPS.BROWSER.id]: BrowserApp,
    [APPS.LOCATE.id]: LocateApp,
    [APPS.SC_CODE.id]: SCCodeApp,
    [APPS.KNOW_SRIJAN.id]: KnowSrijanApp,
    [APPS.CALENDAR.id]: CalendarApp,
};

const Desktop = () => {
    // 1. Destructure windows from your OSContext
    const { openApp, windows } = useOS();

    return (
        <div className="fixed inset-0 w-full h-full bg-black overflow-hidden font-sans">
            <StatusBar />
            {/* Wallpaper Layer */}
            <CodingBackground />

            {/* Desktop Icons */}
            <div className="relative z-10 w-full h-full p-6 pt-12 pb-24 md:pb-6 md:pr-24 flex flex-wrap content-start gap-4 md:gap-8 capitalize">
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
                    title={APPS.BROWSER.title}
                    icon={Globe}
                    colorClass="from-cyan-500/80 to-blue-800/90"
                    onClick={() => openApp(APPS.BROWSER.id, APPS.BROWSER.title)}
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
                    title={APPS.KNOW_SRIJAN.title}
                    icon={User}
                    colorClass="from-indigo-600/80 to-purple-900/90"
                    onClick={() => openApp(APPS.KNOW_SRIJAN.id, APPS.KNOW_SRIJAN.title)}
                />
                <DesktopIcon
                    title={APPS.CALENDAR.title}
                    icon={CalendarIcon}
                    colorClass="from-rose-500/80 to-red-900/90"
                    onClick={() => openApp(APPS.CALENDAR.id, APPS.CALENDAR.title)}
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
        </div>
    );
};

export default Desktop;
