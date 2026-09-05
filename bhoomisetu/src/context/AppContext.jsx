import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ALERTS as INITIAL_ALERTS } from '../data/alerts';

const AppContext = createContext(null);

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'mr', label: 'मराठी' },
];

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [highContrast, setHighContrast] = useState(false);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [toasts, setToasts] = useState([]);
  const [online, setOnline] = useState(true);

  const unreadCount = useMemo(() => alerts.filter((a) => !a.read).length, [alerts]);

  const markAlertRead = useCallback((id) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  }, []);

  const markAllRead = useCallback(() => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  }, []);

  const pushToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        language, setLanguage, LANGUAGES,
        highContrast, setHighContrast,
        alerts, unreadCount, markAlertRead, markAllRead,
        toasts, pushToast, dismissToast,
        online, setOnline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
