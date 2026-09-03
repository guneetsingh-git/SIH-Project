import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import PatientNavbar from '../components/PatientNavbar';
import VoiceButton from '../components/VoiceButton';
import { useAuth } from '../context/AuthContext';

export default function PatientLayout() {
  const { role } = useAuth();
  
  if (role !== 'patient') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="hidden md:block fixed w-full z-20">
        <Header />
      </div>
      <div className="md:hidden w-full z-20">
         <Header />
      </div>

      <div className="flex-1 flex flex-col md:flex-row md:pt-20">
        <PatientNavbar />
        
        <main className="flex-1 px-4 py-8 pb-32 md:px-8 md:pb-8 max-w-4xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      
      <VoiceButton />
    </div>
  );
}
