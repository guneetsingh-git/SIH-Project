import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Bell, Settings } from 'lucide-react';
import { cn } from '../utils/cn';

export default function CaregiverSidebar({ mobileOpen = false, onMobileClose }) {
  const navItems = [
    { to: '/caregiver', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: '/caregiver/analytics', icon: Activity, label: 'Analytics' },
    { to: '/caregiver/reminders', icon: Bell, label: 'Reminders' },
    { to: '/caregiver/patient/p1', icon: Users, label: 'Patient Profile' }
  ];

<<<<<<< Updated upstream
  const navigation = (
=======
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 hidden lg:flex flex-col h-[calc(100vh-5rem)] sticky top-20 z-10">
>>>>>>> Stashed changes
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            onClick={onMobileClose}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-4 py-3 min-h-[64px] rounded-xl font-medium transition-all duration-200",
              isActive 
                ? "bg-gradient-to-r from-primary to-blue-900 text-white shadow-glow-primary" 
                : "text-slate-600 hover:bg-blue-50 hover:text-primary"
            )}
          >
            <item.icon size={40} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
  );

  return (
    <>
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col h-[calc(100vh-5rem)] sticky top-20">
        {navigation}
      </aside>
      {mobileOpen && (
        <aside className="fixed top-20 left-0 right-0 z-30 bg-white border-b border-slate-200 shadow-lg lg:hidden">
          {navigation}
        </aside>
      )}
    </>
  );
}
