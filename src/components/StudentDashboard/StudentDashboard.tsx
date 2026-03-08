
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { GradeStat } from '@/types';

interface StudentDashboardProps {
  gradeStats: GradeStat[];
  primaryColor?: string;
  bodyTextColor?: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ gradeStats = [], primaryColor, bodyTextColor }) => {
  const safeGradeStats = Array.isArray(gradeStats) ? gradeStats : [];
  const data = safeGradeStats.map(gs => ({
    name: gs.grade,
    male: gs.male || 0,
    female: gs.female || 0,
    total: (gs.male || 0) + (gs.female || 0)
  }));

  const totalMale = safeGradeStats.reduce((sum, gs) => sum + (gs.male || 0), 0);
  const totalFemale = safeGradeStats.reduce((sum, gs) => sum + (gs.female || 0), 0);
  const totalStudents = totalMale + totalFemale;

  const pieData = [
    { name: 'นักเรียนชาย', value: totalMale, color: '#3b82f6' },
    { name: 'นักเรียนหญิง', value: totalFemale, color: '#f43f5e' }
  ];

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">นักเรียนชาย</p>
            <p className="text-3xl font-black text-blue-700">{totalMale.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 18a6 6 1 0 0 0 0-12 6 6 0 0 0 0 12Z"/><path d="m17 7 4.7-4.7"/><path d="M21.5 7h-5v-5"/></svg>
          </div>
        </div>
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">นักเรียนหญิง</p>
            <p className="text-3xl font-black text-rose-700">{totalFemale.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 13a6 6 1 0 0 0 0-12 6 6 0 0 0 0 12Z"/><path d="M12 13v8"/><path d="M9 18h6"/></svg>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">รวมทั้งสิ้น</p>
            <p className="text-3xl font-black text-white">{totalStudents.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.27 10.27 0 003.361-1.023.75.75 0 00.373-.647V18a6 6 0 00-5.328-5.968 7.478 7.478 0 011.83 4.341v2.755z" /></svg>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="text-sm font-bold mb-6 font-kanit uppercase tracking-wide" style={{ color: bodyTextColor || '#1e293b' }}>จำนวนนักเรียนแยกตามระดับชั้น</h4>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} 
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 600 }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }} />
                <Bar dataKey="male" name="ชาย" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="female" name="หญิง" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h4 className="text-sm font-bold mb-6 font-kanit uppercase tracking-wide" style={{ color: bodyTextColor || '#1e293b' }}>สัดส่วนนักเรียน ชาย-หญิง</h4>
          <div className="h-[250px] w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs font-bold" style={{ color: bodyTextColor || '#475569', opacity: 0.8 }}>{item.name}</span>
                </div>
                <span className="text-sm font-black" style={{ color: bodyTextColor || '#1e293b' }}>{((item.value / totalStudents) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section (Optional, but good for detail) */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">ระดับชั้น</th>
              <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">ชาย</th>
              <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">หญิง</th>
              <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">รวม</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-medium text-sm">
            {gradeStats.map((gs, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-all">
                <td className="py-4 px-6 font-bold" style={{ color: bodyTextColor || '#334155' }}>{gs.grade}</td>
                <td className="py-4 px-6 text-center text-blue-600 font-bold">{gs.male}</td>
                <td className="py-4 px-6 text-center text-rose-600 font-bold">{gs.female}</td>
                <td className="py-4 px-6 text-right font-black" style={{ color: bodyTextColor || '#0f172a' }}>{gs.male + gs.female}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 font-black text-sm border-t-2 border-slate-200">
            <tr>
              <td className="py-5 px-6" style={{ color: bodyTextColor || '#0f172a' }}>รวมทั้งสิ้น</td>
              <td className="py-5 px-6 text-center text-blue-600 text-lg">{totalMale}</td>
              <td className="py-5 px-6 text-center text-rose-600 text-lg">{totalFemale}</td>
              <td className="py-5 px-6 text-right text-xl" style={{ color: bodyTextColor || '#0f172a' }}>{totalStudents}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
