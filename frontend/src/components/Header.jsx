import React from 'react';
import { useAuth } from '../context/AuthContext';
import OfflineIndicator from './OfflineIndicator';
<<<<<<< Updated upstream
import { LogOut, Menu, X } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { mockPatient } from '../data/mockData';

export default function Header({ title, showOffline = true, menuOpen = false, onMenuToggle }) {
  const { logout, role } = useAuth();
=======
import CognitoLogo from './CognitoLogo';
import { Activity, Bell, Brain, Home, Image as ImageIcon, LayoutDashboard, LogOut, Users } from 'lucide-react';
import Button from './Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function Header({ title, showOffline = true }) {
  const { logout, role, user } = useAuth() || {};
>>>>>>> Stashed changes
  const navigate = useNavigate();
  const patientName = user?.name || (role === 'patient' ? 'Patient' : null);
  const normalizedGender = user?.gender?.toLowerCase();
  const patientEmoji = normalizedGender === 'male' ? '🧓' : normalizedGender === 'female' ? '👵' : '';
  const navItems = role === 'caregiver'
    ? [
        { to: '/caregiver', icon: LayoutDashboard, label: 'Dashboard', end: true },
        { to: '/caregiver/analytics', icon: Activity, label: 'Analytics' },
        { to: '/caregiver/reminders', icon: Bell, label: 'Reminders' },
        { to: '/caregiver/patient/p1', icon: Users, label: 'Patient Profile' }
      ]
    : [
        { to: '/patient', icon: Home, label: 'Home', end: true },
        { to: '/patient/games', icon: Brain, label: 'Mind Games' },
        { to: '/patient/reminders', icon: Bell, label: 'Reminders' },
        { to: '/patient/memory-album', icon: ImageIcon, label: 'My Memories' }
      ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
<<<<<<< Updated upstream
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-primary truncate">{title || 'SmritiCare'}</h1>
          {showOffline && <OfflineIndicator className="hidden md:flex" />}
        </div>
        
        <div className="flex items-center gap-1 sm:gap-4 shrink-0">
          {onMenuToggle && (
            <Button
              variant="ghost"
              onClick={onMenuToggle}
              className="touch-target px-2 sm:px-3 lg:hidden"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={32} /> : <Menu size={32} />}
            </Button>
          )}
          <div className="text-sm font-medium text-slate-600 hidden sm:block">
            {role === 'patient' ? mockPatient.name : 'Caregiver View'}
          </div>
          <Button variant="ghost" onClick={handleLogout} className="touch-target px-2 sm:px-3" aria-label="Log out">
            <span className="hidden sm:inline font-bold text-red-600">LOGOUT</span>
            <LogOut size={28} className="text-red-600 sm:w-8 sm:h-8" />
          </Button>
        </div>
      </div>
      {/* Mobile offline indicator below header */}
      {showOffline && (
        <div className="md:hidden border-t border-slate-100 bg-slate-50 p-2 flex justify-center">
          <OfflineIndicator />
=======
    <>
      <header className="fixed inset-x-0 top-0 z-50 w-full bg-white border-b-2 border-slate-200 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <CognitoLogo size={42} />
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 font-editorial flex items-center gap-1.5">
                Cognito <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-sans font-bold">CARE</span>
              </h1>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
                Cognitive Activation
              </span>
            </div>
            {showOffline && <OfflineIndicator className="hidden md:flex ml-4" />}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-sm font-bold text-slate-700 bg-slate-100 px-4 py-1.5 rounded-full hidden sm:block border border-slate-200">
              {role === 'patient' ? `${patientEmoji}${patientEmoji ? ' ' : ''}${patientName}` : '🧑‍⚕️ Caretaker Portal'}
            </div>
            <Button variant="ghost" onClick={handleLogout} className="gap-2 px-3 text-rose-600 hover:bg-rose-50 hover:text-rose-700 sm:px-4" aria-label="Log out">
              <span className="hidden text-sm font-extrabold tracking-wide sm:inline">LOGOUT</span>
              <LogOut size={22} className="text-rose-600 transition-colors" />
            </Button>
          </div>
        </div>
        {showOffline && (
          <div className="md:hidden border-t border-slate-200 bg-slate-50 p-2 flex justify-center">
            <OfflineIndicator />
          </div>
        )}
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(15,23,42,0.08)] lg:hidden" aria-label="Primary navigation">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => cn(
                'flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-center text-xs font-bold transition-colors sm:text-sm',
                isActive
                  ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-900'
              )}
            >
              <item.icon size={22} strokeWidth={2.2} />
              <span>{item.label}</span>
            </NavLink>
          ))}
>>>>>>> Stashed changes
        </div>
      </nav>
    </>
  );
}
