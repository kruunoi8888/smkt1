import React, { useState, useEffect } from 'react';
import AppRouter from '@/router/AppRouter';
import { 
  INITIAL_CONFIG, INITIAL_NEWS, INITIAL_PERSONNEL, 
  INITIAL_ACHIEVEMENTS, INITIAL_JOURNALS, INITIAL_MENUS, 
  INITIAL_EVENTS 
} from '@/constants';
import { SchoolConfig, NewsItem, Achievement, Personnel, Journal, MenuItem, CalendarEvent, AdminUser } from '@/types';
import { getData, saveData } from '@/services/dataService';
import { login, logout, checkAuth } from '@/services/authService';

const App: React.FC = () => {
  // เริ่มต้น Route จาก Hash ปัจจุบันหรือ default เป็นหน้าแรก
  const [route, setRoute] = useState<string>(window.location.hash || '#/');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Global States
  const [config, setConfig] = useState<SchoolConfig>(INITIAL_CONFIG); // Keep config but no content arrays
  const [loggedInUser, setLoggedInUser] = useState<AdminUser | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [staff, setStaff] = useState<Personnel[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  // Fetch all data from API
  const fetchData = async () => {
    try {
      const [
        configData,
        newsData,
        staffData,
        achievementsData,
        journalsData,
        menusData,
        eventsData,
        adminsData,
        authStatus
      ] = await Promise.all([
        getData('config'),
        getData('news'),
        getData('personnel'),
        getData('achievements'),
        getData('journals'),
        getData('menus'),
        getData('events'),
        getData('admin_users'),
        checkAuth()
      ]);

      if (configData && (configData as any).id) setConfig(configData);
      if (Array.isArray(newsData)) setNews(newsData);
      if (Array.isArray(staffData)) setStaff(staffData);
      if (Array.isArray(achievementsData)) setAchievements(achievementsData);
      if (Array.isArray(journalsData)) {
        setJournals(journalsData.sort((a, b) => {
          const dateA = a.dateStr ? new Date(a.dateStr).getTime() : 0;
          const dateB = b.dateStr ? new Date(b.dateStr).getTime() : 0;
          return dateB - dateA;
        }));
      }
      if (Array.isArray(menusData)) {
        setMenus(menusData.map((m: any) => ({
          ...m,
          isActive: m.isactive !== undefined ? m.isactive : (m.isActive !== undefined ? m.isActive : true),
          isDefault: m.isdefault !== undefined ? m.isdefault : m.isDefault
        })));
      }
      if (Array.isArray(eventsData)) setEvents(eventsData.sort((a, b) => b.date.localeCompare(a.date)));
      if (Array.isArray(adminsData)) {
        setAdminUsers(adminsData.map((a: any) => ({
          ...a,
          isDefault: a.isdefault !== undefined ? a.isdefault : a.isDefault
        })));
      }
      
      if (authStatus.isLoggedIn) {
        setIsLoggedIn(true);
        setLoggedInUser(authStatus.user);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Visitor Counter Logic
  useEffect(() => {
    if (isLoading || !config.visitorStats) return;

    const lastVisitDate = localStorage.getItem('school_last_visit_date');
    const todayStr = new Date().toISOString().split('T')[0];

    if (lastVisitDate !== todayStr) {
      const newStats = {
        ...config.visitorStats,
        today: 1,
        thisMonth: config.visitorStats.thisMonth + 1,
        total: config.visitorStats.total + 1
      };
      
      saveData('config', { ...config, visitorStats: newStats }).then(() => {
        setConfig(prev => ({ ...prev, visitorStats: newStats }));
        localStorage.setItem('school_last_visit_date', todayStr);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash || '#/';
      setRoute(currentHash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = async (user: string, pass: string) => {
    try {
      const res = await login({ username: user, password: pass });
      if (res.success) {
        setIsLoggedIn(true);
        setLoggedInUser(res.user);
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    return false;
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/90 backdrop-blur-md font-kanit transition-all duration-500">
        <div className="text-center space-y-8 p-10 bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 flex flex-col items-center max-w-sm w-[90%] animate-in fade-in zoom-in duration-700">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-[6px] border-slate-100"></div>
            <div className="absolute inset-0 rounded-full border-[6px] border-blue-600 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/></svg>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-800 mb-2">กำลังเตรียมข้อมูล...</h3>
            <p className="text-sm text-slate-500 font-medium">กรุณารอสักครู่ ระบบกำลังเชื่อมต่อฐานข้อมูล</p>
          </div>
        </div>
      </div>
    );
  }

  const handleNewsView = (id: string) => {
    const item = news.find(n => n.id === id);
    if (item) {
      const updated = { ...item, views: (item.views || 0) + 1 };
      setNews(prev => prev.map(n => n.id === id ? updated : n));
      saveData('news', updated);
    }
  };

  const handleAchievementView = (id: string) => {
    const item = achievements.find(a => a.id === id);
    if (item) {
      const updated = { ...item, views: (item.views || 0) + 1 };
      setAchievements(prev => prev.map(a => a.id === id ? updated : a));
      saveData('achievements', updated);
    }
  };

  const handleJournalView = (id: string) => {
    const item = journals.find(j => j.id === id);
    if (item) {
      const updated = { ...item, views: (item.views || 0) + 1 };
      setJournals(prev => prev.map(j => j.id === id ? updated : j));
      saveData('journals', updated);
    }
  };

  return (
    <>
      <style>{`
        body, h1, h2, h3, h4, h5, h6, .font-kanit {
          font-family: ${config.fontFamily ? `"${config.fontFamily}", sans-serif !important` : 'inherit'};
        }
      `}</style>
      <AppRouter 
        config={config} setConfig={setConfig}
        news={news} setNews={setNews}
        staff={staff} setStaff={setStaff}
        achievements={achievements} setAchievements={setAchievements}
        journals={journals} setJournals={setJournals}
        menus={menus} setMenus={setMenus}
        events={events} setEvents={setEvents}
        adminUsers={adminUsers} setAdminUsers={setAdminUsers}
        isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}
        handleLogin={handleLogin} handleLogout={handleLogout}
        handleNewsView={handleNewsView}
        handleAchievementView={handleAchievementView}
        handleJournalView={handleJournalView}
      />
    </>
  );
};

export default App;
