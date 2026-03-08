
import React, { useState, useEffect } from 'react';
import { SchoolConfig } from '@/types';

interface FloatingButtonsProps {
  config: SchoolConfig;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ config, isLoggedIn, onLogout }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navigateToAdmin = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/admin';
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col items-end gap-3 md:gap-4 z-50">
      {isLoggedIn ? (
        <div className="flex flex-col gap-3 md:gap-4">
          <a 
            href="#/admin" 
            onClick={navigateToAdmin}
            title="ตั้งค่าระบบ"
            className="group relative"
          >
            <div className="bg-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-slate-100 hover:-translate-y-1 transition-all duration-300">
              <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-slate-800">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
            </div>
          </a>
          <button 
            onClick={onLogout}
            title="ออกจากระบบ"
            className="group relative"
          >
            <div className="bg-rose-500 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(244,63,94,0.3)] border border-rose-400 hover:-translate-y-1 transition-all duration-300">
              <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <a 
          href="#/admin" 
          onClick={navigateToAdmin}
          title="เข้าสู่ระบบผู้ดูแล"
          className="group relative"
        >
          <div className="bg-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-slate-100 hover:-translate-y-1 transition-all duration-300">
            <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 5.25a3.75 3.75 0 117.5 0v3h-7.5v-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse border border-white"></div>
          </div>
        </a>
      )}
      
      <button onClick={scrollToTop} className={`w-12 h-12 md:w-14 md:h-14 bg-white text-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-slate-100 transition-all active:scale-90 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" /></svg>
      </button>
    </div>
  );
};

export default FloatingButtons;
