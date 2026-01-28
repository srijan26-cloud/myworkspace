import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ onClose }) => {
    const today = new Date();
    const [viewDate, setViewDate] = useState(today);

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
        days.push(<div key={`prev-${i}`} className="h-10 w-10" />);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        days.push(
            <div
                key={day}
                className={`h-10 w-10 flex items-center justify-center rounded-lg text-sm transition-colors
                    ${isToday ? 'bg-blue-600 text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'hover:bg-white/10 text-gray-300'}`}
            >
                {day}
            </div>
        );
    }

    const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
    const prevMonth = () => setViewDate(new Date(year, month - 1, 1));

    return (
        <div
            className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl w-[320px]"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                    <span className="text-white font-semibold text-lg">{monthNames[month]}</span>
                    <span className="text-gray-500 text-xs tracking-widest">{year}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="h-10 w-10 flex items-center justify-center text-[10px] font-bold text-gray-600">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days}
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Live Events</span>
                </div>
                <button
                    onClick={() => setViewDate(today)}
                    className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                >
                    Back to today
                </button>
            </div>
        </div>
    );
};

export default Calendar;
