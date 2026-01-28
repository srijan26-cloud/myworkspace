import React from 'react';
import { useOS } from '../context/OSContext';
import Sidebar from './layout/Sidebar';
import Window from './window/Window';
import ResumeApp from './apps/ResumeApp';
import MusicPlayerApp from './apps/MusicPlayerApp';
import { APPS } from '../constants/apps';
import { FileText, Music, Globe, MapPin, Braces, User } from 'lucide-react';
import BrowserApp from './apps/BrowserApp';
import LocateApp from './apps/LocateApp';
import SCCodeApp from './apps/SCCodeApp';
import KnowSrijanApp from './apps/KnowSrijanApp';

const DesktopIcon = ({ title, icon: Icon, onClick, colorClass = "from-blue-500 to-indigo-600" }) => (
    <button // Changed to button for accessibility
        onClick={onClick}
        className="flex flex-col items-center gap-2 w-24 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors group outline-none"
    >
        <div className={`w-14 h-14 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}>
            <Icon size={32} className="text-white" />
        </div>
        <span className="text-white text-xs font-medium drop-shadow-md text-center">{title}</span>
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
};

const Desktop = () => {
    // 1. Destructure windows from your OSContext
    const { openApp, windows } = useOS();

    return (
        <div className="fixed inset-0 w-full h-full bg-gray-900 overflow-hidden">
            {/* Wallpaper Layer */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black" />

            {/* Desktop Icons */}
            <div className="relative z-10 w-full h-full p-6 pb-20 md:pb-6 md:pr-20 flex flex-wrap content-start gap-6">
                <DesktopIcon
                    title={APPS.RESUME.title}
                    icon={FileText}
                    colorClass="from-blue-600 to-indigo-700"
                    onClick={() => openApp(APPS.RESUME.id, APPS.RESUME.title)}
                />
                <DesktopIcon
                    title={APPS.MUSIC.title}
                    icon={Music}
                    colorClass="from-fuchsia-600 to-purple-700"
                    onClick={() => openApp(APPS.MUSIC.id, APPS.MUSIC.title)}
                />
                <DesktopIcon
                    title={APPS.BROWSER.title}
                    icon={Globe}
                    colorClass="from-cyan-500 to-blue-600"
                    onClick={() => openApp(APPS.BROWSER.id, APPS.BROWSER.title)}
                />
                <DesktopIcon
                    title={APPS.LOCATE.title}
                    icon={MapPin}
                    colorClass="from-green-500 to-emerald-600"
                    onClick={() => openApp(APPS.LOCATE.id, APPS.LOCATE.title)}
                />
                <DesktopIcon
                    title={APPS.SC_CODE.title}
                    icon={Braces}
                    colorClass="from-yellow-500 to-orange-600"
                    onClick={() => openApp(APPS.SC_CODE.id, APPS.SC_CODE.title)}
                />
                <DesktopIcon
                    title={APPS.KNOW_SRIJAN.title}
                    icon={User}
                    colorClass="from-indigo-600 to-purple-800"
                    onClick={() => openApp(APPS.KNOW_SRIJAN.id, APPS.KNOW_SRIJAN.title)}
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
