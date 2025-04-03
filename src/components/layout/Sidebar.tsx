
import React from 'react';
import { Users, Package, ShoppingCart, Home, X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/',
      active: currentPath === '/'
    },
    {
      title: 'Customers',
      icon: <Users className="w-5 h-5" />,
      path: '/customers',
      active: currentPath.includes('/customers')
    },
    {
      title: 'Products',
      icon: <Package className="w-5 h-5" />,
      path: '/products',
      active: currentPath.includes('/products')
    },
    {
      title: 'Orders',
      icon: <ShoppingCart className="w-5 h-5" />,
      path: '/orders',
      active: currentPath.includes('/orders')
    }
  ];

  // For mobile, render a slide-out drawer
  if (isMobile) {
    return (
      <>
        {/* Overlay when sidebar is open on mobile */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile Sidebar */}
        <div className={`fixed inset-y-0 left-0 transform z-30 w-64 bg-blue-800 text-white transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center p-4 border-b border-blue-700">
            <h1 className="text-xl font-bold">Order Management</h1>
            <button 
              onClick={toggleSidebar}
              className="text-white hover:text-gray-200"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="mt-5">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-5 py-3 transition-colors ${
                      item.active
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-700'
                    }`}
                    onClick={isMobile ? toggleSidebar : undefined}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    );
  }

  // For desktop, render a fixed sidebar
  return (
    <div className={`bg-blue-800 text-white hidden md:block h-full w-64 fixed left-0 top-0 overflow-y-auto z-10 transition-all duration-300`}>
      <div className="p-5 border-b border-blue-700">
        <h1 className="text-xl font-bold">Order Management</h1>
      </div>
      <nav className="mt-5">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center px-5 py-3 transition-colors ${
                  item.active
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
