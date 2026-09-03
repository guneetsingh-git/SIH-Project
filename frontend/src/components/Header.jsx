import React from 'react';
import { useAuth } from '../context/AuthContext';
import OfflineIndicator from './OfflineIndicator';
import { LogOut } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, showOffline = true }) {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-primary">{title || 'SmritiCare'}</h1>
          {showOffline && <OfflineIndicator className="hidden md:flex" />}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-slate-600 hidden sm:block">
            {role === 'patient' ? 'Patient View' : 'Caregiver View'}
          </div>
          <Button variant="ghost" onClick={handleLogout} className="px-3" aria-label="Log out">
            <LogOut size={24} className="text-slate-600" />
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
