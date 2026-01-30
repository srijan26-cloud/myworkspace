import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Power, Monitor, Music, FileText, Globe, MapPin } from 'lucide-react';
import { APPS } from '../../constants/apps';
import SidebarClock from '../common/SidebarClock';
import Calendar from '../common/Calendar';

const AppIcon = ({ appId }) => {
    if (appId === APPS.RESUME.id) return <FileText size={20} />;
    if (appId === APPS.MUSIC.id) return <Music size={20} />;
    if (appId === APPS.BROWSER.id) return <Globe size={20} />;
    if (appId === APPS.LOCATE.id) return <MapPin size={20} />;
    return <Monitor size={20} />;
};

const Sidebar = () => {
    const { logout, recentApps, windows, restoreWindow, activeWindowId, openApp } = useOS();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleClockClick = () => {
        if (window.innerWidth < 768) {
            openApp(APPS.CALENDAR.id, APPS.CALENDAR.title);
        } else {
            setIsCalendarOpen(!isCalendarOpen);
        }
    };

    const hasActiveWindow = windows.some(win => !win.isMinimized);

    return (
        <>
            <div className={`fixed bottom-0 left-0 w-full h-20 md:top-0 md:right-0 md:bottom-auto md:left-auto md:w-24 md:h-full bg-zinc-950/40 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/10 flex flex-row md:flex-col items-center justify-between md:justify-start py-4 md:py-8 px-6 md:px-0 z-50 transition-transform duration-500 ease-in-out ${hasActiveWindow ? 'translate-y-full md:translate-y-0 opacity-0 md:opacity-100' : 'translate-y-0 opacity-100'}`}>

                {/* Clock Section */}
                <SidebarClock onClick={handleClockClick} />

                {/* Minimized/Active Apps Section */}
                <div className="flex flex-row md:flex-col gap-4 items-center overflow-x-auto md:overflow-visible">
                    {windows.map(win => (
                        <button
                            key={win.id}
                            onClick={() => restoreWindow(win.id)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all shrink-0 ${win.isMinimized ? 'bg-white/5 opacity-50' : 'bg-white/20'
                                } ${activeWindowId === win.id ? 'ring-2 ring-blue-400' : ''}`}
                            title={win.title}
                        >
                            <AppIcon appId={win.appId} />
                        </button>
                    ))}
                </div>

                {/* Logoff Button */}
                <div className="flex items-center gap-4 md:flex-col md:mt-auto md:pb-6">
                    <button
                        onClick={logout}
                        className="p-2.5 text-white/40 hover:text-red-400 bg-white/5 border border-white/10 hover:border-red-500/50 rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] group"
                        title="Logoff"
                    >
                        <Power size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Calendar Popover */}
            {isCalendarOpen && (
                <>
                    {/* Backdrop to close when clicking outside */}
                    <div
                        className="fixed inset-0 z-50 bg-black/5"
                        onClick={() => setIsCalendarOpen(false)}
                    />
                    <div className="fixed z-[60] bottom-20 right-4 md:bottom-auto md:top-6 md:right-24">
                        <Calendar onClose={() => setIsCalendarOpen(false)} />
                    </div>
                </>
            )}
        </>
    );
};

export default Sidebar;
