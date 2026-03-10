
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
  const isContactPage = menuItem?.label?.includes('ติดต่อ') || menuItem?.path?.includes('contact');
  const isAboutPage = menuItem?.label?.includes('เกี่ยว') || menuItem?.path?.includes('about');

  const formatAddress = (address?: string) => {
    if (!address) return 'ยังไม่ได้ระบุที่อยู่';
    let formatted = address.trim();
    
    // Replace space before Tambon or Amphoe keywords with newline if they are currently on same line
    formatted = formatted.replace(/\s+(ตำบล|แขวง|ต\.)/, '\n$1');
    formatted = formatted.replace(/\s+(จังหวัด|จ\.)/, '\n$1');
    
    return formatted.split('\n').filter(Boolean).map((line, i, arr) => (
      <React.Fragment key={i}>
        {line.trim()}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header config={config} menus={menus} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <main className="flex-grow">
        {/* Immersive Hero Section */}
        <div className="relative min-h-[40vh] md:min-h-[50vh] flex items-center overflow-hidden bg-slate-900">
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            {menuItem.image || config.bannerImage ? (
              <>
                <img 
                  src={menuItem.image || config.bannerImage || null} 
                  alt="" 
                  className="w-full h-full object-cover opacity-60 scale-105" 
                  referrerPolicy="no-referrer"
                />
                {/* Multi-layered Gradients for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
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
                  <div className="w-12 h-[2px] bg-white/60"></div>
                  <span 
                    className="text-sm font-bold uppercase tracking-[0.3em] drop-shadow-md brightness-150"
                    style={{ color: config.primaryColor || '#60a5fa' }}
                  >
                    {config.name}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-white font-kanit mb-8 tracking-tight leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                  {menuItem.label}
                </h1>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <div 
                    className="h-1.5 w-32 rounded-full shadow-lg"
                    style={{ backgroundColor: config.primaryColor || '#60a5fa', boxShadow: `0 0 20px ${config.primaryColor || '#60a5fa'}80` }}
                  ></div>
                  <span className="text-white/80 font-kanit font-semibold text-sm uppercase tracking-widest drop-shadow-md">Official Page</span>
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
            {isContactPage ? (
              <div className="space-y-16 py-8">
                <div className="text-center max-w-3xl mx-auto space-y-6">
                  <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-[2rem] mb-2 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-kanit tracking-tight">
                    ติดต่อเรา
                  </h2>
                  <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
                    หากท่านมีข้อสงสัยหรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ตามช่องทางด้านล่างนี้ ทางโรงเรียนยินดีให้บริการและตอบทุกข้อซักถามของท่าน
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Address */}
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 group flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="w-20 h-20 rounded-[1.5rem] bg-blue-50 text-blue-600 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-blue-500/30">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">ที่อยู่</h3>
                    <p className="text-lg font-bold text-slate-800 leading-relaxed relative z-10">{formatAddress(config.address)}</p>
                  </div>

                  {/* Phone */}
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 group flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="w-20 h-20 rounded-[1.5rem] bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-emerald-500/30">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.09-7.074-7.07l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">เบอร์โทรศัพท์</h3>
                    <p className="text-2xl font-black text-slate-800 tracking-tight relative z-10">{config.phone || 'ยังไม่ได้ระบุ'}</p>
                  </div>

                  {/* Email */}
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 group flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-rose-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="w-20 h-20 rounded-[1.5rem] bg-rose-50 text-rose-600 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-rose-500/30">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">อีเมล</h3>
                    <p className="text-lg font-bold text-slate-800 break-all relative z-10">{config.email || 'ยังไม่ได้ระบุ'}</p>
                  </div>
                </div>

                {/* Social Media Section */}
                <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl mt-8">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
                  <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>

                  <div className="relative z-10 text-center mb-12">
                    <h3 className="text-3xl font-black text-white font-kanit tracking-tight mb-4">ช่องทางติดตามข่าวสาร</h3>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">อัปเดตกิจกรรม ความเคลื่อนไหว และข่าวสารต่างๆ ของโรงเรียนผ่านโซเชียลมีเดียอย่างเป็นทางการ</p>
                  </div>

                  <div className="relative z-10 flex flex-col lg:flex-row justify-center gap-6 max-w-5xl mx-auto">
                    {config.socialMedia?.facebook?.visible && config.socialMedia?.facebook?.url && (
                      <a href={config.socialMedia.facebook.url} target="_blank" rel="noopener noreferrer" 
                         className="flex-1 group flex items-center gap-6 bg-white/5 hover:bg-[#1877F2]/90 border border-white/10 hover:border-[#1877F2] p-6 rounded-3xl transition-all duration-300 backdrop-blur-sm shadow-xl">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
                        </div>
                        <div className="text-left">
                          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Facebook</p>
                          <p className="text-white font-bold text-xl">แฟนเพจโรงเรียน</p>
                        </div>
                      </a>
                    )}

                    {config.socialMedia?.line?.visible && config.socialMedia?.line?.url && (
                      <a href={config.socialMedia.line.url} target="_blank" rel="noopener noreferrer" 
                         className="flex-1 group flex items-center gap-6 bg-white/5 hover:bg-[#06C755]/90 border border-white/10 hover:border-[#06C755] p-6 rounded-3xl transition-all duration-300 backdrop-blur-sm shadow-xl">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-[#06C755] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M21.15 8.52a10.8 10.8 0 0 0-18.3 0 10.8 10.8 0 0 0 18.3 0zm-8.8 11.23c-5.8 0-10.2-3.88-10.2-9.35s4.4-9.35 10.2-9.35 10.2 3.88 10.2 9.35-4.4 9.35-10.2 9.35z"/></svg>
                        </div>
                        <div className="text-left">
                          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Line Official</p>
                          <p className="text-white font-bold text-xl">ติดต่อผ่าน Line</p>
                        </div>
                      </a>
                    )}

                    {config.socialMedia?.youtube?.visible && config.socialMedia?.youtube?.url && (
                      <a href={config.socialMedia.youtube.url} target="_blank" rel="noopener noreferrer" 
                         className="flex-1 group flex items-center gap-6 bg-white/5 hover:bg-[#FF0000]/90 border border-white/10 hover:border-[#FF0000] p-6 rounded-3xl transition-all duration-300 backdrop-blur-sm shadow-xl">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-[#FF0000] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </div>
                        <div className="text-left">
                          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">YouTube</p>
                          <p className="text-white font-bold text-xl">รับชมวิดีโอ</p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom Footer Info */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-8 mt-8">
                  <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left w-full lg:w-auto">
                    <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center border-[6px] border-white shadow-lg shrink-0 overflow-hidden transform group-hover:scale-105 transition-transform">
                      {config.logo ? (
                        <img src={config.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-slate-300"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /></svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 font-kanit">{config.name}</h3>
                      <p className="text-slate-500 font-bold text-lg">{config.area}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 shadow-inner w-full lg:w-auto text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">เวลาทำการ</p>
                    <div className="inline-flex items-center justify-center w-full md:w-auto gap-3 bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></span>
                      <span className="font-bold text-slate-700 text-lg">จันทร์ - ศุกร์ : 08:30 - 16:30 น.</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : isAboutPage ? (
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-white rounded-[2rem] shadow-xl flex items-center justify-center p-6 border-8 border-white mb-8">
                    {config.logo ? (
                      <img src={config.logo || null} alt="School Logo" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.625c-1.035 0-1.875-.84-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-kanit tracking-tight leading-tight">{config.name}</h2>
                  <p className="text-xl md:text-2xl font-bold text-slate-500">{config.area}</p>
                </div>

                <div className="flex justify-center mt-16">
                  <div className="bg-slate-50 p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-sm max-w-xl w-full flex flex-col items-center text-center">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">ผู้บริหารสถานศึกษา</h3>
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden bg-white border-[6px] shadow-lg shrink-0 transition-transform hover:scale-105" style={{ borderColor: config.primaryColor || '#0f172a' }}>
                        {config.director?.image ? (
                          <img src={config.director.image} alt={config.director.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-2xl md:text-3xl font-black text-slate-800 mb-3">{config.director?.name}</p>
                        <div className="inline-flex flex-col items-center justify-center bg-blue-50 px-6 py-2 rounded-xl">
                          <p className="text-sm md:text-base font-bold text-blue-600">{config.director?.position}</p>
                        </div>
                        {config.director?.rank && <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">{config.director.rank}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CMS Content if any */}
                {menuItem.content && menuItem.content !== '<p></p>' && (
                  <div className="mt-16 pt-16 border-t border-slate-100 text-left w-full mx-auto">
                    <div className="prose prose-slate prose-lg max-w-none rich-text-content font-kanit" dangerouslySetInnerHTML={{ __html: menuItem.content }} />
                  </div>
                )}

                {/* Contact Information Section for About Page */}
                <div className="mt-20 pt-16 border-t border-slate-100">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-slate-900 font-kanit tracking-tight mb-4">ข้อมูลการติดต่อ</h2>
                    <p className="text-slate-500 text-lg">ช่องทางการติดต่อและติดตามข่าวสารของโรงเรียน</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Address */}
                    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">ที่อยู่</h3>
                      <p className="text-lg font-bold text-slate-800 leading-snug">{formatAddress(config.address)}</p>
                    </div>

                    {/* Phone */}
                    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.09-7.074-7.07l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">เบอร์โทรศัพท์</h3>
                      <p className="text-xl font-black text-slate-800 tracking-tight">{config.phone || 'ยังไม่ได้ระบุเบอร์โทรศัพท์'}</p>
                    </div>

                    {/* Email */}
                    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">อีเมล</h3>
                      <p className="text-lg font-bold text-slate-800 break-all">{config.email || 'ยังไม่ได้ระบุอีเมล'}</p>
                    </div>

                    {/* Social Media Row Below */}
                    <div className="lg:col-span-3 flex flex-wrap justify-center gap-6 mt-4">
                      {config.socialMedia?.facebook?.visible && config.socialMedia?.facebook?.url && (
                        <a href={config.socialMedia.facebook.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 group shadow-sm hover:shadow-md">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
                          Facebook
                        </a>
                      )}
                      
                      {config.socialMedia?.line?.visible && config.socialMedia?.line?.url && (
                        <a href={config.socialMedia.line.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[#06C755]/10 hover:bg-[#06C755] text-[#06C755] hover:text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 group shadow-sm hover:shadow-md">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.15 8.52a10.8 10.8 0 0 0-18.3 0 10.8 10.8 0 0 0 18.3 0zm-8.8 11.23c-5.8 0-10.2-3.88-10.2-9.35s4.4-9.35 10.2-9.35 10.2 3.88 10.2 9.35-4.4 9.35-10.2 9.35z"/></svg>
                          Line
                        </a>
                      )}

                      {config.socialMedia?.youtube?.visible && config.socialMedia?.youtube?.url && (
                        <a href={config.socialMedia.youtube.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF0000] hover:text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 group shadow-sm hover:shadow-md">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                          YouTube
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="prose prose-slate prose-lg max-w-none">
                {menuItem.content && menuItem.content !== '<p></p>' ? (
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
