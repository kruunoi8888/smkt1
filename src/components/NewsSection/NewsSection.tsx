
import React from 'react';
import { NewsItem } from '@/types';
import { formatThaiDate, stripHtml } from '@/constants';

interface NewsSectionProps {
  news: NewsItem[];
  bodyTextColor?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, bodyTextColor }) => {
  // Sort news by date descending
  const sortedNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full mr-4 shadow-lg shadow-blue-500/30"></div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black font-kanit tracking-tight leading-tight" style={{ color: bodyTextColor || '#1e293b' }}>ข่าวสารและกิจกรรมโรงเรียน</h2>
            <p className="text-xs mt-1" style={{ color: bodyTextColor || '#64748b', opacity: 0.7 }}>ติดตามความเคลื่อนไหว กิจกรรม และประกาศต่างๆ ของโรงเรียน</p>
          </div>
        </div>
        <a href="#/news" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm px-6 py-2.5 rounded-full transition-all shadow-md shadow-blue-100 flex items-center gap-2">
          <span>📰</span> ดูข่าวทั้งหมด
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNews.slice(0, 6).map(item => (
          <a href={`#/news/${item.id}`} key={item.id} className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-xl transition-all duration-500 flex flex-col h-full">
            <div className="relative aspect-video overflow-hidden">
              <img src={item.image || null} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-grow">
              <span className="text-[9px] md:text-[10px] font-bold mb-2 block uppercase tracking-widest" style={{ color: bodyTextColor || '#94a3b8', opacity: 0.6 }}>
                {formatThaiDate(item.date)}
              </span>
              <h3 className="text-sm md:text-base font-bold font-kanit leading-snug mb-2 group-hover:text-blue-600 transition-colors break-words line-clamp-2" style={{ color: bodyTextColor || '#1e293b' }}>
                {item.title}
              </h3>
              <p className="text-[11px] md:text-xs leading-relaxed mb-4 break-words line-clamp-3" style={{ color: bodyTextColor || '#64748b', opacity: 0.8 }}>
                {stripHtml(item.content)}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="flex items-center text-blue-600 font-bold text-[9px] md:text-[10px] uppercase group-hover:translate-x-1 transition-transform">
                  อ่านต่อ <span className="ml-1.5">→</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[9px] md:text-[10px] bg-slate-50 px-2.5 py-1 rounded-xl">
                  <span className="text-xs">👁️</span>
                  <span>{(item.views || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
