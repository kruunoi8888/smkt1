
import React from 'react';
import { Personnel } from '@/types';

interface PersonnelSectionProps {
  staff: Personnel[];
  primaryColor?: string;
  bodyTextColor?: string;
}

const PersonnelSection: React.FC<PersonnelSectionProps> = ({ staff, primaryColor, bodyTextColor }) => {
  // สร้างรายการซ้ำเพื่อให้เลื่อนได้ต่อเนื่อง
  const duplicatedStaff = [...staff, ...staff, ...staff];

  const renderAvatar = (person: Personnel) => {
    if (person.image && person.image !== "") {
      return (
        <img 
          src={person.image || null} 
          alt={person.name} 
          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" 
        />
      );
    }
    
    // ไอคอนเริ่มต้นตามเพศ
    const isMale = person.gender === 'male';
    return (
      <div className={`w-full h-full flex items-center justify-center ${isMale ? 'bg-blue-50 text-blue-300' : 'bg-rose-50 text-rose-300'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      </div>
    );
  };

  return (
    <section className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col h-[480px]">
      <div className="px-8 py-5 flex flex-col border-b border-white/10 shrink-0" style={{ backgroundColor: primaryColor || '#0f172a' }}>
        <div className="flex items-center gap-3">
          <span className="text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.27 10.27 0 003.361-1.023.75.75 0 00.373-.647V18a6 6 0 00-5.328-5.968 7.478 7.478 0 011.83 4.341v2.755z" /></svg>
          </span>
          <h2 className="text-base font-bold text-white font-kanit uppercase tracking-wide">ทำเนียบครูและบุคลากร</h2>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-1.5" style={{ color: 'white', opacity: 0.6 }}>Personnel Directory</p>
      </div>

      <div className="relative flex-grow overflow-hidden group">
        <style>
          {`
            @keyframes marqueeVertical {
              0% { transform: translateY(0); }
              100% { transform: translateY(-33.33%); }
            }
            .animate-marquee-vertical {
              display: flex;
              flex-direction: column;
              animation: marqueeVertical 30s linear infinite;
            }
            .animate-marquee-vertical:hover {
              animation-play-state: paused;
            }
            .fade-overlay-top {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 80px;
              background: linear-gradient(to bottom, white, transparent);
              z-index: 10;
              pointer-events: none;
            }
            .fade-overlay-bottom {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 80px;
              background: linear-gradient(to top, white, transparent);
              z-index: 10;
              pointer-events: none;
            }
          `}
        </style>
        
        <div className="fade-overlay-top"></div>
        <div className="fade-overlay-bottom"></div>

        <div className="animate-marquee-vertical p-6 gap-4">
          {duplicatedStaff.map((person, index) => (
            <div 
              key={`${person.id}-${index}`} 
              className="flex flex-col items-center gap-3 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 group/card text-center"
            >
              <div className="w-20 h-20 shrink-0 relative">
                <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white shadow-sm ring-1 ring-slate-100">
                  {renderAvatar(person)}
                </div>
              </div>
              
              <div className="min-w-0 flex flex-col items-center">
                <h4 className="text-[15px] font-bold font-kanit leading-tight" style={{ color: bodyTextColor || '#1e293b' }}>
                  {person.name}
                </h4>
                <p className="text-[11px] text-blue-600 font-black leading-tight mt-1 uppercase tracking-wider">
                  {person.position}{person.rank ? ` ${person.rank}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 border-t border-slate-50 shrink-0">
        <a 
          href="#/staff"
          className="w-full py-4 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all border border-slate-100 shadow-sm active:scale-95 flex items-center justify-center"
        >
          ดูรายชื่อบุคลากรทั้งหมด
        </a>
      </div>
    </section>
  );
};

export default PersonnelSection;
