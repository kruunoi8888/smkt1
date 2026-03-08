import React, { useEffect } from 'react';
import { NewsItem, SchoolConfig, MenuItem } from '@/types';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import FloatingButtons from '@/components/FloatingButtons/FloatingButtons';
import { formatThaiDate } from '@/constants';

interface NewsDetailViewProps {
  newsId: string;
  news: NewsItem[];
  config: SchoolConfig;
  menus: MenuItem[];
  isLoggedIn: boolean;
  onLogout: () => void;
  onView: (id: string) => void;
}

const NewsDetail: React.FC<NewsDetailViewProps> = ({ newsId, news, config, menus, isLoggedIn, onLogout, onView }) => {
  const item = news.find(n => n.id === newsId);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (item) {
      onView(item.id);
    }
  }, [newsId]);

  if (!item) {
    return (
      <div 
        className="flex flex-col min-h-screen"
        style={{ 
          backgroundColor: config.bodyBackgroundColor || '#f8fafc',
          color: config.bodyTextColor || '#334155'
        }}
      >
        <Header config={config} menus={menus} isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <main className="flex-grow container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">ไม่พบข่าวสารที่คุณต้องการ</h2>
          <a href="#/news" className="text-blue-600 font-bold hover:underline">← กลับไปหน้าข่าวสารทั้งหมด</a>
        </main>
        <FloatingButtons config={config} isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <Footer config={config} />
      </div>
    );
  }

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
        <div className="bg-white p-6 md:p-10 lg:p-12 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <a href="#/" className="text-slate-500 font-bold hover:text-blue-600 text-xs md:text-sm px-4 py-2 bg-slate-50 hover:bg-blue-50 rounded-full transition-colors inline-flex items-center gap-2">
                <span>🏠</span> กลับหน้าแรก
              </a>
              <a href="#/news" className="text-slate-500 font-bold hover:text-blue-600 text-xs md:text-sm px-4 py-2 bg-slate-50 hover:bg-blue-50 rounded-full transition-colors inline-flex items-center gap-2">
                <span>📰</span> ดูข่าวสารทั้งหมด
              </a>
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-kanit text-slate-800 leading-tight mb-4">{item.title}</h1>
            <div className="flex items-center gap-4 text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest">
              <span>{formatThaiDate(item.date)}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <div className="flex items-center gap-1.5">
                <span>👁️</span>
                <span>{(item.views || 0).toLocaleString()} ครั้ง</span>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-10 shadow-md border border-slate-100">
            <img src={item.image || null} alt={item.title} className="w-full h-auto object-cover max-h-[600px]" />
          </div>

          <div className="prose prose-slate max-w-none mb-12">
            <div 
              className="text-slate-700 leading-relaxed text-sm md:text-base font-kanit rich-text-content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>

          {item.images && item.images.length > 0 && (
            <div className="mt-12 pt-12 border-t border-slate-100">
              <h3 className="text-lg md:text-xl font-black font-kanit text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                ภาพประกอบเพิ่มเติม
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {item.images.map((img, idx) => (
                  <a href={img} target="_blank" rel="noopener noreferrer" key={idx} className="block rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all group aspect-[4/3]">
                    <img src={img || null} alt={`Additional ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-4 justify-center">
            <a href="#/" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 shadow-sm">
              <span>🏠</span> กลับหน้าแรก
            </a>
            <a href="#/news" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 shadow-md shadow-blue-200">
              <span>📰</span> ดูข่าวสารทั้งหมด
            </a>
          </div>
        </div>
      </main>
      
      <FloatingButtons config={config} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Footer config={config} />
    </div>
  );
};

export default NewsDetail;
