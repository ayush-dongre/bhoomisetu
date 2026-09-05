import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import { ROLES, USERS } from '../data/users';

export default function Login() {
  const { login, verifyOtp, loginAsRole, otpStep, error, user } = useAuth();
  const { pushToast } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate('/');
    return null;
  }

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
    if (verifyOtp(otp)) {
      pushToast('Login successful. Welcome to BHOOMISETU.', 'success');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-navy-900 px-8 py-6 text-white text-center">
          <div className="w-14 h-14 mx-auto rounded-xl bg-saffron-600 flex items-center justify-center mb-3">
            <Landmark size={26} />
          </div>
          <h1 className="text-xl font-bold">BHOOMISETU</h1>
          <p className="text-xs text-navy-100/70 mt-1">National Land Acquisition & Management System</p>
        </div>

        <div className="p-8">
          {!otpStep ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-semibold text-gray-800 mb-1">Officer Login</h2>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Officer Email</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@gov.in"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Password</label>
                <input
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                />
              </div>
              {error && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                {loading ? 'Verifying...' : 'Continue'}
              </Button>
              <p className="text-xs text-gray-400 text-center">Forgot password? Contact your District Nodal Officer.</p>
            </form>
          ) : (
            <form onSubmit={handleOtp} className="space-y-4">
              <h2 className="font-semibold text-gray-800 mb-1">Two-Factor Verification</h2>
              <p className="text-xs text-gray-500">Enter the 6-digit OTP sent to your registered mobile. (Demo OTP: 123456)</p>
              <input
                type="text" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm tracking-[0.3em] text-center focus:outline-none focus:ring-2 focus:ring-navy-500"
              />
              {error && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
              <Button type="submit" className="w-full">Verify & Login</Button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Quick demo login as:</p>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => { loginAsRole(role); pushToast(`Signed in as ${role}`, 'success'); navigate('/'); }}
                  className="text-xs px-2.5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-navy-300 hover:text-navy-600 hover:bg-navy-50 text-left"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
