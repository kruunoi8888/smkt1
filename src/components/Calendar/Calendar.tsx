
import React, { useState } from 'react';
import { CalendarEvent } from '@/types';

interface CalendarProps {
  events: CalendarEvent[];
  primaryColor?: string;
  bodyTextColor?: string;
}

const Calendar: React.FC<CalendarProps> = ({ events, primaryColor, bodyTextColor }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  const monthsTh = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  
  const daysTh = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const isSelected = (day: number) => day === selectedDay;

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
    setSelectedDay(1);
  };
  
  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
    setSelectedDay(1);
  };

  const selectedDateEvents = getEventsForDay(selectedDay);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden w-full max-w-[340px] flex flex-col mx-auto">
      {/* Header */}
      <div className="p-5 text-white flex items-center justify-between" style={{ backgroundColor: primaryColor || '#0f172a' }}>
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM15.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM15.75 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM15.75 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /><path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3a.75.75 0 011.5 0v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM3.75 9v9.75a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V9H3.75z" clipRule="evenodd" /></svg>
          </span>
          <h3 className="text-[15px] font-bold font-kanit uppercase tracking-wide">ปฏิทินกิจกรรม</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm">❮</button>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm">❯</button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-center mb-5">
          <h4 className="font-black font-kanit text-lg uppercase tracking-wider" style={{ color: bodyTextColor || '#1e3a8a' }}>{monthsTh[month]} {year < 2400 ? year + 543 : year}</h4>
        </div>

        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {daysTh.map(d => (
            <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest py-1.5">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {calendarDays.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} className="aspect-square"></div>;
            
            const dayEvents = getEventsForDay(day);
            const today = isToday(day);
            const active = isSelected(day);

            return (
              <button 
                key={day} 
                onClick={() => setSelectedDay(day)}
                className={`
                  aspect-square flex flex-col items-center justify-center text-[13px] font-bold rounded-2xl transition-all relative group
                  ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 z-10 scale-110' : 
                    today ? 'bg-yellow-400 text-slate-900 shadow-md ring-2 ring-white' : 
                    'hover:bg-slate-50'}
                `}
                style={{ color: !active && !today ? (bodyTextColor || '#475569') : undefined }}
              >
                <span>{day}</span>
                {dayEvents.length > 0 && !active && (
                  <div className="absolute bottom-1.5 flex gap-0.5">
                    {dayEvents.slice(0, 3).map((_, i) => (
                      <span key={i} className={`w-1 h-1 rounded-full ${today ? 'bg-blue-600' : 'bg-blue-500'}`}></span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details Section */}
      <div className="bg-slate-50 border-t border-slate-100 flex-grow min-h-[160px]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                กิจกรรม {selectedDay} {monthsTh[month]}
             </span>
             <span className="bg-white px-3 py-1 rounded-xl border border-slate-200 text-[10px] font-black text-slate-500 uppercase">
               {selectedDateEvents.length} รายการ
             </span>
          </div>

          <div className="space-y-3">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.slice(0, 2).map(event => (
                <div key={event.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      event.type === 'holiday' ? 'bg-red-500' : 
                      event.type === 'exam' ? 'bg-orange-500' : 
                      event.type === 'meeting' ? 'bg-purple-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <h5 className="font-bold font-kanit text-[13px] leading-snug" style={{ color: bodyTextColor || '#1e293b' }}>{event.title}</h5>
                      <p className="text-[11px] leading-snug mt-1 line-clamp-1" style={{ color: bodyTextColor || '#64748b', opacity: 0.7 }}>{event.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center opacity-40">
                <span className="text-3xl mb-2">☕</span>
                <p className="text-[11px] font-black font-kanit uppercase tracking-widest">ไม่มีกิจกรรมในวันนี้</p>
              </div>
            )}
            {selectedDateEvents.length > 2 && (
              <p className="text-[10px] text-center text-slate-400 font-bold italic pt-1">+ และอีก {selectedDateEvents.length - 2} รายการ</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
