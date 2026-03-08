
import React, { useState, useEffect } from 'react';
import { SchoolConfig, NewsItem, Achievement, Personnel, Journal, MenuItem, CalendarEvent, SchoolSlide, AdminUser } from '@/types';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import NewsSection from '@/components/NewsSection/NewsSection';
import AchievementsSection from '@/components/AchievementsSection/AchievementsSection';
import PersonnelSection from '@/components/PersonnelSection/PersonnelSection';
import JournalsSection from '@/components/JournalsSection/JournalsSection';
import Footer from '@/components/Footer/Footer';
import Calendar from '@/components/Calendar/Calendar';
import WidgetRenderer from '@/components/WidgetRenderer/WidgetRenderer';
import StudentDashboard from '@/components/StudentDashboard/StudentDashboard';
import FloatingButtons from '@/components/FloatingButtons/FloatingButtons';

const SolidIcons = {
  Students: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.27 10.27 0 003.361-1.023.75.75 0 00.373-.647V18a6 6 0 00-5.328-5.968 7.478 7.478 0 011.83 4.341v2.755z" /></svg>,
  Male: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 18a6 6 1 0 0 0 0-12 6 6 0 0 0 0 12Z"/><path d="m17 7 4.7-4.7"/><path d="M21.5 7h-5v-5"/></svg>,
  Female: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 13a6 6 1 0 0 0 0-12 6 6 0 0 0 0 12Z"/><path d="M12 13v8"/><path d="M9 18h6"/></svg>,
  Staff: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M11.7 2.805a.75.75 0 01.6 0A13.507 13.507 0 0119.657 8.25a.75.75 0 01.143.765c-.034.093-.08.181-.138.26ll-1.63 2.21a.75.75 0 00.143.987l2.21 1.63c.079.058.167.104.26.138a.75.75 0 01.143.765 13.501 13.501 0 01-7.557 5.445.75.75 0 01-.6 0 13.501 13.501 0 01-7.557-5.445.75.75 0 01.143-.765c.034-.093.08-.181.138-.26l1.63-2.21a.75.75 0 00-.143-.987l-2.21-1.63a.75.75 0 01-.143-.765A13.507 13.507 0 0111.7 2.805z" /></svg>,
  Award: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>,
  News: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>,
  Journal: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
};

interface HomeViewProps {
  config: SchoolConfig;
  news: NewsItem[];
  staff: Personnel[];
  achievements: Achievement[];
  journals: Journal[];
  menus: MenuItem[];
  events: CalendarEvent[];
  adminUsers: AdminUser[];
  isLoggedIn: boolean;
  loggedInUser: AdminUser | null;
  onLogout: () => void;
  onJournalView: (id: string) => void;
}

