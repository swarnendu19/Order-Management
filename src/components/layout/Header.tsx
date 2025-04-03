import React, { useState } from 'react';
import { Bell, User, Settings, Menu, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Header = ({ isMobile, toggleSidebar }: HeaderProps) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <header className={`bg-gray-900/80 backdrop-blur-lg border-b border-blue-500/20 h-16 flex items-center justify-between px-4 md:px-6 shadow-lg shadow-blue-900/10 ${isMobile ? 'w-full' : 'ml-0 md:ml-64'}`}>
      <div className="flex items-center">
        {isMobile && (
          <button 
            onClick={toggleSidebar} 
            className="mr-3 text-blue-400 hover:text-blue-300 focus:outline-none transition-colors group"
            aria-label="Toggle sidebar"
          >
            <div className="bg-blue-500/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition-all">
              <Menu className="w-5 h-5" />
            </div>
          </button>
        )}
        <h2 className="text-lg md:text-xl font-semibold text-white truncate flex items-center">
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold">
            Order Management System
          </span>
          <Sparkles className="w-5 h-5 text-blue-400 ml-2 animate-pulse" />
        </h2>
      </div>
      
      <div className="hidden md:flex items-center relative rounded-lg overflow-hidden">
        <Search className={`absolute left-3 w-4 h-4 ${focused ? 'text-blue-400' : 'text-gray-400'} transition-colors`} />
        <input 
          type="text" 
          placeholder="Search..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="bg-gray-800/70 border border-blue-900/40 text-gray-200 pl-10 pr-4 py-2 w-56 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 focus:w-72"
        />
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="text-gray-300 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-900/30 relative group">
          <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          <Bell className="w-5 h-5" />
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-blue-900 text-blue-100 text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100">Notifications</span>
        </button>
        
        <button className="text-gray-300 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-900/30 hidden sm:block relative group">
          <Settings className="w-5 h-5" />
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-blue-900 text-blue-100 text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100">Settings</span>
        </button>
        
        <div className="flex items-center space-x-3 border-l border-blue-900/30 pl-3 md:pl-4">
          <span className="text-sm font-medium text-gray-300 hidden sm:inline">Admin User</span>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 transition-all cursor-pointer hover:scale-105">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;