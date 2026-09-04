import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PatientNavbar from '../components/PatientNavbar';
import VoiceButton from '../components/VoiceButton';
import LoginPanel from '../components/LoginPanel';
import { useAuth } from '../context/AuthContext';

<<<<<<< Updated upstream
function PatientLoginOverlay() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-emerald-50 relative">
      <div aria-hidden="true" className="pointer-events-none select-none blur-sm opacity-40">
        <div className="h-20 bg-white border-b border-slate-200" />
        <div className="hidden md:block w-64 h-[calc(100vh-5rem)] bg-white border-r border-slate-200" />
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-slate-200" />
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="patient-login-heading"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 animate-fade-in"
      >
        <div className="w-full max-w-md">
          <h2 id="patient-login-heading" className="sr-only">Sign in to continue</h2>
          <LoginPanel
            heading="Sign in to continue"
            onLoggedIn={(role) => {
              if (role !== 'patient') navigate(`/${role}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function PatientLayout() {
  const { role } = useAuth();

  if (!role) {
    return <PatientLoginOverlay />;
  }

  if (role !== 'patient') {
    return <Navigate to={`/${role}`} replace />;
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
=======
export default function PatientLayout() {
  const auth = useAuth() || {};
  const { role, user, login } = auth;
  
  // Local state to guarantee the modal closes immediately upon clicking
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedLang, setSelectedLang] = useState('as');

  const languages = [
    { code: 'as', label: 'অসমীয়া (Assamese)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'mni', label: 'মৈতৈলোন্ (Manipuri)' },
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' }
  ];

  const handleStart = () => {
    // 1. Call login compatible with both object or role string
    if (typeof login === 'function') {
      try {
        login('patient', { name: 'Mrs. Sharma', gender: 'female' });
      } catch (err) {
        login('patient', { name: 'Mrs. Sharma', gender: 'female', lang: selectedLang });
      }
    }
    // 2. Save language & dismiss modal immediately
    localStorage.setItem('smriti_lang', selectedLang);
    localStorage.setItem('smriti_patient_active', 'true');
    setIsDismissed(true);
  };

  // Show modal only if unauthenticated AND user hasn't tapped start yet
  const showModal = !isDismissed && !(role === 'patient' || user?.role === 'patient' || localStorage.getItem('smriti_patient_active') === 'true');

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col pt-32 md:pt-20">
      <Header title="স্মৃতি সেতু • Smriti Setu" />
      
      <div className="flex-1 flex w-full pb-24 lg:pb-8">
>>>>>>> Stashed changes
        <PatientNavbar />
        
        <main className="flex-1 px-4 py-8 pb-32 md:px-8 md:pb-8 max-w-4xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      
      <VoiceButton />
    </div>
  );
}
