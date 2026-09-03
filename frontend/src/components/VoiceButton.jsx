import React from 'react';
import { Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VoiceButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/patient/voice')}
      className="fixed bottom-28 right-6 md:bottom-8 md:right-8 bg-primary hover:bg-blue-800 text-white w-20 h-20 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-30"
      aria-label="Talk to Voice Assistant"
    >
      <Mic size={36} />
    </button>
  );
}
