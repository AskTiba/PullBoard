import React from 'react';

interface DateDisplayProps {
  format?: string; 
  className?: string; 
}

const DateDisplay: React.FC<DateDisplayProps> = ({ format = "TECH", className }) => {
  const currentDate = new Date();
  
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  const dayName = days[currentDate.getDay()];
  const monthName = months[currentDate.getMonth()];
  const dayNum = currentDate.getDate().toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  // TECH Format: FRI · 15 MAY
  if (format === "TECH") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 bg-slate-900/5 rounded-full border border-slate-900/5 ${className}`}>
        <span className="text-[10px] font-black tracking-[0.2em] text-blue-600">{dayName}</span>
        <span className="text-[10px] font-black opacity-20">•</span>
        <span className="text-[10px] font-black tracking-[0.2em] text-slate-900">{dayNum} {monthName}</span>
      </div>
    );
  }

  return (
    <time dateTime={currentDate.toISOString()} className={className}>
      {`${dayName} ${dayNum} ${monthName} ${year}`}
    </time>
  );
};

export default DateDisplay;
