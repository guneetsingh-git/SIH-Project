import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import PatientNavbar from '../components/PatientNavbar';
import VoiceButton from '../components/VoiceButton';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

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
        login('patient'); // Standard codebase pattern
      } catch (err) {
        login({ name: 'Mrs. Sharma', role: 'patient', lang: selectedLang });
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
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <Header title="স্মৃতি সেতু • Smriti Setu" />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-24 md:pb-8">
        <PatientNavbar />
        <main className="flex-1 p-5 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <VoiceButton />

      {/* Inline Welcome / Login Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <Card className="max-w-md w-full p-8 text-center bg-white shadow-2xl rounded-3xl border-2 border-amber-200">
            <div className="text-6xl mb-4">🧓</div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">স্বাগতম • Welcome</h2>
            <p className="text-lg text-slate-600 mb-6">Choose your language to enter Smriti Setu</p>

            <div className="mb-6 text-left">
              <label className="block text-sm font-bold text-slate-600 mb-2">Select Language</label>
              <select 
                value={selectedLang} 
                onChange={(e) => setSelectedLang(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-slate-300 text-xl font-bold bg-white text-slate-800 focus:ring-4 focus:ring-emerald-400 outline-none"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>

            <Button 
              variant="primary" 
              fullWidth 
              className="py-4 text-xl font-bold"
              onClick={handleStart}
            >
              Start My Day
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}