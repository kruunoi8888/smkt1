
import React, { useState, useEffect } from 'react';
import { SchoolConfig, MenuItem } from '@/types';

interface HeaderProps {
  config: SchoolConfig;
  menus: MenuItem[];
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ config, menus, isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isActive = (path: string) => {
    if (path === '#/' && (currentHash === '#/' || currentHash === '')) return true;
    return currentHash.startsWith(path) && path !== '#/';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center gap-8 md:gap-12 flex-grow min-w-0">
          <a href="#/" className="flex items-center gap-3 md:gap-4 flex-shrink min-w-0">
            <img src={config.logo || null} alt="Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-100 shadow-sm flex-shrink-0" />
            <div className="flex flex-col min-w-0 overflow-hidden">
              <h1 className="text-base md:text-2xl font-black font-kanit text-slate-900 leading-tight md:whitespace-normal">
                {config.name}
              </h1>
              <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wide md:tracking-widest mt-0.5">
                {config.area}
              </span>
            </div>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center p-1.5 bg-slate-50/80 backdrop-blur-md border border-slate-100 rounded-[2rem] shadow-sm ml-auto mr-4 xl:mr-8">
            {menus.filter(m => m.isActive !== false).map(menu => {
              const active = isActive(menu.path);
              
              // Determine text color based on primaryColor brightness
              const hex = (config.primaryColor || '#0f172a').replace('#', '');
              const r = parseInt(hex.substr(0, 2), 16) || 0;
              const g = parseInt(hex.substr(2, 2), 16) || 0;
              const b = parseInt(hex.substr(4, 2), 16) || 0;
              const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
              const textColor = (yiq >= 200) ? '#0f172a' : '#ffffff'; // Use dark text if primary color is very light (like white)
              const shadowOpacity = (yiq >= 200) ? '15' : '39'; // Reduce shadow if button is light
              
              return (
                <a 
                  key={menu.id} 
                  href={menu.path} 
                  style={active ? { 
                    backgroundColor: config.primaryColor, 
                    color: textColor,
                    boxShadow: `0 4px 14px 0 ${config.primaryColor}${shadowOpacity}`,
                    border: yiq >= 240 ? '1px solid #e2e8f0' : 'none' // Add border if it's pure white
                  } : {}}
                  className={`text-[14px] xl:text-[15px] font-bold transition-all duration-300 font-kanit whitespace-nowrap px-5 xl:px-6 py-2.5 rounded-[1.5rem] ${
                    active ? 'scale-105' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {menu.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden w-11 h-11 flex items-center justify-center text-slate-600 bg-slate-50 rounded-2xl active:bg-slate-100 transition-colors shrink-0"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <span className="text-2xl font-bold">✕</span>
          ) : (
            <div className="flex flex-col gap-1.5 w-6">
               <span className="w-full h-0.5 bg-slate-600 rounded-full"></span>
               <span className="w-full h-0.5 bg-slate-600 rounded-full"></span>
               <span className="w-full h-0.5 bg-slate-600 rounded-full"></span>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-4 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] py-6 flex flex-col px-6 gap-2 z-50 animate-in zoom-in-95 slide-in-from-top-4 duration-300 border border-slate-100">
          {menus.filter(m => m.isActive !== false).map(menu => {
            const active = isActive(menu.path);
            
            // Determine text color based on primaryColor brightness
            const hex = (config.primaryColor || '#0f172a').replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16) || 0;
            const g = parseInt(hex.substr(2, 2), 16) || 0;
            const b = parseInt(hex.substr(4, 2), 16) || 0;
            const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            const textColor = (yiq >= 200) ? '#0f172a' : '#ffffff';
            const shadowOpacity = (yiq >= 200) ? '15' : '39';
            
            return (
              <a 
                key={menu.id} 
                href={menu.path} 
                onClick={() => setIsMenuOpen(false)}
                style={active ? { 
                  backgroundColor: config.primaryColor, 
                  color: textColor,
                  boxShadow: `0 4px 14px 0 ${config.primaryColor}${shadowOpacity}`,
                  border: yiq >= 240 ? '1px solid #e2e8f0' : 'none'
                } : {}}
                className={`text-base font-bold font-kanit py-3.5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                  active ? 'scale-[1.02]' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 hover:scale-[1.02]'
                }`}
              >
                {menu.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
