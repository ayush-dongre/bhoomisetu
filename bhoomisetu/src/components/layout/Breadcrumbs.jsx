import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const LABELS = {
  '': 'Dashboard', map: 'National Map', projects: 'Projects', parcels: 'Land Parcels',
  compensation: 'Compensation', documents: 'Documents', analytics: 'Analytics',
  alerts: 'Alerts', reports: 'Reports', profile: 'Profile', settings: 'Settings', help: 'Help & Support',
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4 flex-wrap">
      <Link to="/" className="flex items-center gap-1 hover:text-navy-600">
        <Home size={14} /> Home
      </Link>
      {parts.map((part, i) => {
        const path = '/' + parts.slice(0, i + 1).join('/');
        const isLast = i === parts.length - 1;
        const label = LABELS[part] || part;
        return (
          <span key={path} className="flex items-center gap-1.5">
            <ChevronRight size={13} />
            {isLast ? <span className="text-gray-700 font-medium">{label}</span> : <Link to={path} className="hover:text-navy-600">{label}</Link>}
          </span>
        );
      })}
    </div>
  );
}
