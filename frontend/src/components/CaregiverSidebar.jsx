import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Bell, Settings } from 'lucide-react';
import { cn } from '../utils/cn';

export default function CaregiverSidebar() {
  const navItems = [
    { to: '/caregiver', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: '/caregiver/analytics', icon: Activity, label: 'Analytics' },
    { to: '/caregiver/reminders', icon: Bell, label: 'Reminders' },
    { to: '/caregiver/patient/p1', icon: Users, label: 'Patient Profile' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col h-[calc(100vh-5rem)] sticky top-20">
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors",
              isActive 
                ? "bg-primary text-white" 
                : "text-slate-600 hover:bg-slate-50 hover:text-primary"
            )}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
