
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
          <nav className="hidden lg:flex items-center gap-8">
            {menus.filter(m => m.isActive !== false).map(menu => {
              const active = isActive(menu.path);
              return (
                <a 
                  key={menu.id} 
                  href={menu.path} 
                  className={`text-[15px] font-bold transition-all font-kanit whitespace-nowrap relative group py-2 px-1 ${
                    active ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {menu.label}
                  {active ? (
                    <span 
                      className="absolute -bottom-1 left-0 w-full h-1 rounded-full shadow-sm"
                      style={{ backgroundColor: config.primaryColor }}
                    ></span>
                  ) : (
                    <span 
                      className="absolute -bottom-1 left-0 w-0 h-1 rounded-full transition-all group-hover:w-full opacity-30"
                      style={{ backgroundColor: config.primaryColor }}
                    ></span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden w-11 h-11 flex items-center justify-center text-slate-600 bg-slate-50 rounded-2xl active:bg-slate-100 transition-colors"
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
        <div className="lg:hidden absolute top-full left-4 right-4 mt-4 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] py-6 flex flex-col px-6 gap-2 z-50 animate-in zoom-in-95 slide-in-from-top-4 duration-300 border border-slate-100">
          {menus.filter(m => m.isActive !== false).map(menu => {
            const active = isActive(menu.path);
            return (
              <a 
                key={menu.id} 
                href={menu.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-bold font-kanit py-3.5 px-5 rounded-2xl transition-all flex items-center justify-between ${
                  active ? 'bg-slate-50 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {menu.label}
                {active && (
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: config.primaryColor }}
                  ></span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
