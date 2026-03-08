
import React, { useEffect, useState, useMemo } from 'react';
import { Achievement, SchoolConfig, MenuItem, AdminUser } from '@/types';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import FloatingButtons from '@/components/FloatingButtons/FloatingButtons';
import { stripHtml } from '@/constants';

interface AllAchievementsViewProps {
  achievements: Achievement[];
  config: SchoolConfig;
  menus: MenuItem[];
  isLoggedIn: boolean;
  loggedInUser: AdminUser | null;
  onLogout: () => void;
  onView?: (id: string) => void;
}

const Achievements: React.FC<AllAchievementsViewProps> = ({ achievements, config, menus, isLoggedIn, loggedInUser, onLogout, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter achievements based on search term
  const filteredAchievements = useMemo(() => {
    return achievements.filter(item => {
      const dateObj = new Date(item.date);
      const thaiDate = dateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
      const searchLower = searchTerm.toLowerCase();
      const plainContent = stripHtml(item.content || '').toLowerCase();
      
      return (
        item.title.toLowerCase().includes(searchLower) ||
        plainContent.includes(searchLower) ||
        thaiDate.toLowerCase().includes(searchLower)
      );
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [achievements, searchTerm]);

  // Pagination logic
  const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(filteredAchievements.length / itemsPerPage);
  const paginatedAchievements = useMemo(() => {
    if (itemsPerPage === -1) return filteredAchievements;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAchievements.slice(start, start + itemsPerPage);
  }, [filteredAchievements, currentPage, itemsPerPage]);

  // Reset to page 1 when search or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  return (
    <div 
      className="flex flex-col min-h-screen"
      style={{ 
        backgroundColor: config.bodyBackgroundColor || '#f8fafc',
        color: config.bodyTextColor || '#334155'
      }}
    >
      <Header config={config} menus={menus} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 md:mb-12 gap-6">
            <div className="flex items-center">
              <div className="w-1.5 h-8 bg-yellow-500 rounded-full mr-4 shadow-lg shadow-yellow-500/30"></div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black font-kanit text-slate-800 tracking-tight leading-tight">รางวัลและผลงานทั้งหมด</h2>
                <p className="text-slate-500 text-xs mt-1">ความภาคภูมิใจและผลแห่งความมุ่งมั่นของนักเรียนและครูโรงเรียนวัดสามัคคีธรรม</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
              <div className="relative flex-grow sm:min-w-[300px]">
                <input 
                  type="text" 
                  placeholder="ค้นหารางวัล (ชื่อเรื่อง, รายละเอียด, วันที่)..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pl-12 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
              <a href="#/" className="shrink-0 text-slate-500 font-bold hover:text-yellow-600 text-xs md:text-sm px-6 py-3 bg-slate-50 hover:bg-yellow-50 rounded-2xl transition-colors flex items-center justify-center gap-2 border border-slate-100">
                <span>🏠</span> กลับหน้าแรก
              </a>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">แสดง</span>
              <select 
                value={itemsPerPage} 
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 font-bold outline-none shadow-sm"
              >
                <option value={10}>10 รายการ</option>
                <option value={20}>20 รายการ</option>
                <option value={50}>50 รายการ</option>
                <option value={100}>100 รายการ</option>
                <option value={-1}>ทั้งหมด</option>
              </select>
            </div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
              พบทั้งหมด <span className="text-yellow-600">{filteredAchievements.length}</span> รายการ
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {paginatedAchievements.map(award => (
              <a 
                href={`#/achievement/${award.id}`} 
                key={award.id} 
                className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                onClick={() => onView && onView(award.id)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={award.image || null} alt={award.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                       ปี พ.ศ. {new Date(award.date).getFullYear() + 543}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold font-kanit text-slate-800 leading-snug mb-3 group-hover:text-yellow-600 transition-colors break-words line-clamp-2">
                    {award.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex items-center text-yellow-600 font-bold text-[10px] uppercase group-hover:translate-x-1 transition-transform">
                      รายละเอียดเพิ่มเติม <span className="ml-1.5">→</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] bg-slate-50 px-2.5 py-1 rounded-xl">
                      <span className="text-xs">👁️</span>
                      <span>{(award.views || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {filteredAchievements.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-slate-400 font-bold">ไม่พบข้อมูลที่ตรงกับการค้นหา</div>
              <button onClick={() => setSearchTerm('')} className="mt-4 text-yellow-600 text-sm font-bold hover:underline">ล้างการค้นหา</button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${currentPage === i + 1 ? 'bg-yellow-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
            <a href="#/" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 shadow-sm">
              <span>🏠</span> กลับหน้าแรก
            </a>
          </div>
        </div>
      </main>
      
      <FloatingButtons config={config} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Footer config={config} adminUser={loggedInUser || undefined} />
    </div>
  );
};

export default Achievements;
