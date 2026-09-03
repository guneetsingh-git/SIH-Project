import React, { useCallback, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SplashScreen from './components/SplashScreen';
import PatientLayout from './layouts/PatientLayout';
import CaregiverLayout from './layouts/CaregiverLayout';

// Patient Pages
import PatientHome from './pages/patient/PatientHome';
import Games from './pages/patient/Games';
import MemoryGame from './pages/patient/MemoryGame';
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
  const [showSplash, setShowSplash] = useState(true);
  const dismissSplash = useCallback(() => setShowSplash(false), []);

  if (showSplash) {
    return <SplashScreen onFinish={dismissSplash} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      
      {/* Patient Routes */}
      <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<PatientHome />} />
        <Route path="games" element={<Games />} />
        <Route path="games/memory" element={<MemoryGame />} />
        <Route path="games/pattern" element={<PatternGame />} />
        <Route path="games/attention" element={<AttentionGame />} />
        <Route path="reminders" element={<Reminders />} />
        <Route path="memory-album" element={<MemoryAlbum />} />
        <Route path="voice" element={<VoiceAssistant />} />
      </Route>

      {/* Caregiver Routes */}
      <Route path="/caregiver" element={<CaregiverLayout />}>
        <Route index element={<CaregiverDashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="patient/:id" element={<PatientDetail />} />
        <Route path="reminders" element={<ReminderManagement />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
