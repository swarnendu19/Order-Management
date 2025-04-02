
import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

interface TopBarProps {
  toggleSidebar: () => void;
}

export const TopBar = ({ toggleSidebar }: TopBarProps) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-500 rounded-md lg:hidden hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Center: Search */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border-transparent rounded-md focus:border-gray-300 focus:ring-0 focus:bg-white"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-500 rounded-md hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">AD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
