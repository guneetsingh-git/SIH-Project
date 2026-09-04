import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Brain, Bell, Image as ImageIcon } from 'lucide-react';
import { cn } from '../utils/cn';

export default function PatientNavbar() {
  const navItems = [
    { to: '/patient', icon: Home, label: 'Home' },
    { to: '/patient/games', icon: Brain, label: 'Mind Games' },
    { to: '/patient/reminders', icon: Bell, label: 'Reminders' },
    { to: '/patient/memory-album', icon: ImageIcon, label: 'My Memories' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 z-30 pb-safe md:static md:w-64 md:h-auto md:bg-white md:border-t-0 md:border-r-2 md:border-slate-200">
      <div className="flex justify-around items-center h-20 md:flex-col md:justify-start md:h-[calc(100vh-5rem)] md:sticky md:top-20 md:p-4 md:gap-3">
        <div className="hidden md:block w-full px-4 pt-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-2">
          Patient Portal
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/patient'}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center p-2 rounded-2xl transition-all md:flex-row md:justify-start md:w-full md:px-4 md:py-3.5",
              isActive 
                ? "text-emerald-950 bg-emerald-100 font-bold shadow-xs border border-emerald-300" 
                : "text-slate-600 hover:text-emerald-900 hover:bg-slate-100 font-semibold"
            )}
          >
            <item.icon className="w-8 h-8 md:w-7 md:h-7 md:mr-3.5 shrink-0" strokeWidth={2.2} />
            <span className="text-xs md:text-base tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}