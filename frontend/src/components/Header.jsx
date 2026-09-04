import React from 'react';
import { useAuth } from '../context/AuthContext';
import OfflineIndicator from './OfflineIndicator';
import { LogOut, Menu, X } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { mockPatient } from '../data/mockData';

export default function Header({ title, showOffline = true, menuOpen = false, onMenuToggle }) {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
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
        </div>
      )}
    </header>
  );
}
