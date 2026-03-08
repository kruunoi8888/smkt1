import React, { useEffect, useState, useMemo } from 'react';
import { Personnel, SchoolConfig, MenuItem } from '@/types';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import FloatingButtons from '@/components/FloatingButtons/FloatingButtons';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Home, User, Users, Briefcase, GraduationCap } from 'lucide-react';

interface AllStaffViewProps {
  staff: Personnel[];
  config: SchoolConfig;
  menus: MenuItem[];
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Staff: React.FC<AllStaffViewProps> = ({ staff, config, menus, isLoggedIn, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter staff based on search term
  const filteredStaff = useMemo(() => {
    if (!searchTerm) return staff;
    
    const searchLower = searchTerm.toLowerCase();
    return staff.filter(person => {
      return (
        person.name.toLowerCase().includes(searchLower) ||
        person.position.toLowerCase().includes(searchLower) ||
        (person.rank && person.rank.toLowerCase().includes(searchLower))
      );
    });
  }, [staff, searchTerm]);

  // Hierarchical grouping - Simplified
  const { director, deputyDirectors, otherStaff } = useMemo(() => {
    const dir = filteredStaff.find(p => p.position.includes('ผู้อำนวยการโรงเรียน'));
    const deputies = filteredStaff.filter(p => p.position.includes('รองผู้อำนวยการ') && p.id !== dir?.id);
    const others = filteredStaff.filter(p => p.id !== dir?.id && !deputies.some(d => d.id === p.id));
    
    return { director: dir, deputyDirectors: deputies, otherStaff: others };
  }, [filteredStaff]);

  const renderAvatar = (person: Personnel) => {
    if (person.image && person.image !== "") {
      return (
        <img 
          src={person.image || null} 
          alt={person.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          referrerPolicy="no-referrer"
        />
      );
    }
    
    const isMale = person.gender === 'male';
    return (
      <div className={`w-full h-full flex items-center justify-center ${isMale ? 'bg-blue-50 text-blue-300' : 'bg-rose-50 text-rose-300'}`}>
        <User size={64} className="opacity-40" />
      </div>
    );
  };

  const StaffCard: React.FC<{ person: Personnel, isDirector?: boolean, isDeputy?: boolean }> = ({ person, isDirector = false, isDeputy = false }) => (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      className={`bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group overflow-hidden flex flex-col items-center p-8 text-center relative w-full ${isDirector ? 'max-w-md mx-auto ring-2 ring-blue-500/20' : isDeputy ? 'max-w-sm mx-auto' : 'max-w-[300px] mx-auto'}`}
    >
      {isDirector && (
        <div className="absolute top-4 right-4">
          <div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/30">
            Director
          </div>
        </div>
      )}
      
      <div className={`${isDirector ? 'w-44 h-44' : isDeputy ? 'w-36 h-36' : 'w-32 h-32'} rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 ring-1 ring-slate-100 shrink-0 transition-all duration-500 group-hover:ring-blue-500/30`}>
        {renderAvatar(person)}
      </div>
      
      <h3 className={`${isDirector ? 'text-2xl' : 'text-lg'} font-bold font-kanit text-slate-800 mb-2 group-hover:text-blue-600 transition-colors`}>
        {person.name}
      </h3>
      
      <div className="space-y-1">
        <p className="text-blue-600 font-black text-[11px] uppercase tracking-wider">
          {person.position}
        </p>
        {person.rank && (
          <p className="text-slate-400 text-[10px] font-medium italic">
            {person.rank}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div 
      className="flex flex-col min-h-screen font-kanit"
      style={{ 
        backgroundColor: config.bodyBackgroundColor || '#f8fafc',
        color: config.bodyTextColor || '#334155'
      }}
    >
      <Header config={config} menus={menus} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden p-8 md:p-16">
          {/* Hero Header */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6"
            >
              <Users size={14} />
              Our Personnel
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              ทำเนียบครูและบุคลากร
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              รายชื่อคณะผู้บริหาร ครู และบุคลากรทางการศึกษาที่ร่วมกันสร้างสรรค์อนาคตของเยาวชน
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="ค้นหาชื่อ, ตำแหน่ง, หรือฝ่ายงาน..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-8 py-5 pl-16 bg-white border border-slate-200 rounded-[2rem] text-lg font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all group-hover:shadow-xl group-hover:shadow-blue-500/5"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={24} />
            </div>
          </div>

          <div className="space-y-24">
            {/* Director Section */}
            <AnimatePresence mode="wait">
              {director && (
                <section key="director" className="space-y-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">ผู้อำนวยการโรงเรียน</h2>
                  </div>
                  <div className="flex justify-center">
                    <StaffCard person={director} isDirector={true} />
                  </div>
                </section>
              )}
            </AnimatePresence>

            {/* Deputy Directors Section */}
            <AnimatePresence mode="wait">
              {deputyDirectors.length > 0 && (
                <section key="deputies" className="space-y-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-1 bg-indigo-500 rounded-full"></div>
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">คณะรองผู้อำนวยการ</h2>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8">
                    {deputyDirectors.map(p => (
                      <div key={p.id} className="w-full sm:w-80">
                        <StaffCard person={p} isDeputy={true} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </AnimatePresence>

            {/* Other Staff Section */}
            <AnimatePresence mode="wait">
              {otherStaff.length > 0 && (
                <section key="others" className="space-y-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">คณะครูและบุคลากร</h2>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8">
                    {otherStaff.map(p => (
                      <div key={p.id} className="w-full sm:w-72">
                        <StaffCard person={p} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </AnimatePresence>
            
            {filteredStaff.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">ไม่พบข้อมูลบุคลากร</h3>
                <p className="text-slate-400 mb-8">ลองใช้คำค้นหาอื่น หรือตรวจสอบตัวสะกดอีกครั้ง</p>
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="px-8 py-3 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-slate-900 transition-all shadow-lg shadow-blue-500/20"
                >
                  ล้างการค้นหา
                </button>
              </motion.div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-32 pt-12 border-t border-slate-100 flex flex-col items-center gap-8">
            <p className="text-slate-400 text-sm font-medium">ต้องการกลับไปยังหน้าหลัก?</p>
            <a 
              href="#/" 
              className="group flex items-center gap-3 px-10 py-4 bg-white border border-slate-200 rounded-full text-slate-700 font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm hover:shadow-2xl hover:-translate-y-1"
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
              กลับหน้าแรก
            </a>
          </div>
        </div>
      </main>
      
      <FloatingButtons config={config} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Footer config={config} />
    </div>
  );
};

export default Staff;
