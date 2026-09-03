import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import CaregiverSidebar from '../components/CaregiverSidebar';
import { useAuth } from '../context/AuthContext';

export default function CaregiverLayout() {
  const { role } = useAuth();
  
  if (role !== 'caregiver') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header title="SmritiCare Dashboard" showOffline={false} />
      
      <div className="flex flex-1">
        <CaregiverSidebar />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
