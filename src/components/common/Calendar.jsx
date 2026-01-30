import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ onClose, isApp = false }) => {
    const today = new Date();
    const [viewDate, setViewDate] = useState(today);
    const [showEvents, setShowEvents] = useState(false);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    // Previous month placeholders
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`prev-${i}`} className="h-10 w-10 md:h-12 md:w-12" />);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        days.push(
            <div
                key={day}
                className={`h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-lg text-sm md:text-base transition-colors
                    ${isToday ? 'bg-blue-600 text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'hover:bg-white/10 text-gray-300'}`}
            >
                {day}
            </div>
        );
    }

    const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
    const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const nextYear = () => setViewDate(new Date(year + 1, month, 1));
    const prevYear = () => setViewDate(new Date(year - 1, month, 1));

    return (
        <div
            className={`
                bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-300
                ${isApp ? 'w-full h-full flex flex-col p-6' : 'rounded-2xl p-5 w-[320px] md:w-[380px]'}
            `}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-xl md:text-2xl">{monthNames[month]}</span>
                        <div className="flex items-center bg-white/5 rounded-lg px-2 py-1">
                            <button onClick={prevYear} className="p-1 hover:text-blue-400 transition-colors">
                                <ChevronLeft size={14} />
                            </button>
                            <span className="text-blue-400 font-mono text-sm md:text-base px-2">{year}</span>
                            <button onClick={nextYear} className="p-1 hover:text-blue-400 transition-colors">
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                    <span className="text-gray-500 text-xs tracking-[0.2em] uppercase mt-1">Calendar Overview</span>
                </div>
                <div className="flex gap-3">
                    <button onClick={prevMonth} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextMonth} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {!showEvents ? (
                <>
                    <div className="grid grid-cols-7 gap-1 md:gap-2 mb-4">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                            <div key={day} className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center text-[10px] font-bold text-gray-600 tracking-widest">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 md:gap-2 flex-1">
                        {days}
                    </div>
                </>
            ) : (
                <div className="flex-1 bg-zinc-950/50 rounded-2xl overflow-hidden border border-white/5 relative group">
                    <iframe
                        src="https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FKolkata&mode=AGENDA&showTitle=0&showNav=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0"
                        className="w-full h-full border-none invert grayscale brightness-150 opacity-80"
                        title="Google Calendar"
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
                </div>
            )}

            <div className={`mt-8 pt-6 border-t border-white/5 flex items-center justify-between ${isApp ? 'mt-auto' : ''}`}>
                <button
                    onClick={() => setShowEvents(!showEvents)}
                    className="flex items-center gap-3 group transition-all"
                >
                    <div className={`w-2 h-2 rounded-full ${showEvents ? 'bg-blue-500' : 'bg-gray-600'} animate-pulse`} />
                    <span className="text-[10px] text-gray-400 group-hover:text-blue-400 uppercase tracking-[0.2em] font-bold">
                        {showEvents ? 'View Grid' : 'View Events'}
                    </span>
                </button>
                <button
                    onClick={() => {
                        setViewDate(today);
                        setShowEvents(false);
                    }}
                    className="text-[10px] text-white/40 hover:text-white bg-white/5 px-4 py-2 rounded-full uppercase tracking-[0.2em] font-bold transition-all"
                >
                    Today
                </button>
            </div>
        </div>
    );
};

export default Calendar;
