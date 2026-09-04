import React from 'react';
import { useAuth } from '../context/AuthContext';
import OfflineIndicator from './OfflineIndicator';
import CognitoLogo from './CognitoLogo';
import { LogOut } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, showOffline = true }) {
  const { logout, role } = useAuth() || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();
    localStorage.removeItem('smriti_patient_active');
    navigate('/');
  };

  return (
    <header className="bg-white border-b-2 border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
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
        
        <div className="flex items-center gap-4">
          <div className="text-sm font-bold text-slate-700 bg-slate-100 px-4 py-1.5 rounded-full hidden sm:block border border-slate-200">
            {role === 'patient' ? '🧓 Elder View' : '🧑‍⚕️ Caretaker Portal'}
          </div>
          <Button variant="ghost" onClick={handleLogout} className="px-3 hover:bg-rose-50" aria-label="Log out">
            <LogOut size={22} className="text-slate-600 hover:text-rose-600 transition-colors" />
          </Button>
        </div>
      </div>
      {showOffline && (
        <div className="md:hidden border-t border-slate-200 bg-slate-50 p-2 flex justify-center">
          <OfflineIndicator />
        </div>
      )}
    </header>
  );
}