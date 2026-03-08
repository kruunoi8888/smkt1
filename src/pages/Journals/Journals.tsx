
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Journal, SchoolConfig, MenuItem, AdminUser } from '@/types';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import FloatingButtons from '@/components/FloatingButtons/FloatingButtons';
import { formatThaiDate } from '@/constants';

interface AllJournalsViewProps {
  journals: Journal[];
  config: SchoolConfig;
  menus: MenuItem[];
  isLoggedIn: boolean;
  loggedInUser: AdminUser | null;
  onLogout: () => void;
  onView?: (id: string) => void;
}

const Journals: React.FC<AllJournalsViewProps> = ({ journals, config, menus, isLoggedIn, loggedInUser, onLogout, onView }) => {
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [zoom, setZoom] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter journals based on search term
  const filteredJournals = useMemo(() => {
    return journals.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.issue.toLowerCase().includes(searchLower) ||
        item.dateStr.toLowerCase().includes(searchLower) ||
        formatThaiDate(item.dateStr).toLowerCase().includes(searchLower)
      );
    });
  }, [journals, searchTerm]);

  // Pagination logic
  const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(filteredJournals.length / itemsPerPage);
  const paginatedJournals = useMemo(() => {
    if (itemsPerPage === -1) return filteredJournals;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredJournals.slice(start, start + itemsPerPage);
  }, [filteredJournals, currentPage, itemsPerPage]);

  // Reset to page 1 when search or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

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

  const getBaseWidth = () => {
    if (typeof window === 'undefined') return 842;
    const mobileWidth = window.innerWidth * 0.95;
    const desktopWidth = 842;
    return window.innerWidth < 842 ? mobileWidth : desktopWidth;
  };

  return (
    <div 
      className="flex flex-col min-h-screen"
      style={{ 
        backgroundColor: config.bodyBackgroundColor || '#f8fafc',
        color: config.bodyTextColor || '#334155'
      }}
    >
      <Header config={config} menus={menus} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 md:mb-12 gap-6">
            <div className="flex items-center">
              <div className="w-1.5 h-8 bg-indigo-600 rounded-full mr-4 shadow-lg shadow-indigo-500/30"></div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black font-kanit text-slate-800 tracking-tight leading-tight">วารสารประชาสัมพันธ์ทั้งหมด</h2>
                <p className="text-slate-500 text-xs mt-1">รวบรวมวารสารประชาสัมพันธ์ของโรงเรียนวัดสามัคคีธรรม</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
              <div className="relative flex-grow sm:min-w-[300px]">
                <input 
                  type="text" 
                  placeholder="ค้นหาวารสาร (ชื่อเรื่อง, ฉบับ, วันที่)..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pl-12 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
              <a href="#/" className="shrink-0 text-slate-500 font-bold hover:text-indigo-600 text-xs md:text-sm px-6 py-3 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition-colors flex items-center justify-center gap-2 border border-slate-100">
                <span>🏠</span> กลับหน้าแรก
              </a>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">แสดง</span>
              <select 
                value={itemsPerPage} 
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 font-bold outline-none shadow-sm"
              >
                <option value={10}>10 รายการ</option>
                <option value={20}>20 รายการ</option>
                <option value={50}>50 รายการ</option>
                <option value={100}>100 รายการ</option>
                <option value={-1}>ทั้งหมด</option>
              </select>
            </div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
              พบทั้งหมด <span className="text-indigo-600">{filteredJournals.length}</span> รายการ
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {paginatedJournals.map(journal => (
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
                    referrerPolicy="no-referrer"
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
                    <h4 className="text-[13px] md:text-[14px] font-bold text-slate-800 font-kanit group-hover/card:text-indigo-600 transition-colors line-clamp-1 tracking-tight leading-tight">
                      เรื่อง : {journal.title}
                    </h4>
                    <p className="text-[10px] md:text-[11px] text-slate-500 font-medium font-kanit line-clamp-1 tracking-tight opacity-90">
                      ฉบับ : {journal.issue}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredJournals.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-slate-400 font-bold">ไม่พบข้อมูลที่ตรงกับการค้นหา</div>
              <button onClick={() => setSearchTerm('')} className="mt-4 text-indigo-600 text-sm font-bold hover:underline">ล้างการค้นหา</button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
            <a href="#/" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 shadow-sm">
              <span>🏠</span> กลับหน้าแรก
            </a>
          </div>
        </div>
      </main>
      
      <FloatingButtons config={config} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Footer config={config} adminUser={loggedInUser || undefined} />

      {/* Fullscreen Reader (Duplicated from JournalsSection for consistency) */}
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
    </div>
  );
};

export default Journals;

