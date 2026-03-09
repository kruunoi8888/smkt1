
import React, { useState } from 'react';
import { SchoolConfig, AdminUser } from '@/types';
import { INITIAL_ADMINS } from '@/constants';

interface FooterProps {
  config: SchoolConfig;
  adminUser?: AdminUser;
}

const Footer: React.FC<FooterProps> = ({ config, adminUser }) => {
  const [showDevModal, setShowDevModal] = useState(false);
  const devUser = adminUser || INITIAL_ADMINS[0];

  return (
    <>
      <footer className="pt-12 pb-10 border-t border-slate-900" style={{ backgroundColor: config.footerBackgroundColor || config.primaryColor || '#020617', color: config.footerTextColor || '#94a3b8' }}>
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          
          {/* บรรทัดที่ 1: Copyright - ปรับขนาดให้เหมาะสม ไม่ใหญ่จนเกินไป */}
          <div className="w-full max-w-5xl">
            <h2 className="text-base md:text-xl font-bold font-kanit leading-tight opacity-90" style={{ color: config.footerTextColor || '#ffffff' }}>
              © 2026 {config.name}. All Rights Reserved.
            </h2>
          </div>

          {/* บรรทัดที่ 2: Contact Information - ปรับระยะห่าง (mt-2) ให้ชิดกับบรรทัดแรก */}
          <div className="w-full max-w-5xl mb-8 mt-2">
            <div className="flex flex-wrap justify-center items-center gap-y-3 gap-x-4 md:gap-x-6 text-[12px] md:text-sm font-kanit" style={{ color: config.footerTextColor || '#94a3b8' }}>
              <div className="flex items-center gap-1.5">
                <span className="text-base opacity-70 shrink-0">📍</span>
                <span className="break-words">{config.address}</span>
              </div>
              
              <div className="hidden md:block w-px h-3 bg-slate-800 opacity-50"></div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-base opacity-70 shrink-0">📞</span>
                <span className="whitespace-nowrap">{config.phone}</span>
              </div>

              <div className="hidden md:block w-px h-3 bg-slate-800 opacity-50"></div>

              <div className="flex items-center gap-1.5">
                <span className="text-base opacity-70 shrink-0">✉️</span>
                <span className="break-all">{config.email}</span>
              </div>
            </div>
          </div>

          {/* Social Media Icons - Reduced bottom margin to bring Power By closer */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {/* Facebook */}
            {config.socialMedia?.facebook.visible && (
              <SocialIcon href={config.socialMedia.facebook.url} color="hover:bg-[#1877F2]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </SocialIcon>
            )}
            {/* Line */}
            {config.socialMedia?.line.visible && (
              <SocialIcon href={config.socialMedia.line.url} color="hover:bg-[#06C755]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.083.922.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975 1.766-1.97 2.547-3.794 2.547-5.968zm-14.5 2.196c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1s1 .448 1 1v2zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1s1 .448 1 1v2zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1s1 .448 1 1v2z"/></svg>
              </SocialIcon>
            )}
            {/* YouTube */}
            {config.socialMedia?.youtube.visible && (
              <SocialIcon href={config.socialMedia.youtube.url} color="hover:bg-[#FF0000]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </SocialIcon>
            )}
          </div>

          {/* Visitor Counter Section */}
          <div className="w-full max-w-4xl mb-10">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <VisitorStat 
                label="วันนี้" 
                value={config.visitorStats?.today || 0} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                textColor={config.footerTextColor}
              />
              <VisitorStat 
                label="เดือนนี้" 
                value={config.visitorStats?.thisMonth || 0} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
                textColor={config.footerTextColor}
              />
              <VisitorStat 
                label="ทั้งหมด" 
                value={config.visitorStats?.total || 0} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>}
                textColor={config.footerTextColor}
              />
            </div>
          </div>

        {/* Bottom Attribution Bar - Reduced top padding and border opacity */}
          <div className="w-full pt-6 border-t border-slate-900/50 flex flex-col items-center">
            <div className="text-[10px] md:text-[11px] font-kanit tracking-[0.05em] uppercase font-bold text-center" style={{ color: config.footerTextColor || '#475569' }}>
              Power By : <span 
                className="cursor-pointer transition-colors duration-300 ml-1 hover:opacity-80"
                style={{ color: config.secondaryColor || '#eab308' }}
                onClick={() => setShowDevModal(true)}
              >
                Mr.Ratchapol Worrakan
              </span>
              <span className="mx-2 hidden md:inline opacity-50">|</span>
              <span className="block md:inline mt-1 md:mt-0">โทร. 0815144041</span>
              <span className="mx-2 hidden md:inline opacity-50">|</span>
              <span className="block md:inline mt-1 md:mt-0">E-mail: kruunoi@gmail.com</span>
            </div>
            
            {/* Admin Link */}
            <a href="#/admin" className="mt-4 opacity-20 hover:opacity-100 transition-opacity text-[9px] font-black uppercase tracking-widest" style={{ color: config.footerTextColor || '#334155' }}>
              Admin Portal
            </a>
          </div>
        </div>
      </footer>

      {/* Developer Modal */}
      {showDevModal && devUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setShowDevModal(false)}>
          <div 
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-sm md:max-w-md overflow-hidden relative animate-in zoom-in-95 duration-300 ring-1 ring-white/20"
            onClick={e => e.stopPropagation()}
          >
            {/* Header Background with Pattern */}
            <div className="h-32 md:h-40 bg-gradient-to-br from-blue-600 to-indigo-900 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[length:20px_20px]"></div>
              
              {/* Professional Close Button */}
              <button 
                onClick={() => setShowDevModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-md border border-white/10 hover:scale-105 active:scale-95 group"
                title="Close Modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 md:px-8 pb-8 md:pb-10 -mt-16 md:-mt-20 flex flex-col items-center text-center relative z-10">
              {/* Avatar - Responsive size */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[4px] md:border-[6px] border-white shadow-2xl bg-white overflow-hidden mb-4 md:mb-6 flex items-center justify-center group">
                <img 
                  src={devUser.image || null} 
                  alt={devUser.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>

              {/* Name & Role */}
              <h3 className="text-xl md:text-2xl font-black text-slate-800 font-kanit mb-1 md:mb-2 leading-tight">{devUser.name}</h3>
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 bg-blue-50 text-blue-600 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-6 md:mb-8 border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                System Developer
              </div>

              {/* Contact Info Cards */}
              <div className="w-full space-y-3 md:space-y-4">
                {devUser.phone && (
                  <div className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Contact Number</p>
                      <p className="text-base md:text-lg font-bold font-kanit text-slate-700 truncate">{devUser.phone}</p>
                    </div>
                  </div>
                )}
                
                {devUser.email && (
                  <div className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Email Address</p>
                      <p className="text-base md:text-lg font-bold font-kanit text-slate-700 break-all">{devUser.email}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer text */}
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-100 w-full">
                <p className="text-[14px] md:text-[16px] font-medium text-slate-400 uppercase tracking-widest">
                  [ผู้พัฒนาระบบ]
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SocialIcon: React.FC<{ href: string, children: React.ReactNode, color: string }> = ({ href, children, color }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-500 transition-all active:scale-95 ${color} hover:text-white hover:border-transparent`}
  >
    {children}
  </a>
);

const VisitorStat: React.FC<{ label: string, value: number, icon: React.ReactNode, textColor?: string }> = ({ label, value, icon, textColor }) => (
  <div className="flex flex-col items-center p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
    <div className="flex items-center gap-2 mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
      <div className="text-white/80">
        {icon}
      </div>
      <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest" style={{ color: textColor || '#94a3b8' }}>{label}</span>
    </div>
    <div className="text-lg md:text-2xl font-black font-kanit tracking-tight" style={{ color: textColor || '#ffffff' }}>
      {value.toLocaleString()}
    </div>
  </div>
);

export default Footer;
