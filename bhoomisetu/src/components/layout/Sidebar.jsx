import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Map, FolderKanban, LandPlot, IndianRupee, FileText,
  BarChart3, Bell, FileBarChart, User, Settings, Landmark,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/map', label: 'National Map', icon: Map },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/parcels', label: 'Land Parcels', icon: LandPlot },
  { to: '/compensation', label: 'Compensation', icon: IndianRupee },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
];

export default function Sidebar({ open }) {
  return (
    <aside className={`fixed lg:static z-40 top-0 left-0 h-full w-64 bg-navy-900 text-white flex flex-col transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-saffron-600 flex items-center justify-center shrink-0">
          <Landmark size={18} />
        </div>
        <div>
          <p className="font-bold leading-tight">BHOOMISETU</p>
          <p className="text-[11px] text-navy-100/70 leading-tight">National Land Acquisition System</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-white/10 text-white font-medium' : 'text-navy-100/80 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-2 py-3 border-t border-white/10 space-y-1">
        <NavLink to="/profile" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${isActive ? 'bg-white/10 text-white' : 'text-navy-100/80 hover:bg-white/5'}`}>
          <User size={17} /> Profile
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${isActive ? 'bg-white/10 text-white' : 'text-navy-100/80 hover:bg-white/5'}`}>
          <Settings size={17} /> Settings
        </NavLink>
      </div>
      <div className="px-4 py-3 text-[10px] text-navy-100/50 border-t border-white/10">
        Smart India Hackathon 2026 · Digital India Compliant
      </div>
    </aside>
  );
}
