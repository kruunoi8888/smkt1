
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactQuill, { Quill } from 'react-quill-new';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill-new/dist/quill.snow.css';

// Register ImageResize module
Quill.register('modules/imageResize', ImageResize);

if (typeof window !== 'undefined') {
  (window as any).Quill = Quill;
}

import { SchoolConfig, NewsItem, Achievement, Personnel, Journal, MenuItem, CalendarEvent, GradeStat, SchoolSlide, AdminUser, WidgetItem, ShortcutItem } from '@/types';
import ImageCropper from '@/components/ImageCropper/ImageCropper';
import { formatThaiDate } from '@/constants';
import { getData, saveData, deleteData } from '@/services/dataService';

// Icons mapping
const Icons = {
  Dashboard: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.625c-1.035 0-1.875-.84-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>,
  Config: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.302 5.47a1.875 1.875 0 00-2.282.818l-1.32 2.284a1.875 1.875 0 00.394 2.226l.883.756c.095.081.141.175.14.29a7.315 7.315 0 000 .992c.002.115-.045.21-.14.29l-.883.756a1.875 1.875 0 00-.394 2.226l1.32 2.284a1.875 1.875 0 00-2.282-.818l1.015-.422c.116-.043.284-.032.45.083.318.22.647.41 0 .57.182.088.277.228.297.349l.178 1.071c.151.904.933 1.567 1.85 1.567h2.644c.917 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.115-.26.297-.349a7.494 7.494 0 00.986-.57c.166-.115.334-.126.45-.083l1.015.422a1.875 1.875 0 002.282-.818l1.32-2.284a1.875 1.875 0 00-.394 2.226l-.883-.756c-.095-.081-.141-.175-.14-.29a7.315 7.315 0 000-.992c-.002-.115.045-.21.14-.29l.883.756a1.875 1.875 0 00-.394 2.226l1.32-2.284a1.875 1.875 0 00-2.282-.818l-1.015.422c-.116.043-.284.032-.45-.083a7.494 7.494 0 00-.986-.57c-.182-.088-.277-.228-.297-.349l-.178-1.071c-.151-.904-.933-1.567-1.85-1.567h-2.644zM13.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" /></svg>,
  Calendar: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM15.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM15.75 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM15.75 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /><path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3a.75.75 0 011.5 0v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM3.75 9v9.75a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V9H3.75z" clipRule="evenodd" /></svg>,
  News: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M5.625 1.5c-1.035 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V4.875c0-1.035-.84-1.875-1.875-1.875H12c0 1.035-.84 1.875-1.875 1.875h-3.75c0-1.035-.84-1.875-1.875-1.875zM7.5 7.5h9a.75.75 0 010 1.5h-9a.75.75 0 010-1.5zM7.5 11.25h9a.75.75 0 010 1.5h-9a.75.75 0 010-1.5zM7.5 15h5.25a.75.75 0 010 1.5H7.5a.75.75 0 010-1.5z" /></svg>,
  Staff: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.27 10.27 0 003.361-1.023.75.75 0 00.373-.647V18a6 6 0 00-5.328-5.968 7.478 7.478 0 011.83 4.341v2.755z" /></svg>,
  Achievement: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>,
  Palette: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75-4.365-9.75-9.75-9.75zm0 18a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5zM12 7.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3 4.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3 4.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>,
  Link: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clipRule="evenodd" /></svg>,
  Settings: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  Logout: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  User: ({ className = "w-full h-full" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>
};

interface AdminPortalProps {
  config: SchoolConfig;
  setConfig: (c: SchoolConfig) => void;
  news: NewsItem[];
  setNews: (n: NewsItem[]) => void;
  staff: Personnel[];
  setStaff: (p: Personnel[]) => void;
  achievements: Achievement[];
  setAchievements: (a: Achievement[]) => void;
  journals: Journal[];
  setJournals: (j: Journal[]) => void;
  menus: MenuItem[];
  setMenus: (m: MenuItem[]) => void;
  events: CalendarEvent[];
  setEvents: (e: CalendarEvent[]) => void;
  adminUsers: AdminUser[];
  setAdminUsers: (u: AdminUser[]) => void;
  loggedInUser: AdminUser | null;
  onLogout: () => void;
}

const AdminList = ({ title, items, onDelete, onAdd, columns, onEdit, onBack }: any) => {
  const safeItems = Array.isArray(items) ? items : [];
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter items based on search term
  const filteredItems = safeItems.filter(item => {
    const searchStr = searchTerm.toLowerCase();
    return (
      (item?.title?.toLowerCase().includes(searchStr)) ||
      (item?.name?.toLowerCase().includes(searchStr)) ||
      (item?.label?.toLowerCase().includes(searchStr)) ||
      (item?.grade?.toLowerCase().includes(searchStr)) ||
      (item?.username?.toLowerCase().includes(searchStr)) ||
      (item?.position?.toLowerCase().includes(searchStr)) ||
      (item?.description?.toLowerCase().includes(searchStr))
    );
  });

  const totalPages = itemsPerPage === -1 ? 1 : Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = itemsPerPage === -1 ? filteredItems : filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 if items change significantly or itemsPerPage changes or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, searchTerm]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
          <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="ค้นหา..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button onClick={onAdd} className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">เพิ่มข้อมูลใหม่ +</button>
        </div>
      </div>
      
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">แสดง</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 font-bold outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={-1}>ทั้งหมด</option>
            </select>
            <span className="text-xs font-bold text-slate-500">รายการ</span>
          </div>
          <div className="text-xs font-bold text-slate-500">
            {searchTerm ? `พบ ${filteredItems.length} จาก ` : ''}รวมทั้งหมด {safeItems.length} รายการ
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {columns ? (
                  columns.map((col: any) => (
                    <th key={col.header} className={`p-6 text-xs font-black text-slate-400 uppercase tracking-widest ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''}`}>
                      {col.header}
                    </th>
                  ))
                ) : (
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">ข้อมูล</th>
                )}
                <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedItems.length > 0 ? paginatedItems.map((item: any, index: number) => (
                <tr key={item?.id || index} className="hover:bg-slate-50/50">
                  {columns ? (
                    columns.map((col: any, colIdx: number) => (
                      <td key={colIdx} className={`p-6 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''}`}>
                        {col.render ? col.render(item) : (
                          <div className="flex items-center gap-4">
                            {colIdx === 0 && (item?.image || item?.thumbnail) && <img src={(item.image || item.thumbnail) || null} className="w-12 h-12 rounded-lg object-cover" />}
                            <div>
                              <p className="font-bold text-slate-800 text-base">{item[col.key] || '---'}</p>
                            </div>
                          </div>
                        )}
                      </td>
                    ))
                  ) : (
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        {(item?.image || item?.thumbnail) && <img src={(item.image || item.thumbnail) || null} className="w-12 h-12 rounded-lg object-cover" />}
                        <div>
                          <p className="font-bold text-slate-800 text-base">{item?.title || item?.name || item?.label || item?.grade || item?.username || 'ไม่มีชื่อ'}</p>
                          <p className="text-xs text-slate-400">
                            {item?.date ? formatThaiDate(item.date) : 
                             item?.dateStr ? formatThaiDate(item.dateStr) : 
                             item?.position || item?.issue || item?.path || (item?.username ? 'Administrator' : '')}
                          </p>
                          {item?.isActive !== undefined && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest mt-1.5 ${item.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                              {item.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit && onEdit(item)} className="w-9 h-9 flex items-center justify-center bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-800 hover:text-white transition-colors" title="แก้ไข">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.341.886l-3.154 1.262a.5.5 0 01-.65-.65z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" /></svg>
                      </button>
                      <button onClick={() => onDelete && onDelete(item?.id)} className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="ลบ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75V4H5a2 2 0 00-2 2v.25a.75.75 0 00.75.75h12.5a.75.75 0 00.75-.75V6a2 2 0 00-2-2h-1v-.25A2.75 2.75 0 0011.25 1h-2.5zM8 4h4v-.25a1.25 1.25 0 00-1.25-1.25h-1.5A1.25 1.25 0 008 3.75V4zm1.25 4a.75.75 0 00-.75.75v6.5a.75.75 0 001.5 0v-6.5a.75.75 0 00-.75-.75zM12.75 8a.75.75 0 00-.75.75v6.5a.75.75 0 001.5 0v-6.5a.75.75 0 00-.75-.75z" clipRule="evenodd" /><path d="M4.318 8.5h11.364l-.557 8.355A2.75 2.75 0 0112.4 19.5H7.6a2.75 2.75 0 01-2.725-2.645L4.318 8.5z" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={(columns?.length || 1) + 1} className="p-8 text-center text-slate-400 font-bold text-sm">
                    {searchTerm ? 'ไม่พบข้อมูลที่ค้นหา' : 'ไม่มีข้อมูล'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500">
              หน้า {currentPage} จาก {totalPages}
            </span>
            <div className="flex gap-1">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white border border-blue-600 shadow-sm' 
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SaveButton = ({ onClick, isSaving, label = "บันทึกข้อมูลทั้งหมด", className = "" }: { onClick: () => void, isSaving: boolean, label?: string, className?: string }) => (
  <button 
    onClick={onClick} 
    disabled={isSaving}
    className={`relative overflow-hidden px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group ${className}`}
  >
    <span className={`flex items-center justify-center gap-3 ${isSaving ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
      {label}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
    </span>
    {isSaving && (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    )}
  </button>
);

const AdminPortal: React.FC<AdminPortalProps> = ({
  config, setConfig, news, setNews, staff, setStaff, achievements, setAchievements, journals, setJournals, menus, setMenus, events, setEvents, adminUsers, setAdminUsers, loggedInUser, onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'config' | 'news' | 'staff' | 'menus' | 'calendar' | 'theme' | 'stats' | 'slides' | 'achievements' | 'journals' | 'admins' | 'widgets' | 'heroShortcuts'>('dashboard');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; type: string; id: string; title: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Image Cropper State
  const [cropperOpen, setCropperOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<'logo' | 'banner' | 'admin' | 'slide' | 'news' | 'achievement' | 'journal' | 'personnel' | 'menu' | 'heroShortcut'>('logo');
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);
  const [tempAdmin, setTempAdmin] = useState<AdminUser | null>(null);
  const [editingSlide, setEditingSlide] = useState<SchoolSlide | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [editingJournal, setEditingJournal] = useState<Journal | null>(null);
  const [editingPersonnel, setEditingPersonnel] = useState<Personnel | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [editingGradeStat, setEditingGradeStat] = useState<GradeStat | null>(null);
  const [editingWidget, setEditingWidget] = useState<WidgetItem | null>(null);
  const [editingHeroShortcut, setEditingHeroShortcut] = useState<ShortcutItem | null>(null);
  
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'clean']
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  };
  
  // Buffered State for Config Tab
  const [bufferedConfig, setBufferedConfig] = useState<SchoolConfig>(config);
  const [bufferedAdminUsers, setBufferedAdminUsers] = useState<AdminUser[]>(adminUsers);
  const [bufferedMenus, setBufferedMenus] = useState<MenuItem[]>(menus);

  useEffect(() => {
    setBufferedMenus(menus);
  }, [menus]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const adminFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);
  const slideFileInputRef = useRef<HTMLInputElement>(null);
  const newsFileInputRef = useRef<HTMLInputElement>(null);
  const newsAdditionalImagesInputRef = useRef<HTMLInputElement>(null);
  const achievementFileInputRef = useRef<HTMLInputElement>(null);
  const achievementAdditionalImagesInputRef = useRef<HTMLInputElement>(null);
  const journalFileInputRef = useRef<HTMLInputElement>(null);
  const personnelFileInputRef = useRef<HTMLInputElement>(null);
  const menuFileInputRef = useRef<HTMLInputElement>(null);

  const [securityPrompt, setSecurityPrompt] = useState<{ isOpen: boolean, type: 'edit' | 'delete', targetId: string | null, inputPassword: string }>({ isOpen: false, type: 'edit', targetId: null, inputPassword: '' });

  // Helper to normalize date string from browser (handle BE years and manual DD/MM/YYYY)
  const normalizeDate = (dateStr: string) => {
    if (!dateStr) return dateStr;
    
    // Handle YYYY-MM-DD (standard from date picker)
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3 && parts[0].length === 4) {
        let year = parseInt(parts[0]);
        // If year is in BE range (e.g. 2569), convert to AD (2026)
        if (year > 2400) {
          year -= 543;
          return `${year}-${parts[1]}-${parts[2]}`;
        }
      }
      return dateStr;
    }
    
    // Handle DD/MM/YYYY (manual typing)
    if (dateStr.includes('/')) {
      const parts = dateStr.split('/');
      if (parts.length === 3 && parts[2].length === 4) {
        let day = parts[0].padStart(2, '0');
        let month = parts[1].padStart(2, '0');
        let year = parseInt(parts[2]);
        
        if (year > 2400) {
          year -= 543;
        } else if (year < 100) {
          // Handle 2-digit year if needed (e.g. 26 -> 2026)
          year += 2000;
        }
        
        // Return in YYYY-MM-DD format for consistency with state and calendar
        return `${year}-${month}-${day}`;
      }
    }
    
    return dateStr;
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      // Parallelize config, menus, and admin users updates
      const promises = [
        saveData('config', { ...bufferedConfig, id: 1 })
      ];

      // Save menus
      for (const menu of bufferedMenus) {
        promises.push(saveData('menus', menu));
      }
      
      // Save admin users
      for (const user of bufferedAdminUsers) {
        promises.push(saveData('admin_users', user));
      }

      await Promise.all(promises);

      setConfig(bufferedConfig);
      setAdminUsers(bufferedAdminUsers);
      setMenus(bufferedMenus);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error("Failed to save config:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล\n\nรายละเอียด: " + (error?.message || error?.details || JSON.stringify(error)));
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdminAction = async (type: 'edit' | 'delete', id: string) => {
    const user = bufferedAdminUsers.find(u => u.id === id);
    if (user?.isDefault) {
      setSecurityPrompt({ isOpen: true, type, targetId: id, inputPassword: '' });
    } else {
      if (type === 'edit') {
        setTempAdmin(user || null);
        setEditingAdminId(id);
      } else {
        if (confirm('คุณต้องการลบผู้ดูแลระบบนี้ใช่หรือไม่?')) {
          try {
            await deleteData('admin_users', id);
            setBufferedAdminUsers(bufferedAdminUsers.filter(u => u.id !== id));
            setAdminUsers(adminUsers.filter(u => u.id !== id));
          } catch (error) {
            console.error("Failed to delete admin:", error);
          }
        }
      }
    }
  };

  const handleSecurityCheck = () => {
    if (securityPrompt.inputPassword === 'admin8888') {
      if (securityPrompt.type === 'edit' && securityPrompt.targetId) {
        const user = bufferedAdminUsers.find(u => u.id === securityPrompt.targetId);
        setTempAdmin(user || null);
        setEditingAdminId(securityPrompt.targetId);
      } else if (securityPrompt.type === 'delete' && securityPrompt.targetId) {
        setBufferedAdminUsers(bufferedAdminUsers.filter(u => u.id !== securityPrompt.targetId));
      }
      setSecurityPrompt({ isOpen: false, type: 'edit', targetId: null, inputPassword: '' });
    } else {
      alert('รหัสผ่านไม่ถูกต้อง');
    }
  };

  const processDelete = async () => {
    if (!deleteConfirm) return;
    const { type, id } = deleteConfirm;
    
    try {
      if (type === 'news') {
        await deleteData('news', id);
        setNews(news.filter(n => n.id !== id));
      } else if (type === 'achievements') {
        await deleteData('achievements', id);
        setAchievements(achievements.filter(a => a.id !== id));
      } else if (type === 'journals') {
        await deleteData('journals', id);
        setJournals(journals.filter(j => j.id !== id));
      } else if (type === 'personnel') {
        const deletedPerson = staff.find(s => s.id === id);
        await deleteData('personnel', id);
        setStaff(staff.filter(s => s.id !== id));
        if (deletedPerson?.position === "ผู้อำนวยการโรงเรียน") {
          const newConfig = {
            ...config,
            director: { ...config.director, name: "ยังไม่ได้ระบุ", image: "", position: "ผู้อำนวยการโรงเรียน" }
          };
          await saveData('config', newConfig);
          setConfig(newConfig);
        }
      } else if (type === 'events') {
        await deleteData('events', id);
        setEvents(events.filter(e => e.id !== id));
      } else if (type === 'menu') {
        setBufferedMenus(bufferedMenus.filter(m => m.id !== id));
      } else if (type === 'slide') {
        const newConfig = {
          ...bufferedConfig,
          slides: (bufferedConfig.slides || []).filter((s: any) => s.id !== id)
        };
        setBufferedConfig(newConfig);
        setConfig(newConfig);
        await saveData('config', { ...newConfig, id: 1 });
      } else if (type === 'grade_stat') {
        const newGradeStats = bufferedConfig.stats.gradeStats.filter(g => g.id !== id);
        const totalMale = newGradeStats.reduce((sum, g) => sum + g.male, 0);
        const totalFemale = newGradeStats.reduce((sum, g) => sum + g.female, 0);
        setBufferedConfig({
          ...bufferedConfig,
          stats: {
            ...bufferedConfig.stats,
            gradeStats: newGradeStats,
            maleStudents: totalMale,
            femaleStudents: totalFemale,
            totalStudents: totalMale + totalFemale
          }
        });
      }
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
      alert('เกิดข้อผิดพลาดในการลบข้อมูล');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'logo' | 'banner' | 'admin' | 'slide' | 'news' | 'achievement' | 'journal' | 'personnel' | 'menu', id?: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageToCrop(reader.result as string);
        setCropperOpen(true);
        setCropTarget(target);
        if (id) {
           // No op
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAdditionalImagesUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'news' | 'achievement' = 'news') => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: string[] = [];
      const files = Array.from(e.target.files) as File[];
      let loadedCount = 0;

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
          }
          loadedCount++;
          if (loadedCount === files.length) {
            if (target === 'news' && editingNews) {
              setEditingNews({
                ...editingNews,
                images: [...(editingNews.images || []), ...newImages]
              });
              if (newsAdditionalImagesInputRef.current) {
                newsAdditionalImagesInputRef.current.value = '';
              }
            } else if (target === 'achievement' && editingAchievement) {
              setEditingAchievement({
                ...editingAchievement,
                images: [...(editingAchievement.images || []), ...newImages]
              });
              if (achievementAdditionalImagesInputRef.current) {
                achievementAdditionalImagesInputRef.current.value = '';
              }
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onCropComplete = (croppedImage: string) => {
    if (cropTarget === 'logo') {
      setBufferedConfig({ ...bufferedConfig, logo: croppedImage });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else if (cropTarget === 'banner') {
      setBufferedConfig({ ...bufferedConfig, bannerImage: croppedImage });
      if (bannerFileInputRef.current) bannerFileInputRef.current.value = '';
    } else if (cropTarget === 'admin' && tempAdmin) {
      setTempAdmin({ ...tempAdmin, image: croppedImage });
      if (adminFileInputRef.current) adminFileInputRef.current.value = '';
    } else if (cropTarget === 'slide' && editingSlide) {
      setEditingSlide({ ...editingSlide, image: croppedImage });
      if (slideFileInputRef.current) slideFileInputRef.current.value = '';
    } else if (cropTarget === 'news' && editingNews) {
      setEditingNews({ ...editingNews, image: croppedImage });
      if (newsFileInputRef.current) newsFileInputRef.current.value = '';
    } else if (cropTarget === 'achievement' && editingAchievement) {
      setEditingAchievement({ ...editingAchievement, image: croppedImage });
      if (achievementFileInputRef.current) achievementFileInputRef.current.value = '';
    } else if (cropTarget === 'journal' && editingJournal) {
      setEditingJournal({ ...editingJournal, thumbnail: croppedImage });
      if (journalFileInputRef.current) journalFileInputRef.current.value = '';
    } else if (cropTarget === 'personnel' && editingPersonnel) {
      setEditingPersonnel({ ...editingPersonnel, image: croppedImage });
      if (personnelFileInputRef.current) personnelFileInputRef.current.value = '';
    } else if (cropTarget === 'menu' && editingMenu) {
      setEditingMenu({ ...editingMenu, image: croppedImage });
      if (menuFileInputRef.current) menuFileInputRef.current.value = '';
    }
    setCropperOpen(false);
    setImageToCrop(null);
  };

  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/';
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-kanit overflow-hidden">
      <AnimatePresence>
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
          >
            <div className="bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.4)] border border-emerald-400/30 flex items-center gap-4 backdrop-blur-md">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg leading-none">บันทึกสำเร็จ!</span>
                <span className="text-emerald-50 text-xs font-bold mt-1">ข้อมูลของคุณถูกอัปเดตเรียบร้อยแล้ว</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {cropperOpen && imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          aspectRatio={cropTarget === 'banner' ? 1920 / 600 : cropTarget === 'slide' ? 16 / 9 : (cropTarget === 'logo' || cropTarget === 'admin' || cropTarget === 'personnel') ? 1 : cropTarget === 'journal' ? 210 / 297 : undefined}
          onCropComplete={onCropComplete}
          onCancel={() => {
            setCropperOpen(false);
            setImageToCrop(null);
            setEditingAdminId(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            if (bannerFileInputRef.current) bannerFileInputRef.current.value = '';
            if (slideFileInputRef.current) slideFileInputRef.current.value = '';
            if (newsFileInputRef.current) newsFileInputRef.current.value = '';
            if (achievementFileInputRef.current) achievementFileInputRef.current.value = '';
            if (journalFileInputRef.current) journalFileInputRef.current.value = '';
            if (personnelFileInputRef.current) personnelFileInputRef.current.value = '';
          }}
        />
      )}

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-72 text-white flex flex-col flex-shrink-0 shadow-2xl h-screen transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `} style={{ backgroundColor: config.primaryColor || '#0f172a' }}>
        <div className="p-6 border-b border-white/5 flex flex-col items-center gap-2 relative">
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-base font-black tracking-tight uppercase">Admin Panel</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">Management Portal</p>
          </div>
        </div>
        
        <nav className="flex-grow overflow-y-auto scrollbar-none p-4 space-y-0.5">
          <NavItem icon={<Icons.Dashboard />} label="แผงควบคุม" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} />
          <div className="pt-2 pb-1 text-[10px] text-slate-600 font-black uppercase tracking-widest ml-4 opacity-60">ข้อมูลโรงเรียน</div>
          <NavItem icon={<Icons.Config />} label="ตั้งค่าข้อมูลโรงเรียน" active={activeTab === 'config'} onClick={() => { setActiveTab('config'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={<Icons.Palette />} label="ปรับแต่งธีม & วิดีโอ" active={activeTab === 'theme'} onClick={() => { setActiveTab('theme'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={<Icons.Palette />} label="สไลด์หน้าแรก" active={activeTab === 'slides'} onClick={() => { setActiveTab('slides'); setIsMobileMenuOpen(false); }} />
          <div className="pt-2 pb-1 text-[10px] text-slate-600 font-black uppercase tracking-widest ml-4 opacity-60">เนื้อหา & กิจกรรม</div>
          <NavItem icon={<Icons.News />} label="ข่าวและกิจกรรม" active={activeTab === 'news'} onClick={() => { setActiveTab('news'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={<Icons.Achievement />} label="รางวัล & ผลงาน" active={activeTab === 'achievements'} onClick={() => { setActiveTab('achievements'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={<Icons.News />} label="วารสารโรงเรียน" active={activeTab === 'journals'} onClick={() => { setActiveTab('journals'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={<Icons.Calendar />} label="ปฏิทินกิจกรรม" active={activeTab === 'calendar'} onClick={() => { setActiveTab('calendar'); setIsMobileMenuOpen(false); }} />
          <div className="pt-2 pb-1 text-[10px] text-slate-600 font-black uppercase tracking-widest ml-4 opacity-60">บุคลากร & นักเรียน</div>
          <NavItem icon={<Icons.Staff />} label="ทำเนียบบุคลากร" active={activeTab === 'staff'} onClick={() => { setActiveTab('staff'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={<Icons.Dashboard />} label="สถิตินักเรียน" active={activeTab === 'stats'} onClick={() => { setActiveTab('stats'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={<Icons.Link />} label="จัดการเมนู" active={activeTab === 'menus'} onClick={() => { setActiveTab('menus'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={<Icons.Achievement />} label="จัดการเมนูลัด" active={activeTab === 'heroShortcuts'} onClick={() => { setActiveTab('heroShortcuts'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={<Icons.Dashboard />} label="เมนูวิดเจ็ต" active={activeTab === 'widgets'} onClick={() => { setActiveTab('widgets'); setIsMobileMenuOpen(false); }} />
          <div className="pt-2 pb-1 text-[10px] text-slate-600 font-black uppercase tracking-widest ml-4 opacity-60">ระบบ</div>
          <NavItem icon={<Icons.Settings />} label="จัดการผู้ดูแลระบบ" active={activeTab === 'admins'} onClick={() => { setActiveTab('admins'); setIsMobileMenuOpen(false); }} />
        </nav>

      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden w-full relative">
        <header className="h-16 lg:h-20 bg-white border-b border-slate-100 px-4 lg:px-10 flex items-center justify-between shrink-0 shadow-sm z-50">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="flex flex-col">
              <h2 className="text-lg lg:text-2xl font-black text-slate-900 uppercase tracking-tight truncate max-w-[150px] sm:max-w-none">
                {activeTab === 'dashboard' ? "แผงควบคุม" : 
                 activeTab === 'config' ? "ตั้งค่าโรงเรียน" : 
                 activeTab === 'theme' ? "ธีมและสื่อ" : 
                 activeTab === 'news' ? "ข่าวสาร" : 
                 activeTab === 'widgets' ? "เมนูวิดเจ็ต" : 
                 activeTab === 'heroShortcuts' ? "จัดการเมนูลัด" : "จัดการข้อมูล"}
              </h2>
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                 <span>Main</span>
                 <span className="text-slate-300">/</span>
                 <span className="text-blue-500">{activeTab}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
             <div className="flex items-center gap-2 sm:gap-4 border-r border-slate-100 pr-2 sm:pr-6 mr-1 sm:mr-2">
                <div className="text-right hidden sm:block">
                   <p className="text-base font-black text-slate-800 leading-none">{loggedInUser?.name || 'ผู้ดูแลระบบ'}</p>
                   <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest mt-1.5 flex items-center justify-end gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      Online
                   </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 shadow-inner flex items-center justify-center">
                   {loggedInUser?.image ? (
                     <img src={loggedInUser.image || null} alt="Admin" className="w-full h-full object-cover" />
                   ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>
                   )}
                </div>
             </div>

             <div className="flex items-center gap-2">
                <button 
                  onClick={onLogout}
                  title="Logout" 
                  className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white transition-all p-2.5 items-center justify-center shadow-sm group"
                >
                   <div className="w-full h-full transition-transform duration-300 group-hover:scale-110">
                     <Icons.Logout />
                   </div>
                </button>
                <a 
                  href="#/" 
                  onClick={navigateToHome}
                  className="ml-0 sm:ml-2 px-3 sm:px-6 py-2 sm:py-2.5 text-white rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
                  style={{ backgroundColor: config.primaryColor || '#0f172a' }}
                >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.625c-1.035 0-1.875-.84-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>
                   <span className="hidden sm:inline">ไปหน้าเว็บไซต์หลัก</span>
                </a>
             </div>
          </div>
        </header>

        <div className="flex-grow p-4 lg:p-6 overflow-y-auto bg-slate-50/50">
          <div className="max-w-5xl mx-auto space-y-4 lg:space-y-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                      ระบบจัดการข้อมูลโรงเรียน
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight font-kanit">
                      ยินดีต้อนรับ, <span className="text-blue-600">{loggedInUser?.name || 'ผู้ดูแลระบบ'}</span>
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">
                      ภาพรวมข้อมูลและสถิติสำคัญของโรงเรียน {bufferedConfig.schoolName}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                      <Icons.Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">วันนี้</p>
                      <p className="text-sm font-black text-slate-700 tracking-tight">{new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                  <DashboardStatCard 
                    label="ข่าวสารทั้งหมด" 
                    value={news.length} 
                    icon={<Icons.News />} 
                    color="blue" 
                    onClick={() => setActiveTab('news')}
                  />
                  <DashboardStatCard 
                    label="บุคลากรทั้งหมด" 
                    value={staff.length} 
                    icon={<Icons.Staff />} 
                    color="rose" 
                    onClick={() => setActiveTab('staff')}
                  />
                  <DashboardStatCard 
                    label="รางวัล & ผลงาน" 
                    value={achievements.length} 
                    icon={<Icons.Achievement />} 
                    color="amber" 
                    onClick={() => setActiveTab('achievements')}
                  />
                  <DashboardStatCard 
                    label="วารสารทั้งหมด" 
                    value={journals.length} 
                    icon={<Icons.News />} 
                    color="indigo" 
                    onClick={() => setActiveTab('journals')}
                  />
                </div>

                {/* Main Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Shortcuts Section */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                      <h3 className="text-lg font-black text-slate-800 font-kanit uppercase tracking-tight flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                        เมนูจัดการระบบ
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <ShortcutCard label="ตั้งค่าโรงเรียน" icon={<Icons.Config />} color="bg-blue-50 text-blue-600" hoverColor="hover:bg-blue-600" onClick={() => setActiveTab('config')} />
                      <ShortcutCard label="ธีม & วิดีโอ" icon={<Icons.Palette />} color="bg-purple-50 text-purple-600" hoverColor="hover:bg-purple-600" onClick={() => setActiveTab('theme')} />
                      <ShortcutCard label="สไลด์หน้าแรก" icon={<Icons.Palette />} color="bg-emerald-50 text-emerald-600" hoverColor="hover:bg-emerald-600" onClick={() => setActiveTab('slides')} />
                      <ShortcutCard label="ข่าวและกิจกรรม" icon={<Icons.News />} color="bg-amber-50 text-amber-600" hoverColor="hover:bg-amber-600" onClick={() => setActiveTab('news')} />
                      <ShortcutCard label="รางวัล & ผลงาน" icon={<Icons.Achievement />} color="bg-yellow-50 text-yellow-600" hoverColor="hover:bg-yellow-600" onClick={() => setActiveTab('achievements')} />
                      <ShortcutCard label="วารสารโรงเรียน" icon={<Icons.News />} color="bg-rose-50 text-rose-600" hoverColor="hover:bg-rose-600" onClick={() => setActiveTab('journals')} />
                      <ShortcutCard label="ปฏิทินกิจกรรม" icon={<Icons.Calendar />} color="bg-red-50 text-red-600" hoverColor="hover:bg-red-600" onClick={() => setActiveTab('calendar')} />
                      <ShortcutCard label="ทำเนียบบุคลากร" icon={<Icons.Staff />} color="bg-sky-50 text-sky-600" hoverColor="hover:bg-sky-600" onClick={() => setActiveTab('staff')} />
                      <ShortcutCard label="สถิตินักเรียน" icon={<Icons.Dashboard />} color="bg-slate-100 text-slate-600" hoverColor="hover:bg-slate-800" onClick={() => setActiveTab('stats')} />
                      <ShortcutCard label="จัดการเมนู" icon={<Icons.Link />} color="bg-teal-50 text-teal-600" hoverColor="hover:bg-teal-600" onClick={() => setActiveTab('menus')} />
                      <ShortcutCard label="จัดการเมนูลัด" icon={<Icons.Achievement />} color="bg-orange-50 text-orange-600" hoverColor="hover:bg-orange-600" onClick={() => setActiveTab('heroShortcuts')} />
                      <ShortcutCard label="เมนูวิดเจ็ต" icon={<Icons.Dashboard />} color="bg-fuchsia-50 text-fuchsia-600" hoverColor="hover:bg-fuchsia-600" onClick={() => setActiveTab('widgets')} />
                      <ShortcutCard label="จัดการแอดมิน" icon={<Icons.Settings />} color="bg-indigo-50 text-indigo-600" hoverColor="hover:bg-indigo-600" onClick={() => setActiveTab('admins')} />
                    </div>
                  </div>

                  {/* Quick Info / Recent Activity Sidebar */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                      <h3 className="text-lg font-black text-slate-800 font-kanit uppercase tracking-tight flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-rose-600 rounded-full"></span>
                        สถานะระบบ
                      </h3>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">ความจุข้อมูล</span>
                          <span className="text-xs font-black text-slate-800">ใช้งานปกติ</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[15%] rounded-full"></div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-50 space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ข้อมูลผู้ดูแล</h4>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 flex items-center justify-center text-indigo-600">
                            {loggedInUser?.image ? (
                              <img src={loggedInUser.image || null} alt="Admin" className="w-full h-full object-cover" />
                            ) : (
                              <Icons.User className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800 tracking-tight">{loggedInUser?.name || 'ผู้ดูแลระบบ'}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{loggedInUser?.username}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-50 space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ข้อมูลระบบ</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-500 font-bold">เวอร์ชันระบบ</span>
                            <span className="text-slate-800 font-black">v2.5.0-stable</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-500 font-bold">สถานะเซิร์ฟเวอร์</span>
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span className="text-emerald-600 font-black">ออนไลน์</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-500 font-bold">เข้าสู่ระบบล่าสุด</span>
                            <span className="text-slate-800 font-black">{new Date().toLocaleDateString('th-TH')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-50">
                         <button 
                          onClick={onLogout}
                          className="w-full py-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-2"
                         >
                           <Icons.Logout className="w-4 h-4" />
                           ออกจากระบบ
                         </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {activeTab === 'config' && (
              <div className="space-y-8 pb-24">
                <AdminCard title="ตั้งค่าข้อมูลติดต่อโรงเรียน" onBack={() => setActiveTab('dashboard')} primaryColor={config.primaryColor}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors group cursor-pointer relative overflow-hidden" onClick={() => fileInputRef.current?.click()}>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'logo')}
                      />
                      {bufferedConfig.logo ? (
                        <div className="relative w-32 h-32 mb-4 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAYJsIwgIgDGwECugreqhSKDgAAAABJRU5ErkJggg==')]">
                          <img src={bufferedConfig.logo || null} alt="School Logo" className="w-full h-full object-contain drop-shadow-xl" />
                          <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-xs font-bold uppercase tracking-widest">เปลี่ยนรูป</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" /></svg>
                        </div>
                      )}
                      <p className="text-sm font-bold text-slate-600">อัปโหลดโลโก้โรงเรียน</p>
                      <p className="text-xs text-slate-400 mt-1">คลิกเพื่อเลือกรูปภาพ (แนะนำไฟล์ PNG พื้นหลังใส)</p>
                    </div>

                    <InputGroup label="ชื่อโรงเรียน" value={bufferedConfig.name} onChange={v => setBufferedConfig({...bufferedConfig, name: v})} />
                    <InputGroup label="สังกัด" value={bufferedConfig.area} onChange={v => setBufferedConfig({...bufferedConfig, area: v})} />
                    <InputGroup label="เบอร์โทรศัพท์" value={bufferedConfig.phone} onChange={v => setBufferedConfig({...bufferedConfig, phone: v})} />
                    <InputGroup label="อีเมล" value={bufferedConfig.email} onChange={v => setBufferedConfig({...bufferedConfig, email: v})} />
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      ข้อมูลผู้บริหาร (ผู้อำนวยการ)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">เลือกจากบุคลากร</label>
                          <select 
                            value={bufferedConfig.director?.id || ''} 
                            onChange={e => {
                              const selected = staff.find(s => s.id === e.target.value);
                              if (selected) {
                                setBufferedConfig({
                                  ...bufferedConfig,
                                  director: {
                                    ...selected,
                                    id: bufferedConfig.director?.id || 'dir1' // Keep the director slot ID
                                  }
                                });
                              }
                            }}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                          >
                            <option value="">-- เลือกบุคลากร --</option>
                            {staff.map(s => (
                              <option key={s.id} value={s.id}>{s.name} ({s.position})</option>
                            ))}
                          </select>
                        </div>
                        <InputGroup label="ชื่อผู้อำนวยการ" value={bufferedConfig.director?.name || ''} onChange={v => setBufferedConfig({...bufferedConfig, director: {...(bufferedConfig.director || {id: 'dir1', name: '', position: '', image: '', department: '', gender: 'male'}), name: v}})} />
                        <InputGroup label="ตำแหน่ง" value={bufferedConfig.director?.position || ''} onChange={v => setBufferedConfig({...bufferedConfig, director: {...(bufferedConfig.director || {id: 'dir1', name: '', position: '', image: '', department: '', gender: 'male'}), position: v}})} />
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        {bufferedConfig.director?.image ? (
                          <img src={bufferedConfig.director.image || null} className="w-32 h-32 rounded-full object-cover shadow-md mb-4" />
                        ) : (
                          <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 mb-4">
                            👤
                          </div>
                        )}
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">รูปภาพผู้อำนวยการ</p>
                        <p className="text-[10px] text-slate-400 mt-1">(แก้ไขได้จากเมนูทำเนียบบุคลากร)</p>
                      </div>
                    </div>
                  </div>
                  
                  <InputGroup label="ที่อยู่โรงเรียน" isTextArea value={bufferedConfig.address} onChange={v => setBufferedConfig({...bufferedConfig, address: v})} />

                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      Social Media & Links
                    </h4>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="w-10 h-10 bg-[#1877F2] text-white rounded-lg flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          </div>
                          <div className="flex-grow sm:hidden">
                            <InputGroup label="Facebook Page URL" value={bufferedConfig.socialMedia?.facebook?.url || ''} onChange={v => setBufferedConfig({...bufferedConfig, socialMedia: {...bufferedConfig.socialMedia, facebook: {...bufferedConfig.socialMedia?.facebook, url: v, visible: bufferedConfig.socialMedia?.facebook?.visible ?? true}}})} />
                          </div>
                        </div>
                        <div className="hidden sm:block flex-grow">
                          <InputGroup label="Facebook Page URL" value={bufferedConfig.socialMedia?.facebook?.url || ''} onChange={v => setBufferedConfig({...bufferedConfig, socialMedia: {...bufferedConfig.socialMedia, facebook: {...bufferedConfig.socialMedia?.facebook, url: v, visible: bufferedConfig.socialMedia?.facebook?.visible ?? true}}})} />
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-200/60">
                          <span className="text-[10px] font-bold uppercase text-slate-400">{bufferedConfig.socialMedia?.facebook?.visible ? 'แสดง' : 'ซ่อน'}</span>
                          <button 
                            onClick={() => setBufferedConfig({...bufferedConfig, socialMedia: {...bufferedConfig.socialMedia, facebook: {...bufferedConfig.socialMedia?.facebook, visible: !bufferedConfig.socialMedia?.facebook?.visible, url: bufferedConfig.socialMedia?.facebook?.url || ''}}})}
                            className={`w-12 h-7 rounded-full p-1 transition-colors ${bufferedConfig.socialMedia?.facebook?.visible ? 'bg-emerald-500' : 'bg-slate-200'}`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${bufferedConfig.socialMedia?.facebook?.visible ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="w-10 h-10 bg-[#06C755] text-white rounded-lg flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.15 8.52a10.8 10.8 0 0 0-18.3 0 10.8 10.8 0 0 0 18.3 0zm-8.8 11.23c-5.8 0-10.2-3.88-10.2-9.35s4.4-9.35 10.2-9.35 10.2 3.88 10.2 9.35-4.4 9.35-10.2 9.35z"/></svg>
                          </div>
                          <div className="flex-grow sm:hidden">
                            <InputGroup label="Line Official ID / URL" value={bufferedConfig.socialMedia?.line?.url || ''} onChange={v => setBufferedConfig({...bufferedConfig, socialMedia: {...bufferedConfig.socialMedia, line: {...bufferedConfig.socialMedia?.line, url: v, visible: bufferedConfig.socialMedia?.line?.visible ?? true}}})} />
                          </div>
                        </div>
                        <div className="hidden sm:block flex-grow">
                          <InputGroup label="Line Official ID / URL" value={bufferedConfig.socialMedia?.line?.url || ''} onChange={v => setBufferedConfig({...bufferedConfig, socialMedia: {...bufferedConfig.socialMedia, line: {...bufferedConfig.socialMedia?.line, url: v, visible: bufferedConfig.socialMedia?.line?.visible ?? true}}})} />
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-200/60">
                          <span className="text-[10px] font-bold uppercase text-slate-400">{bufferedConfig.socialMedia?.line?.visible ? 'แสดง' : 'ซ่อน'}</span>
                          <button 
                            onClick={() => setBufferedConfig({...bufferedConfig, socialMedia: {...bufferedConfig.socialMedia, line: {...bufferedConfig.socialMedia?.line, visible: !bufferedConfig.socialMedia?.line?.visible, url: bufferedConfig.socialMedia?.line?.url || ''}}})}
                            className={`w-12 h-7 rounded-full p-1 transition-colors ${bufferedConfig.socialMedia?.line?.visible ? 'bg-emerald-500' : 'bg-slate-200'}`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${bufferedConfig.socialMedia?.line?.visible ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="w-10 h-10 bg-[#FF0000] text-white rounded-lg flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                          </div>
                          <div className="flex-grow sm:hidden">
                            <InputGroup label="YouTube Channel URL" value={bufferedConfig.socialMedia?.youtube?.url || ''} onChange={v => setBufferedConfig({...bufferedConfig, socialMedia: {...bufferedConfig.socialMedia, youtube: {...bufferedConfig.socialMedia?.youtube, url: v, visible: bufferedConfig.socialMedia?.youtube?.visible ?? true}}})} />
                          </div>
                        </div>
                        <div className="hidden sm:block flex-grow">
                          <InputGroup label="YouTube Channel URL" value={bufferedConfig.socialMedia?.youtube?.url || ''} onChange={v => setBufferedConfig({...bufferedConfig, socialMedia: {...bufferedConfig.socialMedia, youtube: {...bufferedConfig.socialMedia?.youtube, url: v, visible: bufferedConfig.socialMedia?.youtube?.visible ?? true}}})} />
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-200/60">
                          <span className="text-[10px] font-bold uppercase text-slate-400">{bufferedConfig.socialMedia?.youtube?.visible ? 'แสดง' : 'ซ่อน'}</span>
                          <button 
                            onClick={() => setBufferedConfig({...bufferedConfig, socialMedia: {...bufferedConfig.socialMedia, youtube: {...bufferedConfig.socialMedia?.youtube, visible: !bufferedConfig.socialMedia?.youtube?.visible, url: bufferedConfig.socialMedia?.youtube?.url || ''}}})}
                            className={`w-12 h-7 rounded-full p-1 transition-colors ${bufferedConfig.socialMedia?.youtube?.visible ? 'bg-emerald-500' : 'bg-slate-200'}`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${bufferedConfig.socialMedia?.youtube?.visible ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                      Visitor Statistics (จำนวนผู้เข้าชม)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <InputGroup 
                        label="วันนี้" 
                        type="number"
                        value={bufferedConfig.visitorStats?.today?.toString() || '0'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, visitorStats: {...(bufferedConfig.visitorStats || {today: 0, thisMonth: 0, total: 0}), today: parseInt(v) || 0}})} 
                      />
                      <InputGroup 
                        label="เดือนนี้" 
                        type="number"
                        value={bufferedConfig.visitorStats?.thisMonth?.toString() || '0'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, visitorStats: {...(bufferedConfig.visitorStats || {today: 0, thisMonth: 0, total: 0}), thisMonth: parseInt(v) || 0}})} 
                      />
                      <InputGroup 
                        label="ทั้งหมด" 
                        type="number"
                        value={bufferedConfig.visitorStats?.total?.toString() || '0'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, visitorStats: {...(bufferedConfig.visitorStats || {today: 0, thisMonth: 0, total: 0}), total: parseInt(v) || 0}})} 
                      />
                    </div>
                  </div>
                </AdminCard>

                <div className="fixed bottom-0 left-0 right-0 lg:left-72 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 flex justify-center z-40 animate-in slide-in-from-bottom-10">
                  <SaveButton onClick={handleSave} isSaving={isSaving} />
                </div>
              </div>
            )}

            {activeTab === 'admins' && (
              <div className="space-y-8 pb-24">
                <AdminCard title="จัดการผู้ดูแลระบบ" onBack={() => setActiveTab('dashboard')} primaryColor={config.primaryColor}>
                  <div className="flex justify-end mb-6">
                    <button 
                      onClick={() => {
                        const newId = 'new_' + Date.now().toString();
                        setTempAdmin({ id: newId, username: '', password: '', name: '', image: '' });
                        setEditingAdminId(newId);
                      }}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                    >
                      เพิ่มผู้ดูแลระบบ +
                    </button>
                  </div>
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 border-b border-slate-200">
                        <tr>
                          <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">ผู้ใช้งาน</th>
                          <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">จัดการ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bufferedAdminUsers.map(user => (
                          <tr key={user.id} className="hover:bg-white transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-4">
                                {user.image ? (
                                  <img src={user.image} className="w-10 h-10 rounded-full object-cover shadow-sm" alt={user.name} />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center font-bold">
                                    {user.username.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <p className="font-bold text-slate-800 text-sm">{user.name || user.username}</p>
                                  <p className="text-xs text-slate-400">Username: {user.username}</p>
                                  {user.phone && <p className="text-xs text-slate-400">Tel: {user.phone}</p>}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => handleAdminAction('edit', user.id)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-800 hover:text-white transition-colors shadow-sm" title="แก้ไข">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.341.886l-3.154 1.262a.5.5 0 01-.65-.65z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" /></svg>
                                </button>
                                <button onClick={() => handleAdminAction('delete', user.id)} className="w-8 h-8 flex items-center justify-center bg-white border border-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-sm" title="ลบ">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75V4H5a2 2 0 00-2 2v.25a.75.75 0 00.75.75h12.5a.75.75 0 00.75-.75V6a2 2 0 00-2-2h-1v-.25A2.75 2.75 0 0011.25 1h-2.5zM8 4h4v-.25a1.25 1.25 0 00-1.25-1.25h-1.5A1.25 1.25 0 008 3.75V4zm1.25 4a.75.75 0 00-.75.75v6.5a.75.75 0 001.5 0v-6.5a.75.75 0 00-.75-.75zM12.75 8a.75.75 0 00-.75.75v6.5a.75.75 0 001.5 0v-6.5a.75.75 0 00-.75-.75z" clipRule="evenodd" /><path d="M4.318 8.5h11.364l-.557 8.355A2.75 2.75 0 0112.4 19.5H7.6a2.75 2.75 0 01-2.725-2.645L4.318 8.5z" /></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AdminCard>

                <div className="fixed bottom-0 left-0 right-0 lg:left-72 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 flex justify-center z-40 animate-in slide-in-from-bottom-10">
                  <SaveButton onClick={handleSave} isSaving={isSaving} />
                </div>
              </div>
            )}

            {editingAdminId && activeTab === 'admins' && tempAdmin && (
              <Modal title={editingAdminId.startsWith('new_') ? "เพิ่มผู้ดูแลระบบ" : "แก้ไขผู้ดูแลระบบ"} isOpen={!!editingAdminId} onClose={() => { setEditingAdminId(null); setTempAdmin(null); }}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors group cursor-pointer relative overflow-hidden" onClick={() => adminFileInputRef.current?.click()}>
                    <input 
                      type="file" 
                      ref={adminFileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'admin', editingAdminId)}
                    />
                    {tempAdmin.image ? (
                      <div className="relative w-32 h-32 mb-4">
                        <img src={tempAdmin.image} alt="Admin" className="w-full h-full object-cover rounded-full drop-shadow-xl" />
                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-white text-xs font-bold uppercase tracking-widest">เปลี่ยนรูป</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                    <p className="text-sm font-bold text-slate-600">อัปโหลดรูปโปรไฟล์</p>
                  </div>

                  <InputGroup 
                    label="Username" 
                    value={tempAdmin.username} 
                    onChange={v => setTempAdmin({ ...tempAdmin, username: v })} 
                  />
                  <InputGroup 
                    label="Password" 
                    value={tempAdmin.password} 
                    onChange={v => setTempAdmin({ ...tempAdmin, password: v })} 
                  />
                  <InputGroup 
                    label="ชื่อ-นามสกุล" 
                    value={tempAdmin.name} 
                    onChange={v => setTempAdmin({ ...tempAdmin, name: v })} 
                  />
                  <InputGroup 
                    label="เบอร์โทรศัพท์" 
                    value={tempAdmin.phone || ''} 
                    onChange={v => setTempAdmin({ ...tempAdmin, phone: v })} 
                  />
                  <InputGroup 
                    label="อีเมล" 
                    value={tempAdmin.email || ''} 
                    onChange={v => setTempAdmin({ ...tempAdmin, email: v })} 
                  />
                </div>
                <div className="mt-8 flex justify-end">
                   <button onClick={() => { 
                     if (editingAdminId.startsWith('new_')) {
                       setBufferedAdminUsers([...bufferedAdminUsers, tempAdmin]);
                     } else {
                       setBufferedAdminUsers(bufferedAdminUsers.map(u => u.id === editingAdminId ? tempAdmin : u));
                     }
                     setEditingAdminId(null); 
                     setTempAdmin(null);
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">บันทึกข้อมูล</button>
                </div>
              </Modal>
            )}

            {activeTab === 'widgets' && (
              <div className="space-y-8 pb-24">
                <AdminCard title="เมนูวิดเจ็ต" onBack={() => setActiveTab('dashboard')} primaryColor={config.primaryColor}>
                  <div className="flex justify-end mb-6">
                    <button 
                      onClick={() => setEditingWidget({ id: 'new_' + Date.now(), title: '', type: 'shortcut', position: 'banner', isActive: true, shortcuts: [] })}
                      className="px-6 py-2 bg-fuchsia-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-fuchsia-700 transition-all shadow-lg shadow-fuchsia-500/20"
                    >
                      เพิ่มวิดเจ็ตใหม่ +
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {(bufferedConfig.widgets || []).map(widget => (
                      <div key={widget.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-slate-800 text-lg">{widget.title || '(ไม่มีชื่อ)'}</h4>
                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${widget.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                              {widget.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                              {widget.position === 'banner' ? 'แบนเนอร์' : widget.position === 'middle' ? 'ตรงกลาง' : 'ด้านล่าง'}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                              {widget.type === 'shortcut' ? 'เมนูลัด' : widget.type === 'iframe' ? 'Iframe' : 'HTML'}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500">
                            {widget.type === 'shortcut' ? `มี ${widget.shortcuts?.length || 0} ลิงก์` : 'เนื้อหาฝัง (Embed)'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button onClick={() => setEditingWidget(widget)} className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors">แก้ไข</button>
                          <button onClick={() => setBufferedConfig({...bufferedConfig, widgets: bufferedConfig.widgets?.filter(w => w.id !== widget.id)})} className="flex-1 sm:flex-none px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-600 hover:text-white transition-colors">ลบ</button>
                        </div>
                      </div>
                    ))}
                    {(!bufferedConfig.widgets || bufferedConfig.widgets.length === 0) && (
                      <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 font-medium">ยังไม่มีวิดเจ็ต</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center pt-10">
                    <SaveButton onClick={handleSave} isSaving={isSaving} label="บันทึกการเปลี่ยนแปลง" />
                  </div>
                </AdminCard>
              </div>
            )}

            {activeTab === 'heroShortcuts' && (
              <div className="space-y-8 pb-24">
                <AdminCard title="จัดการเมนูลัด (Hero Section)" onBack={() => setActiveTab('dashboard')} primaryColor={config.primaryColor}>
                  <div className="flex justify-end mb-6">
                    <button 
                      onClick={() => setEditingHeroShortcut({ id: 'new_' + Date.now(), title: '', image: '', url: '', isActive: true, type: 'link' })}
                      className="px-6 py-2 bg-orange-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20"
                    >
                      เพิ่มเมนูลัดใหม่ +
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {(bufferedConfig.heroShortcuts || []).map((shortcut, idx) => (
                      <div key={shortcut.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden"
                            style={{ backgroundColor: shortcut.bgColor || '#f1f5f9', color: shortcut.textColor || '#64748b', borderColor: '#e2e8f0' }}
                          >
                            <div className="w-6 h-6"><Icons.Link /></div>
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-bold text-slate-800 text-lg">{shortcut.title || '(ไม่มีชื่อ)'}</h4>
                              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${shortcut.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                {shortcut.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate max-w-[200px] sm:max-w-md">
                              {shortcut.type === 'page' ? 'หน้าเนื้อหาใหม่' : shortcut.url}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <div className="flex gap-1 mr-2">
                            <button 
                              disabled={idx === 0}
                              onClick={() => {
                                const newShortcuts = [...(bufferedConfig.heroShortcuts || [])];
                                [newShortcuts[idx], newShortcuts[idx-1]] = [newShortcuts[idx-1], newShortcuts[idx]];
                                setBufferedConfig({ ...bufferedConfig, heroShortcuts: newShortcuts });
                              }}
                              className="p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" /></svg>
                            </button>
                            <button 
                              disabled={idx === (bufferedConfig.heroShortcuts?.length || 0) - 1}
                              onClick={() => {
                                const newShortcuts = [...(bufferedConfig.heroShortcuts || [])];
                                [newShortcuts[idx], newShortcuts[idx+1]] = [newShortcuts[idx+1], newShortcuts[idx]];
                                setBufferedConfig({ ...bufferedConfig, heroShortcuts: newShortcuts });
                              }}
                              className="p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" /></svg>
                            </button>
                          </div>
                          <button onClick={() => setEditingHeroShortcut(shortcut)} className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors">แก้ไข</button>
                          <button onClick={() => setBufferedConfig({...bufferedConfig, heroShortcuts: bufferedConfig.heroShortcuts?.filter(s => s.id !== shortcut.id)})} className="flex-1 sm:flex-none px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-600 hover:text-white transition-colors">ลบ</button>
                        </div>
                      </div>
                    ))}
                    {(!bufferedConfig.heroShortcuts || bufferedConfig.heroShortcuts.length === 0) && (
                      <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 font-medium">ยังไม่มีเมนูลัด</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center pt-10">
                    <SaveButton onClick={handleSave} isSaving={isSaving} label="บันทึกการเปลี่ยนแปลง" />
                  </div>
                </AdminCard>
              </div>
            )}

            {editingHeroShortcut && activeTab === 'heroShortcuts' && (
              <Modal title={editingHeroShortcut.id.startsWith('new_') ? "เพิ่มเมนูลัดใหม่" : "แก้ไขเมนูลัด"} isOpen={!!editingHeroShortcut} onClose={() => setEditingHeroShortcut(null)}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <input type="checkbox" checked={editingHeroShortcut.isActive} onChange={e => setEditingHeroShortcut({ ...editingHeroShortcut, isActive: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-blue-900">เปิดใช้งานเมนูนี้</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ColorInput 
                        label="สีพื้นหลังปุ่ม (Background Color)" 
                        value={editingHeroShortcut.bgColor || '#f1f5f9'} 
                        onChange={v => setEditingHeroShortcut({ ...editingHeroShortcut, bgColor: v })} 
                      />
                      <ColorInput 
                        label="สีตัวอักษร (Text Color)" 
                        value={editingHeroShortcut.textColor || '#1e293b'} 
                        onChange={v => setEditingHeroShortcut({ ...editingHeroShortcut, textColor: v })} 
                      />
                    </div>
                    <div className="md:col-span-12 space-y-5">
                      <InputGroup label="ชื่อเมนู (Title)" value={editingHeroShortcut.title} onChange={v => setEditingHeroShortcut({ ...editingHeroShortcut, title: v })} />
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">ประเภทลิงก์</label>
                        <select 
                          value={editingHeroShortcut.type || 'link'} 
                          onChange={e => setEditingHeroShortcut({ ...editingHeroShortcut, type: e.target.value as any })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                        >
                          <option value="link">ลิงก์ภายนอก / ภายใน (URL)</option>
                          <option value="page">สร้างหน้าเนื้อหาใหม่ (Custom Page)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {editingHeroShortcut.type === 'page' ? (
                    <div className="space-y-2 border-t border-slate-100 pt-6">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">เนื้อหาหน้าเพจ (Page Content)</label>
                      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100">
                        <ReactQuill 
                          theme="snow" 
                          value={editingHeroShortcut.content || ''} 
                          onChange={v => setEditingHeroShortcut({ ...editingHeroShortcut, content: v })}
                          modules={quillModules}
                          className="min-h-[300px]"
                        />
                      </div>
                    </div>
                  ) : (
                    <InputGroup label="ลิงก์เชื่อมโยง (URL)" value={editingHeroShortcut.url} onChange={v => setEditingHeroShortcut({ ...editingHeroShortcut, url: v })} placeholder="https://... หรือ #/path" />
                  )}
                </div>
                <div className="mt-8 flex justify-end">
                   <button onClick={() => { 
                     const newShortcuts = editingHeroShortcut.id.startsWith('new_') 
                       ? [...(bufferedConfig.heroShortcuts || []), editingHeroShortcut]
                       : (bufferedConfig.heroShortcuts || []).map(s => s.id === editingHeroShortcut.id ? editingHeroShortcut : s);
                     
                     setBufferedConfig({ ...bufferedConfig, heroShortcuts: newShortcuts });
                     setEditingHeroShortcut(null);
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">ตกลง</button>
                </div>
              </Modal>
            )}

            {editingWidget && activeTab === 'widgets' && (
              <Modal title={editingWidget.id.startsWith('new_') ? "เพิ่มวิดเจ็ตใหม่" : "แก้ไขวิดเจ็ต"} isOpen={!!editingWidget} onClose={() => setEditingWidget(null)}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <input type="checkbox" checked={editingWidget.isActive} onChange={e => setEditingWidget({ ...editingWidget, isActive: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-blue-900">เปิดใช้งานวิดเจ็ตนี้</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <input type="checkbox" checked={editingWidget.showTitle !== false} onChange={e => setEditingWidget({ ...editingWidget, showTitle: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-slate-600 focus:ring-slate-500" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">แสดงหัวข้อวิดเจ็ต</span>
                      </div>
                    </div>
                  </div>

                  <InputGroup label="หัวข้อวิดเจ็ต (Title)" value={editingWidget.title} onChange={v => setEditingWidget({ ...editingWidget, title: v })} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">ตำแหน่งที่แสดง</label>
                      <select 
                        value={editingWidget.position} 
                        onChange={e => setEditingWidget({ ...editingWidget, position: e.target.value as any })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                      >
                        <option value="banner">ใต้แบนเนอร์ (Banner)</option>
                        <option value="middle">ตรงกลางหน้าจอ (Middle)</option>
                        <option value="bottom">ด้านล่างก่อน Footer (Bottom)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">ประเภท</label>
                      <select 
                        value={editingWidget.type} 
                        onChange={e => setEditingWidget({ ...editingWidget, type: e.target.value as any })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                      >
                        <option value="shortcut">เมนูลัด (Shortcut Links)</option>
                        <option value="iframe">ฝังโค้ด (Iframe / HTML)</option>
                        <option value="custom">สร้างเนื้อหาใหม่ (Custom Content)</option>
                      </select>
                    </div>
                  </div>

                  {editingWidget.type === 'shortcut' ? (
                    <div className="space-y-4 border-t border-slate-100 pt-6">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-slate-800">รายการเมนูลัด</h4>
                        <button 
                          onClick={() => setEditingWidget({
                            ...editingWidget, 
                            shortcuts: [...(editingWidget.shortcuts || []), { id: 'sc_' + Date.now(), title: '', image: '', url: '', isActive: true }]
                          })}
                          className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
                        >
                          + เพิ่มลิงก์
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {(editingWidget.shortcuts || []).map((sc, idx) => (
                          <div key={sc.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                              <div className="w-16 h-16 shrink-0 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden relative group cursor-pointer" onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e: any) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      const newShortcuts = [...(editingWidget.shortcuts || [])];
                                      newShortcuts[idx].image = reader.result as string;
                                      setEditingWidget({ ...editingWidget, shortcuts: newShortcuts });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                };
                                input.click();
                              }}>
                                {sc.image ? <img src={sc.image} alt="" className="w-full h-full object-contain p-1" /> : <span className="text-[10px] text-slate-400 text-center">คลิกเพิ่มรูป</span>}
                              </div>
                              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ColorInput 
                                  label="สีพื้นหลัง (Background Color)" 
                                  value={sc.bgColor || '#ffffff'} 
                                  onChange={v => {
                                    const newShortcuts = [...(editingWidget.shortcuts || [])];
                                    newShortcuts[idx].bgColor = v;
                                    setEditingWidget({ ...editingWidget, shortcuts: newShortcuts });
                                  }} 
                                />
                                <ColorInput 
                                  label="สีตัวอักษร (Text Color)" 
                                  value={sc.textColor || '#1e293b'} 
                                  onChange={v => {
                                    const newShortcuts = [...(editingWidget.shortcuts || [])];
                                    newShortcuts[idx].textColor = v;
                                    setEditingWidget({ ...editingWidget, shortcuts: newShortcuts });
                                  }} 
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">ชื่อเมนู</label>
                                <input type="text" placeholder="ชื่อลิงก์" value={sc.title} onChange={e => {
                                  const newShortcuts = [...(editingWidget.shortcuts || [])];
                                  newShortcuts[idx].title = e.target.value;
                                  setEditingWidget({ ...editingWidget, shortcuts: newShortcuts });
                                }} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">ประเภท</label>
                                <select 
                                  value={sc.type || 'link'} 
                                  onChange={e => {
                                    const newShortcuts = [...(editingWidget.shortcuts || [])];
                                    newShortcuts[idx].type = e.target.value as 'link' | 'page';
                                    setEditingWidget({ ...editingWidget, shortcuts: newShortcuts });
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                                >
                                  <option value="link">ลิงก์ภายนอก</option>
                                  <option value="page">หน้าเนื้อหาภายใน</option>
                                </select>
                              </div>
                              {sc.type === 'page' ? (
                                <div className="md:col-span-2 space-y-2">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase">เนื้อหาหน้าเพจ</label>
                                  <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
                                    <ReactQuill 
                                      theme="snow" 
                                      value={sc.content || ''} 
                                      onChange={v => {
                                        const newShortcuts = [...(editingWidget.shortcuts || [])];
                                        newShortcuts[idx].content = v;
                                        setEditingWidget({ ...editingWidget, shortcuts: newShortcuts });
                                      }}
                                      modules={quillModules}
                                      className="min-h-[150px]"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="md:col-span-2 space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase">URL ลิงก์</label>
                                  <input type="text" placeholder="URL (เช่น https://...)" value={sc.url} onChange={e => {
                                    const newShortcuts = [...(editingWidget.shortcuts || [])];
                                    newShortcuts[idx].url = e.target.value;
                                    setEditingWidget({ ...editingWidget, shortcuts: newShortcuts });
                                  }} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm" />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <input type="checkbox" checked={sc.isActive} onChange={e => {
                                const newShortcuts = [...(editingWidget.shortcuts || [])];
                                  newShortcuts[idx].isActive = e.target.checked;
                                  setEditingWidget({ ...editingWidget, shortcuts: newShortcuts });
                                }} className="w-4 h-4 rounded border-slate-300" title="เปิด/ปิด" />
                                <button onClick={() => {
                                  const newShortcuts = editingWidget.shortcuts?.filter((_, i) => i !== idx);
                                  setEditingWidget({ ...editingWidget, shortcuts: newShortcuts });
                                }} className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors" title="ลบ">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                              </div>
                            </div>
                          ))}
                          {(!editingWidget.shortcuts || editingWidget.shortcuts.length === 0) && (
                            <p className="text-sm text-slate-500 text-center py-4">ยังไม่มีลิงก์ กรุณากดปุ่ม + เพิ่มลิงก์</p>
                          )}
                        </div>
                      </div>
                    ) : editingWidget.type === 'custom' ? (
                      <div className="space-y-2 border-t border-slate-100 pt-6">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">เนื้อหาวิดเจ็ต (Custom Content)</label>
                        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100">
                          <ReactQuill 
                            theme="snow" 
                            value={editingWidget.content || ''} 
                            onChange={v => setEditingWidget({ ...editingWidget, content: v })}
                            modules={quillModules}
                            className="min-h-[250px]"
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">คุณสามารถสร้างเนื้อหาด้วยการจัดรูปแบบข้อความและรูปภาพได้ตามต้องการ</p>
                      </div>
                    ) : (
                      <div className="space-y-2 border-t border-slate-100 pt-6">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">โค้ดสำหรับฝัง (Iframe / HTML)</label>
                        <textarea 
                          value={editingWidget.content || ''} 
                          onChange={e => setEditingWidget({ ...editingWidget, content: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner min-h-[150px] font-mono"
                          placeholder={`<iframe src="..." width="100%" height="400"></iframe>`}
                        />
                        <p className="text-xs text-slate-500 mt-2">สามารถนำโค้ด Iframe จาก Google Maps, YouTube, หรือ Facebook Page มาวางที่นี่ได้เลย</p>
                      </div>
                    )}
                </div>
                <div className="mt-8 flex justify-end">
                   <button onClick={() => { 
                     const newWidgets = editingWidget.id.startsWith('new_') 
                       ? [...(bufferedConfig.widgets || []), editingWidget]
                       : (bufferedConfig.widgets || []).map(w => w.id === editingWidget.id ? editingWidget : w);
                     
                     setBufferedConfig({ ...bufferedConfig, widgets: newWidgets });
                     setEditingWidget(null);
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">ตกลง</button>
                </div>
              </Modal>
            )}

            {editingSlide && activeTab === 'slides' && (
              <Modal title={editingSlide.id.startsWith('new_') ? "เพิ่มสไลด์ใหม่" : "แก้ไขสไลด์"} isOpen={!!editingSlide} onClose={() => setEditingSlide(null)}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 transition-colors" onClick={() => slideFileInputRef.current?.click()}>
                    <input type="file" ref={slideFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'slide')} />
                    {editingSlide.image ? (
                      <img src={editingSlide.image} alt="Slide Preview" className="w-full h-auto rounded-2xl shadow-md" />
                    ) : (
                      <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                      </div>
                    )}
                    <p className="text-sm font-bold text-slate-600">อัปโหลดรูปภาพสไลด์</p>
                  </div>
                  <InputGroup label="หัวข้อ (Title)" value={editingSlide.title || ''} onChange={v => setEditingSlide({ ...editingSlide, title: v })} />
                  <InputGroup label="คำอธิบาย (Description)" value={editingSlide.description || ''} onChange={v => setEditingSlide({ ...editingSlide, description: v })} isTextArea />
                </div>
                <div className="mt-8 flex justify-end">
                   <button onClick={async () => { 
                     const newSlides = editingSlide.id.startsWith('new_') 
                       ? [editingSlide, ...(bufferedConfig.slides || [])]
                       : (bufferedConfig.slides || []).map((s: any) => s.id === editingSlide.id ? editingSlide : s);
                     
                     const newConfig = { ...bufferedConfig, slides: newSlides };
                     setBufferedConfig(newConfig);
                     setConfig(newConfig);
                     
                     try {
                       await saveData('config', { ...newConfig, id: 1 });
                       setEditingSlide(null);
                       setSaveSuccess(true);
                       setTimeout(() => setSaveSuccess(false), 2000);
                     } catch (error) {
                       console.error("Failed to save slide:", error);
                     }
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">บันทึกข้อมูล</button>
                </div>
              </Modal>
            )}

            {editingNews && activeTab === 'news' && (
              <Modal title={editingNews.id.startsWith('new_') ? "เพิ่มข่าวและกิจกรรม" : "แก้ไขข่าวและกิจกรรม"} isOpen={!!editingNews} onClose={() => setEditingNews(null)}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 transition-colors" onClick={() => newsFileInputRef.current?.click()}>
                    <input type="file" ref={newsFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'news')} />
                    {editingNews.image ? (
                      <img src={editingNews.image} alt="News Preview" className="w-full h-auto rounded-2xl shadow-md" />
                    ) : (
                      <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                      </div>
                    )}
                    <p className="text-sm font-bold text-slate-600">อัปโหลดรูปภาพข่าว (ภาพหลัก)</p>
                  </div>
                  
                  <div className="flex flex-col gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">ภาพประกอบเพิ่มเติม: (ถ้ามี)</label>
                      <button 
                        onClick={() => newsAdditionalImagesInputRef.current?.click()}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm"
                      >
                        + เพิ่มรูปภาพ
                      </button>
                      <input 
                        type="file" 
                        ref={newsAdditionalImagesInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => handleAdditionalImagesUpload(e, 'news')} 
                      />
                    </div>
                    
                    {editingNews.images && editingNews.images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                        {editingNews.images.map((img, idx) => (
                          <div key={idx} className="relative group aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                            <img src={img} alt={`Additional ${idx}`} className="w-full h-full object-cover" />
                            <button 
                              onClick={() => {
                                const newImages = [...(editingNews.images || [])];
                                newImages.splice(idx, 1);
                                setEditingNews({ ...editingNews, images: newImages });
                              }}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <InputGroup label="หัวข้อข่าว (Title)" value={editingNews.title || ''} onChange={v => setEditingNews({ ...editingNews, title: v })} />
                  <InputGroup label="วันที่" type="date" value={editingNews.date || ''} onChange={v => setEditingNews({ ...editingNews, date: v })} showThaiDate />
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">เนื้อหาข่าว (Content)</label>
                    <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-inner min-h-[300px]">
                      <ReactQuill 
                        theme="snow" 
                        value={editingNews.content || ''} 
                        onChange={v => setEditingNews({ ...editingNews, content: v })}
                        modules={quillModules}
                        className="h-[250px] mb-12"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                   <button onClick={async () => { 
                     try {
                       await saveData('news', editingNews);
                       const newNewsList = editingNews.id.startsWith('new_') 
                         ? [...news, editingNews]
                         : news.map((n: any) => n.id === editingNews.id ? editingNews : n);
                       
                       // Sort by date descending
                       newNewsList.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                       
                       setNews(newNewsList);
                       setEditingNews(null);
                       setSaveSuccess(true);
                       setTimeout(() => setSaveSuccess(false), 2000);
                     } catch (error) {
                       console.error("Failed to save news:", error);
                     }
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">บันทึกข้อมูล</button>
                </div>
              </Modal>
            )}

            {editingAchievement && activeTab === 'achievements' && (
              <Modal title={editingAchievement.id.startsWith('new_') ? "เพิ่มรางวัลและผลงาน" : "แก้ไขรางวัลและผลงาน"} isOpen={!!editingAchievement} onClose={() => setEditingAchievement(null)}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 transition-colors" onClick={() => achievementFileInputRef.current?.click()}>
                    <input type="file" ref={achievementFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'achievement')} />
                    {editingAchievement.image ? (
                      <img src={editingAchievement.image} alt="Achievement Preview" className="w-full h-auto rounded-2xl shadow-md" />
                    ) : (
                      <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                      </div>
                    )}
                    <p className="text-sm font-bold text-slate-600">อัปโหลดรูปภาพรางวัล (ภาพหลัก)</p>
                  </div>

                  <div className="flex flex-col gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">ภาพประกอบเพิ่มเติม: (ถ้ามี)</label>
                      <button 
                        onClick={() => achievementAdditionalImagesInputRef.current?.click()}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm"
                      >
                        + เพิ่มรูปภาพ
                      </button>
                      <input 
                        type="file" 
                        ref={achievementAdditionalImagesInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => handleAdditionalImagesUpload(e, 'achievement')} 
                      />
                    </div>
                    
                    {editingAchievement.images && editingAchievement.images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                        {editingAchievement.images.map((img, idx) => (
                          <div key={idx} className="relative group aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                            <img src={img} alt={`Additional ${idx}`} className="w-full h-full object-cover" />
                            <button 
                              onClick={() => {
                                const newImages = [...(editingAchievement.images || [])];
                                newImages.splice(idx, 1);
                                setEditingAchievement({ ...editingAchievement, images: newImages });
                              }}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <InputGroup label="หัวข้อรางวัล (Title)" value={editingAchievement.title || ''} onChange={v => setEditingAchievement({ ...editingAchievement, title: v })} />
                  <InputGroup label="วันที่" type="date" value={editingAchievement.date || ''} onChange={v => setEditingAchievement({ ...editingAchievement, date: v })} showThaiDate />
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">เนื้อหารายละเอียด (Content)</label>
                    <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-inner min-h-[300px]">
                      <ReactQuill 
                        theme="snow" 
                        value={editingAchievement.content || ''} 
                        onChange={v => setEditingAchievement({ ...editingAchievement, content: v })}
                        modules={quillModules}
                        className="h-[250px] mb-12"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                   <button onClick={async () => { 
                     try {
                       await saveData('achievements', editingAchievement);
                       const newAchievementList = editingAchievement.id.startsWith('new_') 
                         ? [...achievements, editingAchievement]
                         : achievements.map(a => a.id === editingAchievement.id ? editingAchievement : a);
                       
                       // Sort by date descending
                       newAchievementList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                       
                       setAchievements(newAchievementList);
                       setEditingAchievement(null);
                       setSaveSuccess(true);
                       setTimeout(() => setSaveSuccess(false), 2000);
                     } catch (error) {
                       console.error("Failed to save achievement:", error);
                     }
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">บันทึกข้อมูล</button>
                </div>
              </Modal>
            )}

            {editingJournal && activeTab === 'journals' && (
              <Modal title={editingJournal.id.startsWith('new_') ? "เพิ่มวารสารโรงเรียน" : "แก้ไขวารสารโรงเรียน"} isOpen={!!editingJournal} onClose={() => setEditingJournal(null)}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left: Thumbnail Preview (A4 Style) */}
                  <div className="md:col-span-5 lg:col-span-4">
                    <div 
                      className="group relative aspect-[210/297] bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center p-2"
                      onClick={() => journalFileInputRef.current?.click()}
                    >
                      <input type="file" ref={journalFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'journal')} />
                      {editingJournal.thumbnail ? (
                        <>
                          <img src={editingJournal.thumbnail} alt="Journal Preview" className="w-full h-full object-cover rounded-xl shadow-sm" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="text-white text-[10px] font-black uppercase tracking-widest bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">เปลี่ยนรูปหน้าปก</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-slate-400 p-6 text-center">
                          <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest">อัปโหลดหน้าปก</p>
                          <p className="text-[9px] mt-1 opacity-60">ขนาด A4 (แนวตั้ง)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Form Fields */}
                  <div className="md:col-span-7 lg:col-span-8 space-y-5">
                    <InputGroup label="หัวข้อวารสาร (Title)" value={editingJournal.title || ''} onChange={v => setEditingJournal({ ...editingJournal, title: v })} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputGroup label="ฉบับที่ (Issue)" value={editingJournal.issue || ''} onChange={v => setEditingJournal({ ...editingJournal, issue: v })} />
                      <InputGroup label="วันที่แสดงผล" type="date" value={editingJournal.dateStr || ''} onChange={v => setEditingJournal({ ...editingJournal, dateStr: v })} showThaiDate />
                    </div>
                    <InputGroup label="ลิงก์ไฟล์ PDF (PDF URL)" value={editingJournal.pdfUrl || ''} onChange={v => setEditingJournal({ ...editingJournal, pdfUrl: v })} />
                  </div>
                </div>
                <div className="mt-8 flex justify-end shrink-0">
                   <button onClick={async () => { 
                     try {
                       await saveData('journals', editingJournal);
                       const newJournalList = editingJournal.id.startsWith('new_') 
                         ? [...journals, editingJournal]
                         : journals.map(j => j.id === editingJournal.id ? editingJournal : j);
                       
                       // Sort by date descending
                       newJournalList.sort((a, b) => {
                         const dateA = a.dateStr ? new Date(a.dateStr).getTime() : 0;
                         const dateB = b.dateStr ? new Date(b.dateStr).getTime() : 0;
                         return dateB - dateA;
                       });
                       
                       setJournals(newJournalList);
                       setEditingJournal(null);
                       setSaveSuccess(true);
                       setTimeout(() => setSaveSuccess(false), 2000);
                     } catch (error) {
                       console.error("Failed to save journal:", error);
                     }
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">บันทึกข้อมูลวารสาร</button>
                </div>
              </Modal>
            )}

            {editingPersonnel && activeTab === 'staff' && (
              <Modal title={editingPersonnel.id.startsWith('new_') ? "เพิ่มบุคลากร" : "แก้ไขบุคลากร"} isOpen={!!editingPersonnel} onClose={() => setEditingPersonnel(null)}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 transition-colors" onClick={() => personnelFileInputRef.current?.click()}>
                    <input type="file" ref={personnelFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'personnel')} />
                    {editingPersonnel.image ? (
                      <img src={editingPersonnel.image} alt="Personnel Preview" className="w-32 h-32 rounded-full object-cover shadow-md" />
                    ) : (
                      <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                      </div>
                    )}
                    <p className="text-sm font-bold text-slate-600">อัปโหลดรูปโปรไฟล์บุคลากร (1:1)</p>
                  </div>

                  <InputGroup label="ชื่อ-นามสกุล" value={editingPersonnel.name || ''} onChange={v => setEditingPersonnel({ ...editingPersonnel, name: v })} />
                  <InputGroup label="ตำแหน่ง" value={editingPersonnel.position || ''} onChange={v => setEditingPersonnel({ ...editingPersonnel, position: v })} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="วิทยฐานะ (ถ้ามี)" value={editingPersonnel.rank || ''} onChange={v => setEditingPersonnel({ ...editingPersonnel, rank: v })} />
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">ฝ่าย/กลุ่มสาระ</label>
                      <select 
                        value={editingPersonnel.department || 'management'} 
                        onChange={e => setEditingPersonnel({ ...editingPersonnel, department: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                      >
                        <option value="management">บริหาร</option>
                        <option value="office">ธุรการ</option>
                        <option value="academic">วิชาการ</option>
                        <option value="student">กิจการนักเรียน</option>
                        <option value="general">ทั่วไป</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">เพศ</label>
                      <select 
                        value={editingPersonnel.gender || 'male'} 
                        onChange={e => setEditingPersonnel({ ...editingPersonnel, gender: e.target.value as 'male' | 'female' })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                      >
                        <option value="male">ชาย</option>
                        <option value="female">หญิง</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                   <button onClick={async () => { 
                     try {
                       await saveData('personnel', editingPersonnel);
                       const newStaffList = editingPersonnel.id.startsWith('new_') 
                         ? [...staff, editingPersonnel]
                         : staff.map(s => s.id === editingPersonnel.id ? editingPersonnel : s);
                       
                       setStaff(newStaffList);
                       
                       // Sync with Director card on homepage if position matches
                       if (editingPersonnel.position === "ผู้อำนวยการโรงเรียน") {
                         const newConfig = {
                           ...config,
                           director: {
                             ...editingPersonnel,
                             id: config.director.id // Preserve the director slot ID in config
                           }
                         };
                         await saveData('config', newConfig);
                         setConfig(newConfig);
                       }
                       
                       setEditingPersonnel(null);
                       setSaveSuccess(true);
                       setTimeout(() => setSaveSuccess(false), 2000);
                     } catch (error) {
                       console.error("Failed to save personnel:", error);
                     }
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">บันทึกข้อมูล</button>
                </div>
              </Modal>
            )}

            {editingEvent && activeTab === 'calendar' && (
              <Modal title={editingEvent.id.startsWith('new_') ? "เพิ่มกิจกรรมปฏิทิน" : "แก้ไขกิจกรรมปฏิทิน"} isOpen={!!editingEvent} onClose={() => setEditingEvent(null)}>
                <div className="grid grid-cols-1 gap-6">
                  <InputGroup label="หัวข้อกิจกรรม" value={editingEvent.title || ''} onChange={v => setEditingEvent({ ...editingEvent, title: v })} />
                  <InputGroup label="รายละเอียด" isTextArea value={editingEvent.description || ''} onChange={v => setEditingEvent({ ...editingEvent, description: v })} />
                  <InputGroup label="วันที่" type="date" value={editingEvent.date || ''} onChange={v => setEditingEvent({ ...editingEvent, date: v })} showThaiDate />
                </div>
                <div className="mt-8 flex justify-end">
                   <button onClick={async () => { 
                     try {
                       await saveData('events', editingEvent);
                       const newEventList = editingEvent.id.startsWith('new_') 
                         ? [...events, editingEvent]
                         : events.map(e => e.id === editingEvent.id ? editingEvent : e);
                       
                       // Sort by date descending
                       newEventList.sort((a, b) => b.date.localeCompare(a.date));
                       
                       setEvents(newEventList);
                       setEditingEvent(null);
                       setSaveSuccess(true);
                       setTimeout(() => setSaveSuccess(false), 2000);
                     } catch (error) {
                       console.error("Failed to save event:", error);
                     }
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">บันทึกข้อมูล</button>
                </div>
              </Modal>
            )}

            {editingGradeStat && activeTab === 'stats' && (
              <Modal title={editingGradeStat.id.startsWith('new_') ? "เพิ่มข้อมูลนักเรียนรายชั้น" : "แก้ไขข้อมูลนักเรียนรายชั้น"} isOpen={!!editingGradeStat} onClose={() => setEditingGradeStat(null)}>
                <div className="grid grid-cols-1 gap-6">
                  <InputGroup label="ระดับชั้น (เช่น อนุบาล 1, ป.1)" value={editingGradeStat.grade || ''} onChange={v => setEditingGradeStat({ ...editingGradeStat, grade: v })} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="จำนวนชาย" type="number" value={String(editingGradeStat.male)} onChange={v => setEditingGradeStat({ ...editingGradeStat, male: parseInt(v) || 0 })} />
                    <InputGroup label="จำนวนหญิง" type="number" value={String(editingGradeStat.female)} onChange={v => setEditingGradeStat({ ...editingGradeStat, female: parseInt(v) || 0 })} />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                   <button onClick={() => { 
                     const newGradeStats = editingGradeStat.id.startsWith('new_') 
                       ? [...(bufferedConfig.stats.gradeStats || []), editingGradeStat]
                       : (bufferedConfig.stats.gradeStats || []).map(g => g.id === editingGradeStat.id ? editingGradeStat : g);
                     
                     const totalMale = newGradeStats.reduce((sum, g) => sum + g.male, 0);
                     const totalFemale = newGradeStats.reduce((sum, g) => sum + g.female, 0);

                     setBufferedConfig({
                       ...bufferedConfig,
                       stats: {
                         ...bufferedConfig.stats,
                         gradeStats: newGradeStats,
                         maleStudents: totalMale,
                         femaleStudents: totalFemale,
                         totalStudents: totalMale + totalFemale
                       }
                     });
                     setEditingGradeStat(null);
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">ตกลง</button>
                </div>
              </Modal>
            )}

            {editingMenu && activeTab === 'menus' && (
              <Modal title={editingMenu.id.startsWith('new_') ? "เพิ่มเมนูนำทาง" : "แก้ไขเมนูนำทาง"} isOpen={!!editingMenu} onClose={() => setEditingMenu(null)}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup 
                      label="ชื่อเมนู" 
                      value={editingMenu.label || ''} 
                      onChange={v => setEditingMenu({ ...editingMenu, label: v })} 
                      readOnly={editingMenu.label === 'ติดต่อเรา'}
                    />
                    <div className="space-y-1 w-full">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-0.5 block">ประเภทเมนู</label>
                      <select 
                        value={editingMenu.type || 'link'} 
                        disabled={editingMenu.label === 'ติดต่อเรา'}
                        onChange={e => {
                          const type = e.target.value as 'link' | 'page';
                          const path = type === 'page' ? `#/page/${editingMenu.id}` : editingMenu.path;
                          setEditingMenu({ ...editingMenu, type, path });
                        }}
                        className={`w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner ${editingMenu.label === 'ติดต่อเรา' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <option value="link">ลิงก์ภายนอก / เส้นทางเดิม</option>
                        <option value="page">สร้างเนื้อหาหน้าใหม่ (Custom Page)</option>
                      </select>
                    </div>
                  </div>

                  <InputGroup 
                    label="เส้นทาง (Path)" 
                    value={editingMenu.path || ''} 
                    onChange={v => setEditingMenu({ ...editingMenu, path: v })} 
                    readOnly={editingMenu.type === 'page' || editingMenu.label === 'ติดต่อเรา'}
                  />

                  {editingMenu.type === 'page' && (
                    <>
                      <div className="space-y-4">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">รูปภาพประกอบหน้าเพจ</label>
                        <div className="flex items-start gap-6">
                          <input type="file" ref={menuFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'menu')} />
                          <div className="w-40 h-24 bg-slate-100 rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 flex items-center justify-center shrink-0">
                            {editingMenu.image ? (
                              <img src={editingMenu.image} alt="Page Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-center p-2">
                                <Icons.Staff />
                                <p className="text-[8px] mt-1 font-bold text-slate-400">ยังไม่มีรูป</p>
                              </div>
                            )}
                          </div>
                          <div className="flex-grow space-y-3">
                            <button 
                              onClick={() => menuFileInputRef.current?.click()}
                              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                              อัปโหลดรูปภาพ
                            </button>
                            <p className="text-[9px] text-slate-400 leading-relaxed">แนะนำขนาด 1200x600px หรืออัตราส่วน 2:1 เพื่อความสวยงาม</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">เนื้อหาหน้าเพจ (Content)</label>
                        <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-inner min-h-[300px]">
                          <ReactQuill 
                            theme="snow" 
                            value={editingMenu.content || ''} 
                            onChange={v => setEditingMenu({ ...editingMenu, content: v })}
                            modules={quillModules}
                            className="h-[250px] mb-12"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <input 
                        type="checkbox" 
                        checked={editingMenu.isActive} 
                        disabled={editingMenu.label === 'หน้าแรก'}
                        onChange={e => setEditingMenu({ ...editingMenu, isActive: e.target.checked })} 
                        className={`w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 ${editingMenu.label === 'หน้าแรก' ? 'opacity-50 cursor-not-allowed' : ''}`} 
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-blue-900">เปิดใช้งานเมนูนี้</span>
                        <span className="text-[10px] text-blue-600 font-medium">หากปิดไว้ เมนูนี้จะไม่แสดงผลที่แถบนำทางด้านบน</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                   <button onClick={() => { 
                     const newMenuList = editingMenu.id.startsWith('new_') 
                       ? [...bufferedMenus, editingMenu]
                       : bufferedMenus.map(m => m.id === editingMenu.id ? editingMenu : m);
                     
                     setBufferedMenus(newMenuList);
                     setEditingMenu(null);
                   }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">บันทึกข้อมูล</button>
                </div>
              </Modal>
            )}

            {activeTab === 'theme' && (
              <AdminCard title="ปรับแต่งธีมและแบนเนอร์" onBack={() => setActiveTab('dashboard')} primaryColor={config.primaryColor}>
                <div className="space-y-10">
                  
                  {/* Global Theme & Typography Section */}
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      หมวดหมู่สีหลักและฟอนต์ (Global Theme & Typography)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <ColorInput 
                        label="สีหลักของเว็บไซต์ (Primary Color)" 
                        value={bufferedConfig.primaryColor} 
                        onChange={v => setBufferedConfig({...bufferedConfig, primaryColor: v})} 
                      />

                      <ColorInput 
                        label="สีรองของเว็บไซต์ (Secondary Color)" 
                        value={bufferedConfig.secondaryColor || '#facc15'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, secondaryColor: v})} 
                      />

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">รูปแบบตัวอักษร (Font Family)</label>
                        <select 
                          value={bufferedConfig.fontFamily || 'Kanit'} 
                          onChange={e => setBufferedConfig({...bufferedConfig, fontFamily: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                        >
                          <option value="Kanit">Kanit (ค่าเริ่มต้น)</option>
                          <option value="Sarabun">Sarabun</option>
                          <option value="Prompt">Prompt</option>
                          <option value="Inter">Inter</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Banner Content Section */}
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                      หมวดหมู่แบนเนอร์ (Banner Section)
                    </h4>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-0.5 block">ภาพแบนเนอร์ (Banner Image)</label>
                        <div 
                          className="relative w-full h-48 md:h-64 bg-slate-200 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors group cursor-pointer flex flex-col items-center justify-center"
                          onClick={() => bannerFileInputRef.current?.click()}
                        >
                          <input 
                            type="file" 
                            ref={bannerFileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'banner')}
                          />
                          {bufferedConfig.bannerImage ? (
                            <>
                              <img src={bufferedConfig.bannerImage} alt="Banner Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">คลิกเพื่ออัปโหลดรูปภาพใหม่</span>
                              </div>
                            </>
                          ) : (
                            <div className="text-slate-400 flex flex-col items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                              <span className="text-sm font-bold">คลิกเพื่ออัปโหลดรูปภาพแบนเนอร์</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <ColorInput 
                        label="สีข้อความชื่อโรงเรียนในแบนเนอร์ (School Name Text Color)" 
                        value={bufferedConfig.bannerTextColor || '#ffffff'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, bannerTextColor: v})} 
                        helpText="คลิกที่กล่องสีหรือพิมพ์รหัสสีเพื่อเปลี่ยนสีข้อความชื่อโรงเรียน"
                      />

                      <InputGroup label="ข้อความแบนเนอร์ (Slogan)" isTextArea value={bufferedConfig.bannerSlogan} onChange={v => setBufferedConfig({...bufferedConfig, bannerSlogan: v})} />
                      
                      <ColorInput 
                        label="สีกรอบข้อความแบนเนอร์ (Slogan Border Color)" 
                        value={bufferedConfig.sloganBorderColor || '#fbbf24'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, sloganBorderColor: v})} 
                        helpText="คลิกที่กล่องสีหรือพิมพ์รหัสสีเพื่อเปลี่ยนสีกรอบ"
                      />

                      <ColorInput 
                        label="สีข้อความแบนเนอร์ (Slogan Text Color)" 
                        value={bufferedConfig.sloganTextColor || '#0f172a'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, sloganTextColor: v})} 
                        helpText="คลิกที่กล่องสีหรือพิมพ์รหัสสีเพื่อเปลี่ยนสีข้อความ"
                      />

                      <InputGroup label="YouTube Embed URL (วิดีโอแนะนำโรงเรียน)" value={bufferedConfig.videoUrl} onChange={v => setBufferedConfig({...bufferedConfig, videoUrl: v})} />
                    </div>
                  </div>

                  {/* Body Content Section */}
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                      หมวดหมู่เนื้อหา (Body Section)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <ColorInput 
                        label="สีพื้นหลังเว็บไซต์ (Body Background Color)" 
                        value={bufferedConfig.bodyBackgroundColor || '#f8fafc'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, bodyBackgroundColor: v})} 
                      />

                      <ColorInput 
                        label="สีข้อความทั่วไป (Body Text Color)" 
                        value={bufferedConfig.bodyTextColor || '#334155'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, bodyTextColor: v})} 
                      />
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                      หมวดหมู่ส่วนท้าย (Footer Section)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <ColorInput 
                        label="สีพื้นหลังส่วนท้าย (Footer Background Color)" 
                        value={bufferedConfig.footerBackgroundColor || '#0f172a'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, footerBackgroundColor: v})} 
                      />

                      <ColorInput 
                        label="สีข้อความส่วนท้าย (Footer Text Color)" 
                        value={bufferedConfig.footerTextColor || '#94a3b8'} 
                        onChange={v => setBufferedConfig({...bufferedConfig, footerTextColor: v})} 
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center pt-4">
                    <SaveButton onClick={handleSave} isSaving={isSaving} label="บันทึกการตั้งค่า" />
                  </div>
                </div>
              </AdminCard>
            )}

            {activeTab === 'stats' && (
              <AdminCard title="ข้อมูลจำนวนนักเรียน" onBack={() => setActiveTab('dashboard')} primaryColor={config.primaryColor}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <InputGroup label="รวมชาย" type="number" value={String(bufferedConfig.stats.maleStudents)} readOnly />
                  <InputGroup label="รวมหญิง" type="number" value={String(bufferedConfig.stats.femaleStudents)} readOnly />
                  <div className="flex flex-col justify-center bg-slate-900 text-white p-6 rounded-2xl">
                    <span className="text-xs font-black uppercase opacity-60 tracking-widest">ยอดรวมทั้งหมด</span>
                    <span className="text-2xl font-black">{bufferedConfig.stats.maleStudents + bufferedConfig.stats.femaleStudents}</span>
                  </div>
                </div>
                
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={() => {
                      const totalMale = bufferedConfig.stats.gradeStats.reduce((sum, g) => sum + g.male, 0);
                      const totalFemale = bufferedConfig.stats.gradeStats.reduce((sum, g) => sum + g.female, 0);
                      setBufferedConfig({
                        ...bufferedConfig,
                        stats: {
                          ...bufferedConfig.stats,
                          maleStudents: totalMale,
                          femaleStudents: totalFemale,
                          totalStudents: totalMale + totalFemale
                        }
                      });
                    }}
                    className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors border border-emerald-100"
                  >
                    คำนวณยอดรวมจากรายชั้นอัตโนมัติ
                  </button>
                </div>

                <AdminList 
                  title="จำนวนนักเรียนรายชั้น" 
                  items={bufferedConfig.stats.gradeStats} 
                  onDelete={(id: string) => {
                    const item = bufferedConfig.stats.gradeStats.find(g => g.id === id);
                    setDeleteConfirm({ isOpen: true, type: 'grade_stat', id, title: item?.grade || '' });
                  }} 
                  onAdd={() => setEditingGradeStat({ id: 'new_' + Date.now(), grade: '', male: 0, female: 0 })} 
                  onEdit={(item: any) => setEditingGradeStat(item)}
                  onBack={() => setActiveTab('dashboard')} 
                  columns={[
                    { header: "ระดับชั้น", key: "grade" },
                    { header: "นักเรียนชาย", key: "male", align: "center" },
                    { header: "นักเรียนหญิง", key: "female", align: "center" },
                    { header: "รวม", align: "right", render: (item: any) => <span className="font-black text-slate-900">{(item.male || 0) + (item.female || 0)}</span> }
                  ]}
                />

                <div className="flex justify-center pt-10">
                  <SaveButton onClick={handleSave} isSaving={isSaving} label="บันทึกข้อมูลจำนวนนักเรียน" />
                </div>
              </AdminCard>
            )}

            {activeTab === 'news' && <AdminList 
              title="ข่าวและกิจกรรม" 
              items={news} 
              onDelete={(id: string) => {
                const item = news.find(n => n.id === id);
                setDeleteConfirm({ isOpen: true, type: 'news', id, title: item?.title || '' });
              }} 
              onAdd={() => {
                setEditingNews({ id: 'new_' + Date.now(), title: '', date: new Date().toISOString().split('T')[0], image: '', content: '', views: 0, category: 'PR' });
              }} 
              onEdit={(item: any) => setEditingNews(item)} 
              onBack={() => setActiveTab('dashboard')} 
              columns={[
                { header: "ข่าวสาร", render: (item: any) => (
                  <div className="flex items-center gap-4">
                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-slate-800">{item.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black">{item.category}</p>
                    </div>
                  </div>
                )},
                { header: "วันที่ลงข่าว", render: (item: any) => <span className="text-xs font-bold text-slate-500">{formatThaiDate(item.date)}</span> },
                { header: "ยอดเข้าชม", align: "center", render: (item: any) => <span className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">{item.views || 0}</span> }
              ]}
            />}
            {activeTab === 'achievements' && <AdminList 
              title="รางวัลและผลงาน" 
              items={achievements} 
              onDelete={(id: string) => {
                const item = achievements.find(a => a.id === id);
                setDeleteConfirm({ isOpen: true, type: 'achievements', id, title: item?.title || '' });
              }} 
              onAdd={() => {
                setEditingAchievement({ id: 'new_' + Date.now(), title: '', date: new Date().toISOString().split('T')[0], image: '', content: '', views: 0 });
              }} 
              onEdit={(item: any) => setEditingAchievement(item)} 
              onBack={() => setActiveTab('dashboard')} 
              columns={[
                { header: "ผลงาน/รางวัล", render: (item: any) => (
                  <div className="flex items-center gap-4">
                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                    <p className="font-bold text-slate-800">{item.title}</p>
                  </div>
                )},
                { header: "วันที่ได้รับ", render: (item: any) => <span className="text-xs font-bold text-slate-500">{formatThaiDate(item.date)}</span> }
              ]}
            />}
            {activeTab === 'journals' && <AdminList 
              title="วารสารโรงเรียน" 
              items={journals} 
              onDelete={(id: string) => {
                const item = journals.find(j => j.id === id);
                setDeleteConfirm({ isOpen: true, type: 'journals', id, title: item?.title || '' });
              }} 
              onAdd={() => {
                setEditingJournal({ id: 'new_' + Date.now(), title: '', pdfUrl: '', thumbnail: '', views: 0, dateStr: '', issue: '' });
              }} 
              onEdit={(item: any) => setEditingJournal(item)} 
              onBack={() => setActiveTab('dashboard')} 
              columns={[
                { header: "วารสาร", render: (item: any) => (
                  <div className="flex items-center gap-4">
                    <img src={item.thumbnail} className="w-10 h-14 rounded-lg object-cover shadow-sm" />
                    <div>
                      <p className="font-bold text-slate-800">{item.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{item.issue}</p>
                    </div>
                  </div>
                )},
                { header: "ยอดอ่าน", align: "center", render: (item: any) => <span className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">{item.views || 0}</span> }
              ]}
            />}
            {activeTab === 'staff' && <AdminList 
              title="ทำเนียบบุคลากร" 
              items={staff} 
              onDelete={(id: string) => {
                const item = staff.find(s => s.id === id);
                setDeleteConfirm({ isOpen: true, type: 'personnel', id, title: item?.name || '' });
              }} 
              onAdd={() => {
                setEditingPersonnel({ id: 'new_' + Date.now(), name: '', position: '', image: '', department: '', gender: 'male' });
              }} 
              onEdit={(item: any) => setEditingPersonnel(item)} 
              onBack={() => setActiveTab('dashboard')} 
              columns={[
                { header: "บุคลากร", render: (item: any) => (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                      {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300">👤</div>}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-[10px] text-blue-600 font-black uppercase">{item.position}</p>
                    </div>
                  </div>
                )},
                { header: "ฝ่าย/กลุ่มสาระ", render: (item: any) => (
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase">
                    {item.department === 'management' ? 'บริหาร' : 
                     item.department === 'office' ? 'ธุรการ' : 
                     item.department === 'academic' ? 'วิชาการ' : 
                     item.department === 'student' ? 'กิจการนักเรียน' : 
                     item.department === 'general' ? 'ทั่วไป' : 
                     item.department || 'ไม่ระบุ'}
                  </span>
                )}
              ]}
            />}
            {activeTab === 'calendar' && <AdminList 
              title="ปฏิทินกิจกรรม" 
              items={events} 
              onDelete={(id: string) => {
                const item = events.find(e => e.id === id);
                setDeleteConfirm({ isOpen: true, type: 'events', id, title: item?.title || '' });
              }} 
              onAdd={() => {
                setEditingEvent({ id: 'new_' + Date.now(), title: '', description: '', date: new Date().toISOString().split('T')[0], type: 'activity' });
              }} 
              onEdit={(item: any) => setEditingEvent(item)} 
              onBack={() => setActiveTab('dashboard')} 
              columns={[
                { header: "กิจกรรม", render: (item: any) => (
                  <div>
                    <p className="font-bold text-slate-800">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${item.type === 'academic' ? 'bg-blue-500' : item.type === 'holiday' ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{item.type}</span>
                    </div>
                  </div>
                )},
                { header: "วันที่", render: (item: any) => <span className="text-xs font-bold text-slate-500">{formatThaiDate(item.date)}</span> }
              ]}
            />}
            {activeTab === 'menus' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                    </button>
                    <h3 className="font-bold text-slate-800 text-lg">จัดการเมนูหลัก:</h3>
                  </div>
                  <button 
                    onClick={() => setEditingMenu({ id: 'new_' + Date.now(), label: '', path: '', isActive: true, type: 'link' })} 
                    className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    เพิ่มเมนูใหม่ +
                  </button>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest w-24 text-center">ลำดับ</th>
                          <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest w-24 text-center">แสดง</th>
                          <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">ชื่อเมนู</th>
                          <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">จัดการ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {bufferedMenus.map((menu, index) => {
                          const isLocked = menu.isDefault;
                          
                          return (
                            <tr key={menu.id} className="hover:bg-slate-50/50 group">
                              <td className="p-6 text-center">
                                <div className="flex flex-col items-center gap-1">
                                  <button 
                                    disabled={index === 0}
                                    onClick={() => {
                                      const newMenus = [...bufferedMenus];
                                      [newMenus[index - 1], newMenus[index]] = [newMenus[index], newMenus[index - 1]];
                                      setBufferedMenus(newMenus);
                                    }}
                                    className="text-slate-300 hover:text-blue-600 disabled:opacity-0 transition-colors"
                                    title="เลื่อนขึ้น"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" /></svg>
                                  </button>
                                  <span className="text-xs font-bold text-slate-400">{index + 1}</span>
                                  <button 
                                    disabled={index === bufferedMenus.length - 1}
                                    onClick={() => {
                                      const newMenus = [...bufferedMenus];
                                      [newMenus[index + 1], newMenus[index]] = [newMenus[index], newMenus[index + 1]];
                                      setBufferedMenus(newMenus);
                                    }}
                                    className="text-slate-300 hover:text-blue-600 disabled:opacity-0 transition-colors"
                                    title="เลื่อนลง"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                                  </button>
                                </div>
                              </td>
                              <td className="p-6 text-center">
                                <button 
                                  disabled={isLocked && menu.label === 'หน้าแรก'}
                                  onClick={() => {
                                    setBufferedMenus(bufferedMenus.map(m => m.id === menu.id ? { ...m, isActive: !m.isActive } : m));
                                  }}
                                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${menu.isActive ? 'bg-emerald-500' : 'bg-slate-200'} ${(isLocked && menu.label === 'หน้าแรก') ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${menu.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                              </td>
                              <td className="p-6">
                                <div>
                                  <p className="font-bold text-slate-800 text-base">{menu.label}</p>
                                  <p className="text-xs text-slate-400">{menu.path}</p>
                                  {isLocked && <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mt-1 block">เมนูระบบ (ล็อกการลบ)</span>}
                                </div>
                              </td>
                              <td className="p-6 text-right">
                                <div className="flex justify-end gap-2">
                                  <button onClick={() => setEditingMenu(menu)} className="w-9 h-9 flex items-center justify-center bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-800 hover:text-white transition-colors" title="แก้ไข">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.341.886l-3.154 1.262a.5.5 0 01-.65-.65z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" /></svg>
                                  </button>
                                  {!isLocked ? (
                                    <button onClick={() => setDeleteConfirm({ isOpen: true, type: 'menu', id: menu.id, title: menu.label })} className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="ลบ">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75V4H5a2 2 0 00-2 2v.25a.75.75 0 00.75.75h12.5a.75.75 0 00.75-.75V6a2 2 0 00-2-2h-1v-.25A2.75 2.75 0 0011.25 1h-2.5zM8 4h4v-.25a1.25 1.25 0 00-1.25-1.25h-1.5A1.25 1.25 0 008 3.75V4zm1.25 4a.75.75 0 00-.75.75v6.5a.75.75 0 001.5 0v-6.5a.75.75 0 00-.75-.75zM12.75 8a.75.75 0 00-.75.75v6.5a.75.75 0 001.5 0v-6.5a.75.75 0 00-.75-.75z" clipRule="evenodd" /><path d="M4.318 8.5h11.364l-.557 8.355A2.75 2.75 0 0112.4 19.5H7.6a2.75 2.75 0 01-2.725-2.645L4.318 8.5z" /></svg>
                                    </button>
                                  ) : (
                                    <div className="w-9 h-9 flex items-center justify-center bg-slate-50 text-slate-300 rounded-lg cursor-not-allowed" title="เมนูนี้ถูกล็อกโดยระบบ ห้ามลบ">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-center pt-6">
                  <SaveButton onClick={handleSave} isSaving={isSaving} label="บันทึกการเปลี่ยนแปลงทั้งหมด" />
                </div>
              </div>
            )}
            {activeTab === 'slides' && <AdminList 
              title="ภาพสไลด์หน้าแรก" 
              items={bufferedConfig.slides || []} 
              onDelete={(id: string) => {
                const item = (bufferedConfig.slides || []).find(s => s.id === id);
                setDeleteConfirm({ isOpen: true, type: 'slide', id, title: item?.title || 'ภาพสไลด์' });
              }} 
              onAdd={() => {
                setEditingSlide({ id: 'new_' + Date.now(), image: '', title: '', description: '' });
              }} 
              onEdit={(slide: any) => setEditingSlide(slide)} 
              onBack={() => setActiveTab('dashboard')} 
              columns={[
                { header: "ภาพสไลด์", render: (item: any) => (
                  <img src={item.image} className="w-16 h-10 object-cover rounded-lg shadow-sm" />
                ) },
                { header: "หัวข้อ", key: "title", render: (item: any) => <p className="font-bold text-slate-800">{item.title}</p> },
                { header: "คำอธิบาย", key: "description", render: (item: any) => <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p> }
              ]}
            />}
            

            {securityPrompt.isOpen && (
              <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">ยืนยันตัวตนผู้ดูแลระบบสูงสุด</h3>
                  <p className="text-slate-500 text-center mb-6 text-sm">กรุณากรอกรหัสผ่านเพื่อดำเนินการต่อ</p>
                  <input 
                    type="password" 
                    autoComplete="new-password"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-center text-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner mb-6"
                    placeholder="รหัสผ่าน"
                    value={securityPrompt.inputPassword}
                    onChange={e => setSecurityPrompt({ ...securityPrompt, inputPassword: e.target.value })}
                    onKeyDown={e => e.key === 'Enter' && handleSecurityCheck()}
                    autoFocus
                  />
                  <div className="flex gap-4">
                    <button onClick={() => setSecurityPrompt({ ...securityPrompt, isOpen: false })} className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-colors">ยกเลิก</button>
                    <button onClick={handleSecurityCheck} className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">ยืนยัน</button>
                  </div>
                </div>
              </div>
            )}

            {deleteConfirm && deleteConfirm.isOpen && (
              <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
                <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5 0v8.5a.75.75 0 001.5 0v-8.5zm3.492 0a.75.75 0 10-1.5 0v8.5a.75.75 0 001.5 0v-8.5z" clipRule="evenodd" /></svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 text-center">ยืนยันการลบข้อมูล?</h3>
                  <p className="text-slate-500 text-center mb-8 text-sm leading-relaxed">
                    คุณแน่ใจหรือไม่ว่าต้องการลบ <span className="font-bold text-slate-800">"{deleteConfirm.title}"</span>? <br/>
                    การดำเนินการนี้ไม่สามารถย้อนกลับได้
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">ยกเลิก</button>
                    <button onClick={processDelete} className="flex-1 py-4 rounded-2xl bg-red-600 text-white font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-500/20">ยืนยันการลบ</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <style>{`.custom-scroll::-webkit-scrollbar { width: 4px; } .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }`}</style>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all group ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
    <div className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110 opacity-80 group-hover:opacity-100">{icon}</div>
    <span className="truncate">{label}</span>
  </button>
);

const DashboardStatCard = ({ label, value, icon, color, onClick }: any) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100"
  };
  
  const iconColors = {
    blue: "bg-blue-600",
    rose: "bg-rose-600",
    amber: "bg-amber-600",
    indigo: "bg-indigo-600",
    emerald: "bg-emerald-600"
  };

  return (
    <button 
      onClick={onClick}
      className={`p-6 rounded-[2rem] border ${colors[color as keyof typeof colors]} shadow-sm flex items-center gap-5 group hover:shadow-xl transition-all duration-500 text-left`}
    >
      <div className={`w-14 h-14 ${iconColors[color as keyof typeof iconColors]} text-white rounded-2xl flex items-center justify-center p-3.5 shadow-lg shadow-current/10 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">{label}</p>
        <p className="text-2xl font-black tracking-tight">{value.toLocaleString()}</p>
      </div>
    </button>
  );
};

const ShortcutCard: React.FC<{ label: string, icon: React.ReactNode, color: string, hoverColor: string, onClick: () => void }> = ({ label, icon, color, hoverColor, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-2xl ${color} border border-current/10 flex flex-col items-center justify-center gap-3 transition-all duration-300 group hover:shadow-lg ${hoverColor} hover:text-white hover:-translate-y-1`}
  >
    <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-[11px] font-black uppercase tracking-wider text-center">{label}</span>
  </button>
);

const AdminCard: React.FC<{ title: string, children: React.ReactNode, onBack?: () => void, primaryColor?: string }> = ({ title, children, onBack, primaryColor }) => (
  <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="px-6 sm:px-8 py-5 border-b border-white/5 flex items-center gap-4" style={{ backgroundColor: primaryColor || '#0f172a' }}>
      {onBack && (
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
      )}
      <div className="text-white font-bold uppercase tracking-wider text-base">{title}</div>
    </div>
    <div className="p-6 sm:p-10">{children}</div>
  </div>
);

const Modal: React.FC<{ isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
         <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-10 shrink-0">
            <h3 className="font-bold text-lg text-slate-800">{title}</h3>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
         </div>
         <div className="p-6 sm:p-8">
            {children}
         </div>
      </div>
    </div>
  );
};

const InputGroup: React.FC<{ 
  label: string, 
  value: string, 
  onChange?: (v: string) => void, 
  isTextArea?: boolean, 
  type?: string, 
  readOnly?: boolean,
  showThaiDate?: boolean
}> = ({ label, value, onChange, isTextArea, type = "text", readOnly = false, showThaiDate = false }) => {
  // Helper to format date for display if it's a date string
  const getThaiDisplayDate = (val: string) => {
    if (!val) return '';
    try {
      // If it's YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
        const [y, m, d] = val.split('-');
        const months = [
          'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
          'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        return `${parseInt(d)} ${months[parseInt(m) - 1]} ${parseInt(y) + 543}`;
      }
    } catch (e) {
      return '';
    }
    return '';
  };

  const thaiDate = showThaiDate ? getThaiDisplayDate(value) : '';

  return (
    <div className="space-y-1 w-full relative">
      <div className="flex justify-between items-end">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-0.5 block">{label}</label>
        {thaiDate && <span className="text-[10px] font-bold text-blue-600 mb-0.5 mr-1">{thaiDate}</span>}
      </div>
      {isTextArea ? (
        <textarea rows={4} value={value} readOnly={readOnly} onChange={e => onChange && onChange(e.target.value)} className={`w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner ${readOnly ? 'opacity-70 cursor-not-allowed bg-slate-100' : ''}`} />
      ) : (
        <input 
          type={type} 
          value={value} 
          readOnly={readOnly} 
          autoComplete="off" 
          onChange={e => onChange && onChange(e.target.value)} 
          className={`w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner ${readOnly ? 'opacity-70 cursor-not-allowed bg-slate-100' : ''} ${type === 'date' ? 'cursor-pointer' : ''}`} 
        />
      )}
    </div>
  );
};

const ColorInput: React.FC<{
  label: string,
  value: string,
  onChange: (v: string) => void,
  helpText?: string
}> = ({ label, value, onChange, helpText }) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative overflow-hidden rounded-xl w-16 h-16 shrink-0 border-2 border-slate-100 shadow-inner">
          <input 
            type="color" 
            value={value || '#ffffff'} 
            onChange={e => onChange(e.target.value)}
            className="absolute -inset-4 w-32 h-32 cursor-pointer"
          />
        </div>
        <div className="flex-grow">
          <input 
            type="text" 
            value={value || '#ffffff'} 
            onChange={e => onChange(e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value)}
            className="w-full bg-transparent border-none font-bold text-slate-700 focus:ring-0 p-0 uppercase"
            placeholder="#ffffff"
          />
          <p className="text-xs text-slate-400">{helpText || 'คลิกที่กล่องสีหรือพิมพ์รหัสสีเพื่อเปลี่ยนแปลง'}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
