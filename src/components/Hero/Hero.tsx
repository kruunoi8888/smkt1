
import React from 'react';
import { SchoolConfig } from '@/types';

interface HeroProps {
  config: SchoolConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <img 
          src={config.bannerImage || "https://picsum.photos/seed/schoolhero/1920/1080"} 
          alt="School Banner" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/40 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 h-full relative z-10 flex flex-col justify-center items-center text-center max-w-5xl">
        <div className="space-y-8 flex flex-col items-center">
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black font-kanit leading-tight drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)] break-words tracking-tighter"
            style={{ color: config.bannerTextColor || '#ffffff' }}
          >
            {config.name}
          </h1>
          <div 
            className="inline-block px-8 py-4 md:px-10 md:py-5 text-xl md:text-2xl lg:text-3xl font-black rounded-full shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 border-4"
            style={{ 
              backgroundColor: config.secondaryColor || '#facc15',
              borderColor: config.sloganBorderColor || '#fbbf24',
              color: config.sloganTextColor || '#0f172a',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.4)'
            }}
          >
            {config.bannerSlogan || "สร้างคนดี มีความรู้ คู่คุณธรรม นำเทคโนโลยี"}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-6">
            {(config.heroShortcuts || []).filter(s => s.isActive).map((shortcut, idx) => (
              <button 
                key={shortcut.id}
                onClick={() => {
                  if (shortcut.type === 'page') {
                    window.location.hash = `#/page/hero/${shortcut.id}`;
                  } else if (shortcut.url) {
                    if (shortcut.url.startsWith('http')) {
                      window.open(shortcut.url, '_blank');
                    } else {
                      window.location.hash = shortcut.url;
                    }
                  }
                }}
                className={`px-8 py-4 rounded-2xl font-bold shadow-xl transition-all active:scale-95 text-center flex items-center justify-center gap-2`}
                style={{ 
                  backgroundColor: shortcut.bgColor || '#eef2f6',
                  borderColor: shortcut.bgColor || '#eef2f6',
                  color: shortcut.textColor || '#0f172a'
                }}
              >
                {shortcut.title}
              </button>
            ))}
            {(!config.heroShortcuts || config.heroShortcuts.filter(s => s.isActive).length === 0) && (
              <>
                <button 
                  onClick={() => window.location.hash = '#/about'}
                  className="px-8 py-4 bg-[#eef2f6] text-slate-900 rounded-2xl font-bold shadow-xl hover:bg-white transition-all active:scale-95 text-center"
                >
                  เกี่ยวกับโรงเรียน
                </button>
                <button 
                  onClick={() => window.location.hash = '#/news'}
                  className="px-8 py-4 bg-[#eef2f6] text-slate-900 rounded-2xl font-bold shadow-xl hover:bg-white transition-all active:scale-95 text-center"
                >
                  ดูข่าวสารล่าสุด
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
