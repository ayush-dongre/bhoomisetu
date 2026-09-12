import LoginForm from './LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user } = useAuth();

  // Keep the login route from rendering again after OTP verification (or a refresh
  // with a persisted session). AuthContext updates `user` before this redirect.
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30">
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-6 text-white text-center">
          <div className="w-14 h-14 mx-auto rounded-xl bg-white/20 flex items-center justify-center mb-3 shadow-lg">
            <span className="text-2xl font-bold">🏛️</span>
          </div>
          <h1 className="text-xl font-bold tracking-wide">BHOOMISETU</h1>
          <p className="text-xs text-white/80 mt-1">National Land Acquisition & Management System</p>
        </div>
        <div className="p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
