import React from 'react';
import { Home, Calendar, User, LogOut } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  userName: string;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  userName 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'sessions', label: 'Sessions', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-[#231f1e] border-b border-[#3a342f]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div>
            <h1 className="text-xl font-bold text-white hidden sm:block">HQ Recovery</h1>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    activeTab === item.id
                      ? 'bg-[#d8ba5b] text-[#231f1e]'
                      : 'text-gray-300 hover:text-white hover:bg-[#2a2520]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">{item.label}</span>
                </button>
              );
            })}
            
            <div className="w-px h-6 bg-[#3a342f] mx-2"></div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-red-300 hover:bg-[#2a2520] rounded-lg transition-all duration-200 font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};