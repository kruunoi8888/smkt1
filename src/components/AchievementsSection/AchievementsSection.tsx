
import React from 'react';
import { Achievement } from '@/types';
import { formatThaiDate } from '@/constants';

interface AchievementsSectionProps {
  achievements: Achievement[];
  bodyTextColor?: string;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements, bodyTextColor }) => {
  return (
    <section className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <div className="w-1.5 h-8 bg-yellow-500 rounded-full mr-4 shadow-lg shadow-yellow-500/30"></div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black font-kanit leading-tight" style={{ color: bodyTextColor || '#1e293b' }}>รางวัลและผลงาน</h2>
            <p className="text-xs mt-1" style={{ color: bodyTextColor || '#64748b', opacity: 0.7 }}>ความภาคภูมิใจและผลแห่งความมุ่งมั่นของนักเรียนและครู</p>
          </div>
        </div>
        <a href="#/achievements" className="text-blue-600 font-bold hover:underline text-xs md:text-sm bg-blue-50 px-4 py-2 rounded-full transition-colors">ดูผลงานทั้งหมด</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.slice(0, 6).map(award => (
          <a href={`#/achievement/${award.id}`} key={award.id} className="bg-white rounded-[1rem] md:rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group block cursor-pointer">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={award.image || null} 
                alt={award.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-yellow-100 text-yellow-700 text-[9px] md:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                   {formatThaiDate(award.date)}
                </span>
              </div>
              <h4 className="text-sm md:text-base font-bold font-kanit leading-snug group-hover:text-blue-600 transition-colors break-words line-clamp-2" style={{ color: bodyTextColor || '#1e293b' }}>
                {award.title}
              </h4>
              <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors flex items-center gap-1">
                  รายละเอียดเพิ่มเติม <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[9px] md:text-[10px] bg-slate-50 px-2.5 py-1 rounded-xl">
                  <span className="text-[11px]">👁️</span>
                  <span>{award.views?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
