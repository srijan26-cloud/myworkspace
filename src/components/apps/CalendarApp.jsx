import React from 'react';
import Calendar from '../common/Calendar';

const CalendarApp = () => {
    return (
        <div className="w-full h-full bg-black">
            <Calendar isApp={true} />
        </div>
    );
};

export default CalendarApp;
