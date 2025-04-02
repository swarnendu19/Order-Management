
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Package, ShoppingCart, Settings, Menu, X } from 'lucide-react';

interface SidebarNavProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const SidebarNav = ({ open, setOpen }: SidebarNavProps) => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transition-transform duration-300 ease-in-out transform lg:relative lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-xl font-semibold text-sidebar-foreground">OrderAdmin</span>
            </Link>
            <button 
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Sidebar content */}
          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sidebar-foreground rounded-md transition-colors",
                    location.pathname === item.href
                      ? "bg-sidebar-accent text-white font-medium"
                      : "hover:bg-sidebar-accent/50"
                  )}
                  onClick={() => window.innerWidth < 1024 && setOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Sidebar footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
                <span className="text-sm font-medium">AD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
                <p className="text-xs text-sidebar-foreground/70">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
