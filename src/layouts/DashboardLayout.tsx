
import React, { useState } from 'react';
import { SidebarNav } from '../components/SidebarNav';
import { TopBar } from '../components/TopBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarNav open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <TopBar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};
