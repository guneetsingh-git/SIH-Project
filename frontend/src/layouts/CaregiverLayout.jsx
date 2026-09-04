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
<<<<<<< Updated upstream
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header
        title="SmritiCare"
        showOffline={false}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((isOpen) => !isOpen)}
      />
=======
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      <Header title="SmritiCare Dashboard" showOffline={false} />
>>>>>>> Stashed changes
      
      <div className="flex flex-1">
        <CaregiverSidebar mobileOpen={menuOpen} onMobileClose={() => setMenuOpen(false)} />
        
        <main className="flex-1 p-6 pb-24 md:p-8 md:pb-24 lg:pb-8 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
