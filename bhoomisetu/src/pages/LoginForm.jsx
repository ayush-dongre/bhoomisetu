import { useState } from 'react';
import {
  Mail,
  Lock,
  ShieldCheck,
  Loader2,
  ArrowRight,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { ROLES } from '../data/users';
import Button from '../components/common/Button';

export default function LoginForm() {
  const { login, verifyOtp, loginAsRole, otpStep, error } = useAuth();
  const { pushToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
    }, 500);
  };

  const handleOtp = (e) => {
    e.preventDefault();
    const success = verifyOtp(otp);
    if (success) {
      pushToast('Login successful. Welcome to BHOOMISETU.', 'success');
    }
  };

  return (
    <>
      {!otpStep ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-[17px] font-semibold text-[#37352f]">Sign in</h2>
            <p className="text-sm text-[#787774] mt-1">Access your BHOOMISETU workspace</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-[#5f5e5b] mb-1.5">Government email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b9a97]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@gov.in"
                className="w-full pl-10 pr-3 py-2.5 rounded-md border border-[#d9d9d6] bg-white text-sm text-[#37352f] placeholder:text-[#b4b4b0] outline-none transition focus:border-[#37352f] focus:ring-1 focus:ring-[#37352f]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-[#5f5e5b] mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b9a97]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-2.5 rounded-md border border-[#d9d9d6] bg-white text-sm text-[#37352f] placeholder:text-[#b4b4b0] outline-none transition focus:border-[#37352f] focus:ring-1 focus:ring-[#37352f]"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-xs text-[#b42318] bg-[#fff4f2] border border-[#fecdca] rounded-md px-3 py-2.5">
              {error}
            </div>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full !bg-[#37352f] !text-white rounded-md font-medium shadow-none hover:!bg-[#2f2e2b] transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <ShieldCheck size={15} />
                Continue
                <ArrowRight size={14} />
              </>
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtp} className="space-y-5">
          {/* OTP Heading */}
          <div className="mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#f1f1ef] flex items-center justify-center mb-3">
              <ShieldCheck size={18} className="text-[#37352f]" />
            </div>
            <h2 className="text-[17px] font-semibold text-[#37352f]">Verify your identity</h2>
            <p className="text-sm text-[#787774] mt-1 leading-5">
              Enter the 6-digit verification code sent to your registered mobile number.
            </p>
          </div>

          {/* OTP */}
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="w-full px-3 py-3 border border-[#d9d9d6] rounded-md text-lg tracking-[0.35em] text-center bg-white text-[#37352f] placeholder:text-[#c7c7c3] outline-none focus:border-[#37352f] focus:ring-1 focus:ring-[#37352f] transition"
          />

          {/* Demo OTP */}
          <div className="rounded-md bg-[#f7f7f5] border border-[#e9e9e7] px-3 py-2.5">
            <p className="text-xs text-[#787774]">Demo OTP</p>
            <p className="text-sm font-medium text-[#37352f] mt-0.5 tracking-wider">123456</p>
          </div>

          {/* Error */}
          {error && (
            <div className="text-xs text-[#b42318] bg-[#fff4f2] border border-[#fecdca] rounded-md px-3 py-2.5">
              {error}
            </div>
          )}

          {/* Verify Button */}
          <Button
            type="submit"
            className="w-full !bg-[#37352f] !text-white rounded-md font-medium shadow-none hover:!bg-[#2f2e2b] transition"
          >
            Verify & Login
          </Button>
        </form>
      )}

      {/* Demo Roles */}
      <div className="mt-7 pt-6 border-t border-[#e9e9e7]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-[#5f5e5b]">Demo access</p>
          <span className="text-[10px] uppercase tracking-wider text-[#9b9a97]">Development</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {ROLES.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                loginAsRole(role);
                pushToast(`Signed in as ${role}`, 'success');
              }}
              className="text-xs text-left px-3 py-2.5 rounded-md border border-[#e9e9e7] bg-[#fbfbfa] text-[#5f5e5b] hover:bg-[#f1f1ef] hover:text-[#37352f] hover:border-[#d9d9d6] transition"
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
