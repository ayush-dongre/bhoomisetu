import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { USERS, ROLE_PERMISSIONS, findUserByEmail } from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bhoomisetu_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [otpStep, setOtpStep] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) localStorage.setItem('bhoomisetu_user', JSON.stringify(user));
    else localStorage.removeItem('bhoomisetu_user');
  }, [user]);

  // Session timeout: 30 min inactivity simulation
  useEffect(() => {
    if (!user) return;
    let timer = setTimeout(() => {
      setUser(null);
    }, 30 * 60 * 1000);
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setUser(null), 30 * 60 * 1000);
    };
    window.addEventListener('mousemove', reset);
    window.addEventListener('keydown', reset);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', reset);
      window.removeEventListener('keydown', reset);
    };
  }, [user]);

  const login = useCallback((email, password) => {
    setError('');
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters.');
      return false;
    }
    const found = findUserByEmail(email);
    if (!found) {
      setError('No officer account found with this email. Try one of the demo accounts.');
      return false;
    }
    setPendingUser(found);
    setOtpStep(true);
    return true;
  }, []);

  const verifyOtp = useCallback((otp) => {
    if (otp === '123456' || otp.length === 6) {
      setUser(pendingUser);
      setOtpStep(false);
      setPendingUser(null);
      return true;
    }
    setError('Invalid OTP. Use 123456 for this demo.');
    return false;
  }, [pendingUser]);

  const loginAsRole = useCallback((role) => {
    const found = USERS.find((u) => u.role === role);
    if (found) {
      setUser(found);
      setOtpStep(false);
      setPendingUser(null);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const permissions = user ? ROLE_PERMISSIONS[user.role] : ROLE_PERMISSIONS['Citizen'];

  return (
    <AuthContext.Provider value={{ user, login, verifyOtp, loginAsRole, logout, otpStep, error, permissions }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
