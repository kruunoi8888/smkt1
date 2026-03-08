import React from 'react';
import { WidgetItem, MenuItem, ShortcutItem } from '@/types';

const WidgetRenderer: React.FC<{ position: string, widgets?: WidgetItem[], menus?: MenuItem[], bodyTextColor?: string }> = ({ position, widgets, menus, bodyTextColor }) => {
  if (!widgets) return null;
  const activeWidgets = widgets.filter(w => w.isActive && w.position === position);
  if (activeWidgets.length === 0) return null;

  return (
    <div className={`w-full flex flex-col gap-4 ${position === 'banner' ? '-mt-10 relative z-20 mb-2' : 'my-4'}`}>
      {activeWidgets.map(widget => {
        // Prepare shortcuts: combine widget shortcuts
        let allShortcuts: ShortcutItem[] = [...(widget.shortcuts || [])];
        
        return (
          <div key={widget.id} className="container mx-auto px-4">
            <div className={`rounded-[2rem] overflow-hidden ${position === 'banner' ? 'bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50 p-6 md:p-8' : 'bg-white shadow-xl border border-slate-100 p-6 md:p-8'}`}>
              {widget.title && widget.showTitle !== false && (
                <h3 className="text-xl font-black font-kanit uppercase tracking-tight mb-6 flex items-center gap-3" style={{ color: bodyTextColor || '#1e293b' }}>
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  {widget.title}
                </h3>
              )}
              
              {widget.type === 'shortcut' && allShortcuts.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                  {allShortcuts.filter(s => s.isActive).map(shortcut => (
                    <a 
                      key={shortcut.id} 
                      href={shortcut.type === 'page' ? `#/page/shortcut/${shortcut.id.replace('menu_sc_', '')}` : shortcut.url} 
                      target={shortcut.type === 'page' ? undefined : "_blank"} 
                      rel={shortcut.type === 'page' ? undefined : "noopener noreferrer"}
                      className="flex flex-col items-center gap-3 group w-[100px] md:w-[120px]"
                    >
                      <div 
                        className="w-20 h-20 md:w-24 md:h-24 rounded-3xl border shadow-sm flex items-center justify-center p-3 group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden relative"
                        style={{ backgroundColor: shortcut.bgColor || '#ffffff', borderColor: '#e2e8f0' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-full h-full rounded-2xl flex items-center justify-center relative z-10">
                           {shortcut.image ? (
                             <img src={shortcut.image || null} alt={shortcut.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                           ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-300 group-hover:text-blue-400 transition-colors duration-300"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                           )}
                        </div>
                      </div>
                      <span 
                        className="text-[11px] md:text-xs font-bold text-center group-hover:opacity-80 transition-all duration-300 line-clamp-2 leading-snug px-1 uppercase tracking-wider"
                        style={{ color: shortcut.textColor || '#475569' }}
                      >
                        {shortcut.title}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {(widget.type === 'iframe' || widget.type === 'html') && widget.content && (
                <div className="w-full overflow-hidden rounded-xl widget-content-container flex justify-center" dangerouslySetInnerHTML={{ __html: widget.content }} />
              )}

              {widget.type === 'custom' && widget.content && (
                <div 
                  className="w-full font-kanit rich-text-content" 
                  dangerouslySetInnerHTML={{ __html: widget.content }} 
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WidgetRenderer;
