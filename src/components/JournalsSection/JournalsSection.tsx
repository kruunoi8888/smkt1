
import React, { useState, useEffect, useRef } from 'react';
import { Journal } from '@/types';
import { formatThaiDate } from '@/constants';

interface JournalsSectionProps {
  journals: Journal[];
  onView?: (id: string) => void;
  bodyTextColor?: string;
}

const JournalsSection: React.FC<JournalsSectionProps> = ({ journals, onView, bodyTextColor }) => {
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [zoom, setZoom] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // กำหนดขนาดพื้นฐานของหน้ากระดาษ (ประมาณ 210mm ในสเกลหน้าจอ)
  const getBaseWidth = () => {
    if (typeof window === 'undefined') return 842;
    const mobileWidth = window.innerWidth * 0.95;
    const desktopWidth = 842;
    return window.innerWidth < 842 ? mobileWidth : desktopWidth;
  };

  // Reset zoom and scroll when opening/closing
  useEffect(() => {
    if (selectedJournal) {
      setZoom(1);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [selectedJournal]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.2));
  const handleResetZoom = () => setZoom(1);

  return (
    <section className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center">
          <div className="w-1.5 h-8 bg-indigo-600 rounded-full mr-4 shadow-lg shadow-indigo-500/30"></div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black font-kanit leading-tight" style={{ color: bodyTextColor || '#1e293b' }}>วารสารประชาสัมพันธ์</h2>
            <p className="text-xs mt-1" style={{ color: bodyTextColor || '#64748b', opacity: 0.7 }}>คลิกที่ภาพเพื่อขยายอ่านเนื้อหาฉบับเต็ม</p>
          </div>
        </div>
        <a href="#/journals" className="text-indigo-600 font-bold hover:underline text-xs md:text-sm bg-indigo-50 px-5 py-2.5 rounded-full transition-all border border-indigo-100/50 hover:bg-indigo-100">
          ดูวารสารประชาสัมพันธ์ทั้งหมด →
        </a>
      </div>

      {/* Grid Layout - ปรับให้กว้างเท่ากับส่วนอื่นๆ ของเว็บไซต์ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {journals.slice(0, 5).map(journal => (
          <div 
            key={journal.id} 
            className="flex flex-col group/card cursor-pointer w-full"
            onClick={() => {
              setSelectedJournal(journal);
              if (onView) onView(journal.id);
            }}
          >
            <div 
              className="aspect-[1/1.414] bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 mb-4 relative ring-1 ring-slate-100 transition-all duration-500 group-hover/card:shadow-2xl group-hover/card:-translate-y-2 group-hover/card:ring-indigo-400"
            >
              <img 
                src={journal.thumbnail || null} 
                alt={journal.title} 
                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700" 
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10">
                <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-wide drop-shadow-md">
                  {formatThaiDate(journal.dateStr)}
                </span>
                <div className="flex items-center gap-1.5 text-white font-bold text-[9px] md:text-[10px] drop-shadow-md">
                  <span className="text-[12px]">👁️</span>
                  <span>{journal.views?.toLocaleString() || 0}</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover/card:opacity-100 flex items-center justify-center transition-all duration-300 z-20 backdrop-blur-[2px]">
                  <span className="px-5 py-2.5 bg-white text-indigo-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl transform scale-75 group-hover/card:scale-100 transition-transform duration-500">
                    คลิกเพื่ออ่าน
                  </span>
              </div>
            </div>
            
            <div className="px-1">
              <div className="flex flex-col space-y-1">
                <h4 className="text-[13px] md:text-[14px] font-bold font-kanit group-hover/card:text-indigo-600 transition-colors line-clamp-1 tracking-tight leading-tight" style={{ color: bodyTextColor || '#1e293b' }}>
                  เรื่อง : {journal.title}
                </h4>
                <p className="text-[10px] md:text-[11px] font-medium font-kanit line-clamp-1 tracking-tight opacity-90" style={{ color: bodyTextColor || '#64748b', opacity: 0.7 }}>
                  ฉบับ : {journal.issue}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Reader */}
      {selectedJournal && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 animate-in fade-in duration-300"
          onClick={() => setSelectedJournal(null)}
        >
          {/* Header Bar */}
          <div 
            className="w-full h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-50 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 md:gap-5 min-w-0 flex-1">
              <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-100">
                <span className="text-xl">📄</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-black text-slate-800 text-[11px] md:text-base font-kanit truncate leading-tight">เรื่อง : {selectedJournal.title}</h3>
                <div className="flex items-center gap-3 md:gap-4 mt-0.5">
                  <span className="text-[9px] md:text-[10px] text-indigo-600 font-black uppercase tracking-widest">{formatThaiDate(selectedJournal.dateStr)}</span>
                  <span className="hidden sm:block text-slate-300">|</span>
                  <span className="hidden sm:block text-[10px] text-slate-500 font-bold truncate">ฉบับ : {selectedJournal.issue}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 ml-4">
              <div className="flex items-center bg-slate-100 rounded-2xl p-0.5 border border-slate-200 shadow-inner">
                <button onClick={handleZoomOut} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all active:scale-90">
                  <span className="text-2xl font-bold leading-none">−</span>
                </button>
                <div className="px-2 md:px-4 min-w-[50px] md:min-w-[80px] text-center">
                  <span className="text-[12px] md:text-xs font-black text-slate-800 font-kanit tracking-tighter">{Math.round(zoom * 100)}%</span>
                </div>
                <button onClick={handleZoomIn} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all active:scale-90">
                  <span className="text-2xl font-bold leading-none">+</span>
                </button>
              </div>
              
              <button onClick={handleResetZoom} className="hidden sm:flex h-10 px-4 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-500 hover:bg-slate-200 transition-all uppercase tracking-widest border border-slate-200">
                FIT
              </button>

              <button onClick={() => setSelectedJournal(null)} className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 hover:bg-red-500 hover:text-white text-slate-400 rounded-xl flex items-center justify-center transition-all active:scale-90 border border-slate-100 ml-2 shadow-sm">
                <span className="text-xl font-bold">✕</span>
              </button>
            </div>
          </div>
          
          <div 
            ref={scrollContainerRef}
            className="flex-grow w-full overflow-auto custom-reader-scroll p-4 md:p-12 flex flex-col items-center bg-slate-900/60"
            onClick={() => setSelectedJournal(null)}
          >
            <div 
              className="relative transition-all duration-200 ease-out origin-top flex flex-col items-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
              style={{ width: `${getBaseWidth() * zoom}px`, minWidth: '100px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full bg-white rounded-sm overflow-hidden border border-slate-200">
                <img src={selectedJournal.thumbnail || null} alt={selectedJournal.title} className="w-full h-auto block" onContextMenu={(e) => e.preventDefault()} />
              </div>

              <div className="mt-16 mb-24 flex flex-col items-center opacity-40">
                <div className="w-24 h-1.5 bg-white/20 rounded-full mb-4"></div>
                <span className="text-[11px] font-black text-white/50 uppercase tracking-[0.4em] font-kanit">END OF JOURNAL</span>
                <p className="text-[9px] text-white/20 mt-2 font-bold uppercase tracking-widest">โรงเรียนวัดสามัคคีธรรม</p>
              </div>
            </div>

            <div className="fixed bottom-10 right-10 z-[60]">
               <button onClick={(e) => { e.stopPropagation(); scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center shadow-2xl transition-all active:scale-90 hover:shadow-indigo-500/50 border border-white/20">
                 <span className="text-2xl font-bold">↑</span>
               </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default JournalsSection;
