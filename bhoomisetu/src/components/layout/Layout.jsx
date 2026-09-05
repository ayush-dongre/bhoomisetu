import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';
import Breadcrumbs from './Breadcrumbs';
import Toasts from '../common/Toasts';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <MobileNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Sidebar open={sidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
      <Toasts />
    </div>
  );
}
