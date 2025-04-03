
import React from 'react';
import { Bell, User, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Header = ({ isMobile, toggleSidebar }: HeaderProps) => {
  return (
    <header className={`bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6 ${isMobile ? 'w-full' : 'ml-0 md:ml-64'}`}>
      <div className="flex items-center">
        {isMobile && (
          <button 
            onClick={toggleSidebar} 
            className="mr-3 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
          Order Management System
        </h2>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="text-gray-500 hover:text-gray-700 p-1">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-gray-700 p-1 hidden sm:block">
          <Settings className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin User</span>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
