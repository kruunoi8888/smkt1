
import React from 'react';
import { motion } from 'motion/react';
import { MenuItem, SchoolConfig } from '@/types';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import FloatingButtons from '@/components/FloatingButtons/FloatingButtons';

interface CustomPageViewProps {
  menuItem: MenuItem;
  config: SchoolConfig;
  menus: MenuItem[];
  isLoggedIn: boolean;
  onLogout: () => void;
}

const CustomPage: React.FC<CustomPageViewProps> = ({ menuItem, config, menus, isLoggedIn, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header config={config} menus={menus} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <main className="flex-grow">
        {/* Immersive Hero Section */}
        <div className="relative min-h-[70vh] flex items-center overflow-hidden bg-slate-950">
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            {menuItem.image ? (
              <>
                <img 
                  src={menuItem.image || null} 
                  alt="" 
                  className="w-full h-full object-cover opacity-40 scale-105" 
                  referrerPolicy="no-referrer"
                />
                {/* Multi-layered Gradients for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]"></div>
              </>
            ) : (
              <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#020617_100%)]"></div>
            )}
            
            {/* Atmospheric Light Blobs */}
            <div 
              className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[120px] opacity-20 animate-pulse"
              style={{ backgroundColor: config.primaryColor }}
            ></div>
            <div 
              className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-10 animate-pulse"
              style={{ backgroundColor: config.primaryColor, animationDelay: '2s' }}
            ></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-[1px] bg-white/30"></div>
                  <span 
                    className="text-xs font-bold uppercase tracking-[0.3em]"
                    style={{ color: config.primaryColor }}
                  >
                    {config.name}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-white font-kanit mb-8 tracking-tight leading-tight drop-shadow-2xl">
                  {menuItem.label}
                </h1>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <div 
                    className="h-1.5 w-32 rounded-full shadow-lg"
                    style={{ backgroundColor: config.primaryColor, boxShadow: `0 0 20px ${config.primaryColor}80` }}
                  ></div>
                  <span className="text-white/40 font-kanit text-sm uppercase tracking-widest">Official Page</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1"
            >
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
            </motion.div>
          </div>
        </div>

        {/* Content Section with Glassmorphism */}
        <div className="container mx-auto px-4 -mt-20 relative z-20 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] p-8 md:p-20 border border-white/20"
          >
            {menuItem.label === 'ติดต่อเรา' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-kanit mb-6 tracking-tight">
                      ข้อมูลการติดต่อ
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                      หากท่านมีข้อสงสัยหรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ตามช่องทางด้านล่างนี้ ทางโรงเรียนยินดีให้บริการและตอบทุกข้อซักถามของท่าน
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start gap-6 group">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">ที่อยู่</h3>
                        <p className="text-lg md:text-xl font-bold text-slate-800 leading-snug break-words">{config.address || 'ยังไม่ได้ระบุที่อยู่'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 group">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.09-7.074-7.07l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">เบอร์โทรศัพท์</h3>
                        <p className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">{config.phone || 'ยังไม่ได้ระบุเบอร์โทรศัพท์'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 group">
                      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">อีเมล</h3>
                        <p className="text-lg md:text-xl font-bold text-slate-800 break-all">{config.email || 'ยังไม่ได้ระบุอีเมล'}</p>
                      </div>
                    </div>

                    {config.socialMedia?.facebook?.visible && config.socialMedia?.facebook?.url && (
                      <div className="flex items-start gap-6 group">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
                          </svg>
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Facebook</h3>
                          <a href={config.socialMedia.facebook.url} target="_blank" rel="noopener noreferrer" className="inline-block text-lg md:text-xl font-bold text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 underline-offset-4 transition-colors break-words max-w-full">
                            เยี่ยมชมแฟนเพจของเรา
                          </a>
                        </div>
                      </div>
                    )}

                    {config.socialMedia?.line?.visible && config.socialMedia?.line?.url && (
                      <div className="flex items-start gap-6 group">
                        <div className="w-16 h-16 rounded-2xl bg-[#06C755]/10 text-[#06C755] flex items-center justify-center shrink-0 group-hover:bg-[#06C755] group-hover:text-white transition-colors duration-300 shadow-inner">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M21.15 8.52a10.8 10.8 0 0 0-18.3 0 10.8 10.8 0 0 0 18.3 0zm-8.8 11.23c-5.8 0-10.2-3.88-10.2-9.35s4.4-9.35 10.2-9.35 10.2 3.88 10.2 9.35-4.4 9.35-10.2 9.35z"/></svg>
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Line</h3>
                          <a href={config.socialMedia.line.url} target="_blank" rel="noopener noreferrer" className="inline-block text-lg md:text-xl font-bold text-[#06C755] hover:text-[#05a546] underline decoration-[#06C755]/30 underline-offset-4 transition-colors break-words max-w-full">
                            ติดต่อผ่าน Line
                          </a>
                        </div>
                      </div>
                    )}

                    {config.socialMedia?.youtube?.visible && config.socialMedia?.youtube?.url && (
                      <div className="flex items-start gap-6 group">
                        <div className="w-16 h-16 rounded-2xl bg-[#FF0000]/10 text-[#FF0000] flex items-center justify-center shrink-0 group-hover:bg-[#FF0000] group-hover:text-white transition-colors duration-300 shadow-inner">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">YouTube</h3>
                          <a href={config.socialMedia.youtube.url} target="_blank" rel="noopener noreferrer" className="inline-block text-lg md:text-xl font-bold text-[#FF0000] hover:text-[#cc0000] underline decoration-[#FF0000]/30 underline-offset-4 transition-colors break-words max-w-full">
                            รับชมวิดีโอของเรา
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-inner h-full flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                  
                  <div className="relative z-10 text-center space-y-8">
                    <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-xl flex items-center justify-center p-4 border-4 border-white">
                      {config.logo ? (
                        <img src={config.logo || null} alt="School Logo" className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.625c-1.035 0-1.875-.84-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">{config.name}</h3>
                      <p className="text-slate-500 font-medium">{config.area}</p>
                    </div>
                    
                    <div className="pt-8 border-t border-slate-200/60">
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">เวลาทำการ</p>
                      <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="font-bold text-slate-700">จันทร์ - ศุกร์ : 08:30 - 16:30 น.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="prose prose-slate prose-lg max-w-none">
                {menuItem.content ? (
                  <div 
                    className="text-slate-700 leading-relaxed font-medium text-lg md:text-xl font-kanit rich-text-content"
                    dangerouslySetInnerHTML={{ __html: menuItem.content }}
                  />
                ) : (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-slate-300"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </div>
                    <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">ยังไม่มีเนื้อหาในส่วนนี้</p>
                  </div>
                )}
              </div>
            )}

            {/* Optional: Back Button */}
            {menuItem.label !== 'ติดต่อเรา' && (
              <div className="mt-16 pt-10 border-t border-slate-50 flex justify-center">
                <a 
                  href="#/" 
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                >
                  กลับหน้าแรก
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <FloatingButtons config={config} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Footer config={config} />
    </div>
  );
};

export default CustomPage;