const Home: React.FC<HomeViewProps> = ({ 
  config, news, staff, achievements, journals, menus, events, adminUsers, isLoggedIn, loggedInUser, onLogout, onJournalView
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Calculate totals from gradeStats
  const totalMale = config.stats?.gradeStats?.reduce((sum, gs) => sum + (gs.male || 0), 0) || 0;
  const totalFemale = config.stats?.gradeStats?.reduce((sum, gs) => sum + (gs.female || 0), 0) || 0;
  const totalStudents = totalMale + totalFemale;

  // ฟังก์ชันนำทางไปยังหน้า Admin
  const navigateToAdmin = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/admin';
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
      <main className="flex-grow">
        <Hero config={config} />
        
        <WidgetRenderer position="banner" widgets={config.widgets} menus={menus} bodyTextColor={config.bodyTextColor} />
        
        {/* Stats Dashboard */}
        <div className="py-4 md:py-6 bg-slate-50/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              <SummaryCard icon={<SolidIcons.Students />} label="นักเรียนทั้งหมด" value={totalStudents} iconBg="bg-blue-600" iconColor="text-white" bodyTextColor={config.bodyTextColor} />
              <a href="#/staff" className="block transition-transform hover:-translate-y-1">
                <SummaryCard icon={<SolidIcons.Staff />} label="ครูและบุคลากร" value={staff.length} iconBg="bg-rose-500" iconColor="text-white" bodyTextColor={config.bodyTextColor} />
              </a>
              <SummaryCard icon={<SolidIcons.News />} label="ข่าวและกิจกรรม" value={news.length} iconBg="bg-emerald-500" iconColor="text-white" bodyTextColor={config.bodyTextColor} />
              <SummaryCard icon={<SolidIcons.Award />} label="รางวัล & ผลงาน" value={achievements.length} iconBg="bg-orange-500" iconColor="text-white" bodyTextColor={config.bodyTextColor} />
              <SummaryCard icon={<SolidIcons.Journal />} label="วารสารโรงเรียน" value={journals.length} iconBg="bg-indigo-500" iconColor="text-white" bodyTextColor={config.bodyTextColor} />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            <div className="lg:col-span-9 flex flex-col gap-6">
              <section className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col flex-1 min-h-[350px]">
                 <div className="px-6 py-4 border-b border-white/10 shrink-0" style={{ backgroundColor: config.primaryColor || '#0f172a' }}>
                    <h2 className="text-sm font-bold text-white font-kanit uppercase tracking-wide">กิจกรรมของโรงเรียน</h2>
                 </div>
                 <div className="relative flex-grow w-full bg-slate-100">
                    <ImageSlider slides={config.slides || []} />
                 </div>
              </section>

              <section className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col flex-1 min-h-[350px]">
                <div className="px-6 py-4 border-b border-white/10 shrink-0" style={{ backgroundColor: config.primaryColor || '#0f172a' }}>
                  <h2 className="text-sm font-bold text-white font-kanit uppercase tracking-wide">วิดีโอแนะนำโรงเรียน</h2>
                </div>
                <div className="flex-grow w-full bg-slate-900">
                  <iframe className="w-full h-full" src={config.videoUrl} title="School Video" allowFullScreen />
                </div>
              </section>
            </div>

            <div className="lg:col-span-3 space-y-6 flex flex-col">
              <Calendar events={events} primaryColor={config.primaryColor} bodyTextColor={config.bodyTextColor} />
              
              <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border-t-[8px] text-center flex flex-col items-center group transition-all duration-500 bg-white" style={{ borderTopColor: config.primaryColor || '#0f172a' }}>
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-[8px] border-slate-50 shadow-inner mb-5">
                  {config.director?.image ? <img src={config.director.image || null} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300"><SolidIcons.Students /></div>}
                </div>
                <h3 className="text-base font-bold font-kanit leading-tight mb-1" style={{ color: config.bodyTextColor || '#1e293b' }}>{config.director?.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: config.bodyTextColor || '#1e293b', opacity: 0.7 }}>{config.director?.position}</p>
              </div>

              <PersonnelSection staff={staff} primaryColor={config.primaryColor} bodyTextColor={config.bodyTextColor} />
            </div>
          </div>

          <div className="space-y-12 md:space-y-16 mt-12">
            <WidgetRenderer position="middle" widgets={config.widgets} menus={menus} bodyTextColor={config.bodyTextColor} />
            <NewsSection news={news} bodyTextColor={config.bodyTextColor} />
            <AchievementsSection achievements={achievements} bodyTextColor={config.bodyTextColor} />
            <JournalsSection journals={journals} onView={onJournalView} bodyTextColor={config.bodyTextColor} />
            
            <section className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="px-8 py-5 border-b border-white/5" style={{ backgroundColor: config.primaryColor || '#0f172a' }}>
                <h2 className="text-xl md:text-2xl font-bold text-white font-kanit">แดชบอร์ดข้อมูลนักเรียน</h2>
              </div>
              <div className="p-6 md:p-10">
                <StudentDashboard gradeStats={config.stats?.gradeStats || []} primaryColor={config.primaryColor} bodyTextColor={config.bodyTextColor} />
              </div>
            </section>
            
            <WidgetRenderer position="bottom" widgets={config.widgets} menus={menus} bodyTextColor={config.bodyTextColor} />
          </div>
        </div>
      </main>
      
      <FloatingButtons config={config} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Footer config={config} adminUser={loggedInUser || adminUsers[0]} />
    </div>
  );
};

const ImageSlider: React.FC<{ slides: SchoolSlide[] }> = ({ slides }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return;
    const itv = setInterval(() => setIdx(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(itv);
  }, [slides]);
  if (!slides.length) return null;
  return (
    <div className="absolute inset-0 w-full h-full">
      {slides.map((s, i) => (
        <div key={s.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <img src={s.image || null} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 p-6 bg-gradient-to-t from-black/80 text-white w-full"><h3 className="font-bold">{s.title}</h3><p className="text-xs opacity-80">{s.description}</p></div>
        </div>
      ))}
    </div>
  );
};

const SummaryCard: React.FC<any> = ({ icon, label, value, iconBg, iconColor, bodyTextColor }) => (
  <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
    <div className={`w-16 h-16 ${iconBg} ${iconColor} rounded-[1.5rem] flex items-center justify-center p-4 shadow-lg shadow-current/10 group-hover:scale-110 transition-transform duration-500`}>
      {icon}
    </div>
    <div className="flex flex-col">
      <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: bodyTextColor || '#94a3b8', opacity: 0.6 }}>{label}</p>
      <p className="text-3xl font-black tracking-tight" style={{ color: bodyTextColor || '#1e293b' }}>{value.toLocaleString()}</p>
    </div>
  </div>
);

const DataBadge: React.FC<any> = ({ label, value, icon, color }) => {
  const c = { blue: "bg-blue-50 text-blue-600", rose: "bg-rose-50 text-rose-600", slate: "bg-slate-50 text-slate-800" };
  return (
    <div className={`p-6 rounded-[1.5rem] border ${c[color as keyof typeof c]} flex items-center justify-between`}>
      <div><p className="text-[10px] font-black uppercase opacity-80">{label}</p><p className="text-2xl font-black">{value}</p></div>
      <div className="w-8 h-8 opacity-20">{icon}</div>
    </div>
  );
};

export default Home;
