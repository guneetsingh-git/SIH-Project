import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import CaregiverSidebar from '../components/CaregiverSidebar';
import { useAuth } from '../context/AuthContext';

export default function CaregiverLayout() {
  const { role } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  
  if (role !== 'caregiver') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header
        title="SmritiCare"
        showOffline={false}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((isOpen) => !isOpen)}
      />
      
      <div className="flex flex-1">
        <CaregiverSidebar mobileOpen={menuOpen} onMobileClose={() => setMenuOpen(false)} />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
