import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, ChevronDown, LogOut, Wifi, WifiOff, Globe, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { getStatusStyle } from '../../utils/statusHelper';

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { alerts, unreadCount, markAlertRead, markAllRead, language, setLanguage, LANGUAGES, online, setOnline, pushToast } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
          <Menu size={20} />
        </button>
        <button
          onClick={() => { setOnline((o) => !o); pushToast(online ? 'Switched to offline mode — changes will sync later.' : 'Back online — syncing queued data.', online ? 'warning' : 'success'); }}
          className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          {online ? <Wifi size={13} className="text-green-500" /> : <WifiOff size={13} className="text-red-500" />}
          {online ? 'Online' : 'Offline'}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative" ref={langRef}>
          <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 text-sm text-gray-600">
            <Globe size={16} />
            <span className="hidden sm:inline">{LANGUAGES.find((l) => l.code === language)?.label}</span>
            <ChevronDown size={14} />
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg py-1 animate-fade-in">
              {LANGUAGES.map((l) => (
                <button key={l.code} onClick={() => { setLanguage(l.code); setLangOpen(false); }} className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${language === l.code ? 'text-navy-600 font-medium' : 'text-gray-600'}`}>
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link to="/help" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hidden sm:block">
          <HelpCircle size={18} />
        </Link>

        <div className="relative" ref={notifRef}>
          <button onClick={() => setNotifOpen((v) => !v)} className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-lg animate-fade-in max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-semibold text-sm">Notifications</span>
                <button onClick={markAllRead} className="text-xs text-navy-600 hover:underline">Mark all read</button>
              </div>
              {alerts.slice(0, 8).map((a) => {
                const style = getStatusStyle(a.priority);
                return (
                  <button
                    key={a.id}
                    onClick={() => { markAlertRead(a.id); setNotifOpen(false); navigate('/alerts'); }}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 flex gap-2 ${!a.read ? 'bg-navy-50/40' : ''}`}
                  >
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
                    <span>
                      <p className="text-sm text-gray-800 leading-snug">{a.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.createdAt}</p>
                    </span>
                  </button>
                );
              })}
              <Link to="/alerts" onClick={() => setNotifOpen(false)} className="block text-center text-xs text-navy-600 py-2.5 hover:bg-gray-50">View all alerts</Link>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen((v) => !v)} className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-gray-100">
            <div className="w-8 h-8 rounded-full bg-navy-100 text-navy-700 flex items-center justify-center text-sm font-semibold">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800 leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-400 leading-tight">{user?.role}</p>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-lg shadow-lg py-1 animate-fade-in">
              <Link to="/profile" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">My Profile</Link>
              <Link to="/settings" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Settings</Link>
              <button onClick={() => { logout(); navigate('/login'); }} className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
