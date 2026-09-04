import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import PatientLayout from './layouts/PatientLayout';
import CaregiverLayout from './layouts/CaregiverLayout';
import SplashScreen from './components/SplashScreen';

// Patient Pages
import PatientHome from './pages/patient/PatientHome';
import Games from './pages/patient/Games';
import MemoryGame from './pages/patient/MemoryGame';
import SimonGame from './pages/patient/SimonGame';
import PatternGame from './pages/patient/PatternGame';
import AttentionGame from './pages/patient/AttentionGame';
import Reminders from './pages/patient/Reminders';
import MemoryAlbum from './pages/patient/MemoryAlbum';
import VoiceAssistant from './pages/patient/VoiceAssistant';

// Caregiver Pages
import CaregiverDashboard from './pages/caregiver/CaregiverDashboard';
import Analytics from './pages/caregiver/Analytics';
import PatientDetail from './pages/caregiver/PatientDetail';
import ReminderManagement from './pages/caregiver/ReminderManagement';

function App() {
  const navigate = useNavigate();
  const [animatingRole, setAnimatingRole] = useState(null);

  const handleAuthSuccess = (selectedRole) => {
    setAnimatingRole(selectedRole);
  };

  const handleSplashDone = () => {
    const role = animatingRole;
    setAnimatingRole(null);
    navigate(role === 'patient' ? '/patient' : '/caregiver');
  };

  return (
    <>
      {animatingRole && <SplashScreen onFinish={handleSplashDone} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/login" element={<Navigate to="/auth?mode=login" replace />} />

        {/* Patient Dashboard */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<PatientHome />} />
          <Route path="games" element={<Games />} />
          <Route path="games/memory" element={<MemoryGame />} />
          <Route path="games/simon" element={<SimonGame />} />
          <Route path="games/pattern" element={<PatternGame />} />
          <Route path="games/attention" element={<AttentionGame />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="memory-album" element={<MemoryAlbum />} />
          <Route path="voice" element={<VoiceAssistant />} />
        </Route>

        {/* Caretaker Portal */}
        <Route path="/caregiver" element={<CaregiverLayout />}>
          <Route index element={<CaregiverDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="patient/:id" element={<PatientDetail />} />
          <Route path="reminders" element={<ReminderManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;