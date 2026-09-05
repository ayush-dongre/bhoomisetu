import { Loader2 } from 'lucide-react';

export function Spinner({ size = 20, className = '' }) {
  return <Loader2 size={size} className={`animate-spin text-navy-600 ${className}`} />;
}

export default function Loading({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-500">
      <Spinner size={28} />
      <span className="text-sm">{label}</span>
    </div>
  );
}
