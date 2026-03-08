
import React, { useState, useEffect } from 'react';

interface LoginViewProps {
  onLogin: (user: string, pass: string) => Promise<boolean>;
}

const Login: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('remembered_admin');
      if (savedUser) {
        setUsername(savedUser);
        setRememberMe(true);
      }
    } catch (e) {
      // ป้องกัน Error หาก Browser ปิดกั้น LocalStorage
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setError(false);
    
    try {
      const success = await onLogin(username, password);
      if (success) {
        if (rememberMe) {
          localStorage.setItem('remembered_admin', username);
        } else {
          localStorage.removeItem('remembered_admin');
        }
      } else {
        setError(true);
        setIsAnimating(false);
        const form = document.getElementById('login-card');
        form?.classList.add('animate-shake');
        setTimeout(() => form?.classList.remove('animate-shake'), 500);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(true);
      setIsAnimating(false);
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setError(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-kanit">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <img 
          src="https://images.unsplash.com/photo-1523050853064-814041697262?q=80&w=2070" 
          className="w-full h-full object-cover opacity-10 grayscale" 
          alt="" 
        />
      </div>
      
      <div 
        id="login-card"
        className="w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 animate-in fade-in zoom-in duration-500"
      >
        <div className="bg-slate-900 pt-12 pb-10 px-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl shadow-blue-500/20 rotate-3 transition-transform hover:rotate-0 cursor-default">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 5.25a3.75 3.75 0 117.5 0v3h-7.5v-3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tight">ADMIN PORTAL</h1>
          <p className="text-slate-400 text-[11px] mt-2 uppercase tracking-[0.3em] font-bold">Wat Samakkhi Tham School</p>
        </div>
        
        <div className="p-10 space-y-7 bg-white">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-[13px] font-bold rounded-2xl border border-red-100 flex items-center gap-3 animate-in slide-in-from-top-2">
              <span className="text-xl">⚠️</span>
              <div>
                <p>ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง</p>
                <p className="text-[10px] opacity-70 font-medium">กรุณาตรวจสอบ Username และ Password อีกครั้ง</p>
              </div>
            </div>
          )}
          
          <div className="space-y-5">
            <div className="group">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-blue-600 transition-colors">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>
                </span>
                <input 
                  type="text" 
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(false); }}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit(e as any)}
                  placeholder="ชื่อผู้ใช้งาน" 
                  autoComplete="off"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium transition-all shadow-inner" 
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-blue-600 transition-colors">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 5.25a3.75 3.75 0 117.5 0v3h-7.5v-3z" clipRule="evenodd" /></svg>
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(false); }}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit(e as any)}
                  placeholder="รหัสผ่าน" 
                  autoComplete="off"
                  className="w-full pl-12 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none text-sm font-medium transition-all shadow-inner" 
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" /><path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.244A3.75 3.75 0 0115.75 12zM5.477 12.29l-2.79-2.79a9.927 9.927 0 00-1.364 1.947 1.762 1.762 0 000 1.113c1.487 4.471 5.705 7.697 10.677 7.697 1.55 0 3.012-.315 4.343-.882l-3.322-3.322a5.25 5.25 0 01-7.543-3.76z" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="peer sr-only" 
                />
                <div className="w-5 h-5 border-2 border-slate-200 rounded-md bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-slate-800 transition-colors">จดจำฉันไว้</span>
            </label>
            <button 
              type="button"
              onClick={handleReset}
              className="text-[12px] font-bold text-slate-400 uppercase tracking-wide hover:text-red-500 transition-colors"
            >
              ล้างข้อมูล
            </button>
          </div>

          <button 
            type="button" 
            onClick={handleSubmit}
            disabled={isAnimating}
            className={`w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[15px] uppercase tracking-[0.2em] shadow-2xl transition-all relative overflow-hidden group
              ${isAnimating ? 'opacity-90 cursor-wait' : 'hover:bg-blue-600 hover:shadow-blue-500/20 active:scale-95'}
            `}
          >
            {isAnimating ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังเข้าสู่ระบบ...
              </span>
            ) : (
              "เข้าสู่ระบบ"
            )}
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
          
          <div className="text-center pt-2">
            <a 
              href="#/" 
              onClick={(e) => {
                // Ensure navigation happens even if browser behavior varies
                window.location.hash = '#/';
              }}
              className="text-slate-400 text-[11px] font-black uppercase tracking-widest hover:text-blue-600 transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
              กลับหน้าหลักเว็บไซต์
            </a>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
          .animate-shake {
            animation: shake 0.2s ease-in-out 0s 2;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
