
import React, { useState, useEffect } from 'react';
import AppRouter from '@/router/AppRouter';
import { INITIAL_CONFIG } from '@/constants';
import { SchoolConfig, NewsItem, Achievement, Personnel, Journal, MenuItem, CalendarEvent, AdminUser } from '@/types';
import { getData, saveData } from '@/services/dataService';
import { login, logout, checkAuth } from '@/services/authService';

const App: React.FC = () => {
  // เริ่มต้น Route จาก Hash ปัจจุบันหรือ default เป็นหน้าแรก
  const [route, setRoute] = useState<string>(window.location.hash || '#/');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Global States
  const [config, setConfig] = useState<SchoolConfig>(INITIAL_CONFIG);
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
      if (Array.isArray(menusData)) setMenus(menusData);
      if (Array.isArray(eventsData)) setEvents(eventsData.sort((a, b) => b.date.localeCompare(a.date)));
      if (Array.isArray(adminsData)) setAdminUsers(adminsData);
      
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-kanit">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-bold">กำลังโหลดข้อมูล...</p>
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
