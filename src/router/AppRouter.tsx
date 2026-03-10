import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import AdminPortal from '@/pages/Admin/AdminPortal';
import AllNews from '@/pages/News/AllNews';
import NewsDetail from '@/pages/News/NewsDetail';
import Staff from '@/pages/Staff/Staff';
import Achievements from '@/pages/Achievements/Achievements';
import AchievementDetail from '@/pages/Achievements/AchievementDetail';
import Journals from '@/pages/Journals/Journals';
import CustomPage from '@/pages/CustomPage/CustomPage';

interface AppRouterProps {
  // Global states and handlers passed from App.tsx
  config: any;
  setConfig: any;
  news: any[];
  setNews: any;
  staff: any[];
  setStaff: any;
  achievements: any[];
  setAchievements: any;
  journals: any[];
  setJournals: any;
  menus: any[];
  setMenus: any;
  events: any[];
  setEvents: any;
  adminUsers: any[];
  setAdminUsers: any;
  isLoggedIn: boolean;
  loggedInUser: any;
  handleLogin: (u: string, p: string) => Promise<boolean>;
  handleLogout: () => Promise<void>;
  handleNewsView: (id: string) => void;
  handleAchievementView: (id: string) => void;
  handleJournalView: (id: string) => void;
}

const AppRouter: React.FC<AppRouterProps> = (props) => {
  const {
    config, setConfig, news, setNews, staff, setStaff,
    achievements, setAchievements, journals, setJournals,
    menus, setMenus, events, setEvents, adminUsers, setAdminUsers,
    isLoggedIn, loggedInUser, handleLogin, handleLogout,
    handleNewsView, handleAchievementView, handleJournalView
  } = props;

  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={
          <Home 
            config={config} news={news} staff={staff} 
            achievements={achievements} journals={journals} 
            menus={menus} events={events} adminUsers={adminUsers}
            isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}
            onLogout={handleLogout} onJournalView={handleJournalView}
          />
        } />

        {/* News */}
        <Route path="/news" element={
          <AllNews 
            news={news} config={config} menus={menus} 
            isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}
            onLogout={handleLogout} 
          />
        } />
        <Route path="/news/:id" element={
          <NewsDetail 
            news={news} config={config} menus={menus} 
            isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}
            onLogout={handleLogout} onView={handleNewsView}
          />
        } />

        {/* Staff */}
        <Route path="/staff" element={
          <Staff 
            staff={staff} config={config} menus={menus} 
            isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}
            onLogout={handleLogout} 
          />
        } />

        {/* Achievements */}
        <Route path="/achievements" element={
          <Achievements 
            achievements={achievements} config={config} menus={menus} 
            isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}
            onLogout={handleLogout} onView={handleAchievementView}
          />
        } />
        <Route path="/achievement/:id" element={
          <AchievementDetail 
            achievementId="" // Will be taken from params in component or passed here
            achievements={achievements} config={config} menus={menus} 
            isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}
            onLogout={handleLogout} onView={handleAchievementView}
          />
        } />

        {/* Journals */}
        <Route path="/journals" element={
          <Journals 
            journals={journals} config={config} menus={menus} 
            isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}
            onLogout={handleLogout} onView={handleJournalView}
          />
        } />

        {/* Admin */}
        <Route path="/admin" element={
          isLoggedIn ? (
            <AdminPortal 
              config={config} setConfig={setConfig}
              news={news} setNews={setNews}
              staff={staff} setStaff={setStaff}
              achievements={achievements} setAchievements={setAchievements}
              journals={journals} setJournals={setJournals}
              menus={menus} setMenus={setMenus}
              events={events} setEvents={setEvents}
              adminUsers={adminUsers} setAdminUsers={setAdminUsers}
              loggedInUser={loggedInUser} onLogout={handleLogout}
            />
          ) : (
            <Login onLogin={handleLogin} />
          )
        } />

        {/* Custom Pages and Static CMS pages */}
        <Route path="/page/:id" element={
          <CustomPageWrapper 
            config={config} menus={menus} isLoggedIn={isLoggedIn} 
            loggedInUser={loggedInUser} onLogout={handleLogout} 
          />
        } />
        <Route path="/contact" element={
          <CustomPageWrapper 
            config={config} menus={menus} isLoggedIn={isLoggedIn} 
            loggedInUser={loggedInUser} onLogout={handleLogout} 
            pathOverride="#/contact"
          />
        } />
        <Route path="/about" element={
          <CustomPageWrapper 
            config={config} menus={menus} isLoggedIn={isLoggedIn} 
            loggedInUser={loggedInUser} onLogout={handleLogout} 
            pathOverride="#/about"
          />
        } />
        
        {/* Fallback for other hash routes if any */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// Helper to handle custom page logic
const CustomPageWrapper: React.FC<any> = ({ config, menus, isLoggedIn, loggedInUser, onLogout, pathOverride }) => {
  const { id } = useParams();
  const menuItem = menus.find((m: any) => 
    (pathOverride && m.path === pathOverride) || 
    (id && (m.id === id || m.path === `#/page/${id}`))
  );
  
  if (!menuItem) return <Navigate to="/" replace />;
  
  return (
    <CustomPage 
      menuItem={menuItem} config={config} menus={menus}
      isLoggedIn={isLoggedIn} loggedInUser={loggedInUser} onLogout={onLogout}
    />
  );
};

export default AppRouter;
