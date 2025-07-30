import { useState } from 'react';
import { useLocation } from 'wouter';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'home', path: '/', icon: 'fas fa-home', label: 'Home' },
  { id: 'explorer', path: '/explorer', icon: 'fas fa-search', label: 'Explorer' },
  { id: 'simulator', path: '/simulator', icon: 'fas fa-calculator', label: 'Simulator' },
  { id: 'generator', path: '/generator', icon: 'fas fa-file-alt', label: 'Generator' },
  { id: 'knowledge', path: '/knowledge', icon: 'fas fa-brain', label: 'Knowledge' }
];

export function Navigation() {
  const [location, setLocation] = useLocation();
  
  return (
    <nav className="fixed left-0 top-0 h-full w-20 glass-effect z-50 flex flex-col items-center py-6 space-y-8">
      {/* Logo */}
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center animate-pulse-slow">
        <i className="fas fa-atom text-white text-xl"></i>
      </div>
      
      {/* Navigation Items */}
      <div className="flex flex-col space-y-6">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setLocation(item.path)}
            className={cn(
              "w-12 h-12 rounded-xl glass-effect flex items-center justify-center transition-all duration-300 group relative",
              location === item.path ? "bg-blue-500" : "hover:bg-blue-500/50"
            )}
            title={item.label}
          >
            <i className={`${item.icon} text-lg`}></i>
            
            {/* Tooltip */}
            <div className="absolute left-16 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {item.label}
            </div>
          </button>
        ))}
      </div>
      
      {/* Settings */}
      <div className="mt-auto">
        <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center hover:bg-gray-600/50 transition-colors duration-300 cursor-pointer">
          <i className="fas fa-cog text-lg"></i>
        </div>
      </div>
    </nav>
  );
}
