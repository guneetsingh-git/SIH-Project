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
      <div className="flex justify-around items-center h-24 md:flex-col md:justify-start md:h-full md:p-4 md:gap-4 md:bg-white">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/patient'}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full min-w-[64px] min-h-[64px] rounded-2xl md:flex-row md:justify-start md:h-auto md:p-4 transition-all duration-200",
              isActive 
                ? "text-accent-dark md:bg-gradient-to-r md:from-emerald-50 md:to-emerald-100/70 md:shadow-glow" 
                : "text-slate-600 hover:text-primary hover:bg-blue-50 md:hover:bg-blue-50"
            )}
          >
            <item.icon size={44} strokeWidth={2.25} className="mb-1 md:mb-0 md:mr-4" />
            <span className="text-sm font-semibold md:text-lg">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
