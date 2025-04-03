
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className={`${isMobile ? 'block' : 'hidden'} md:hidden`}>
        <Header isMobile={true} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className={`flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-0 md:ml-64'}`}>
          <div className="hidden md:block">
            <Header isMobile={false} toggleSidebar={toggleSidebar} />
          </div>
          <main className="p-4 md:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
