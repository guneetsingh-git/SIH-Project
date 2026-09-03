import React from 'react';
import { Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VoiceButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/patient/voice')}
      className="fixed bottom-32 right-6 md:bottom-8 md:right-8 bg-gradient-to-br from-primary to-blue-900 hover:from-blue-900 hover:to-primary text-white w-24 h-24 rounded-full shadow-glow-primary flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-secondary z-30"
      aria-label="Talk to Voice Assistant"
    >
      <Mic size={48} />
    </button>
  );
}
