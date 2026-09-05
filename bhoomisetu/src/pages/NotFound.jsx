import { Link } from 'react-router-dom';
import { MapPinOff } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <MapPinOff size={48} className="text-gray-300 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800">404 — Page Not Found</h1>
      <p className="text-sm text-gray-400 mt-1 mb-5">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/"><Button>Back to Dashboard</Button></Link>
    </div>
  );
}
