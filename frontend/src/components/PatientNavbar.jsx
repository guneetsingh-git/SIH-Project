import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Brain, Bell, Image as ImageIcon, HelpCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export default function PatientNavbar() {
  const navItems = [
    { to: '/patient', icon: Home, label: 'Home' },
    { to: '/patient/games', icon: Brain, label: 'Games' },
    { to: '/patient/reminders', icon: Bell, label: 'Reminders' },
    { to: '/patient/memory-album', icon: ImageIcon, label: 'Memories' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-40 md:sticky md:top-20 md:border-t-0 md:border-r md:w-64 md:h-[calc(100vh-5rem)] md:bottom-auto md:bg-transparent md:flex-col">
      <div className="flex justify-around items-center h-20 md:flex-col md:justify-start md:h-full md:p-4 md:gap-4 md:bg-white">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/patient'}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full md:flex-row md:justify-start md:h-auto md:p-4 md:rounded-2xl transition-colors",
              isActive 
                ? "text-accent md:bg-emerald-50" 
                : "text-slate-500 hover:text-primary md:hover:bg-slate-50"
            )}
          >
            <item.icon size={28} className="mb-1 md:mb-0 md:mr-4" />
            <span className="text-xs font-semibold md:text-lg">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
