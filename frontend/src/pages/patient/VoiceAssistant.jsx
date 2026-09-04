import React, { useState } from 'react';
import Card from '../../components/Card';
import { Mic, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VoiceAssistant() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([
    { 
      role: 'assistant', 
      text: 'Good morning, Mrs. Sharma! Did you meet your daughter today or enjoy your morning tea?' 
    }
  ]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMicClick = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const reply = "That is so wonderful to hear! Rahul was remembering your Bihu pitha recipes. Would you like to do a gentle memory walk now?";
      setConversation(prev => [
        ...prev,
        { role: 'patient', text: 'Yes, had my tea and was remembering the family.' },
        { role: 'assistant', text: reply }
      ]);
      speakText(reply);
      setTimeout(() => navigate('/patient/games/memory'), 4200);
    }, 2200);
  };

  return (
    <div className="flex flex-col h-full items-center justify-center pt-2 max-w-xl mx-auto w-full">
      <Card className="w-full text-center p-8 md:p-10 bg-white rounded-3xl border-2 border-amber-200 shadow-xl">
        <h2 className="text-3xl font-black text-slate-900 font-editorial mb-1">Your Companion</h2>
        <p className="text-xl text-emerald-800 font-semibold mb-8">Tap the button and speak freely</p>
        
        <div className="relative mb-10 flex justify-center">
          {isListening && (
            <div className="absolute inset-0 bg-emerald-400 opacity-30 rounded-full animate-ping scale-150" />
          )}
          <button 
            onClick={handleMicClick}
            className={`w-36 h-36 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 z-10 cursor-pointer ${
              isListening ? 'bg-emerald-600 scale-105' : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:scale-105'
            }`}
            aria-label="Speak to companion"
          >
            <Mic className="w-16 h-16" />
          </button>
        </div>

        <div className="flex flex-col gap-4 text-left">
          {conversation.map((msg, idx) => (
            <div key={idx} className={`p-5 rounded-2xl ${msg.role === 'patient' ? 'bg-amber-100 text-amber-900 self-end max-w-[88%]' : 'bg-slate-50 border border-slate-200 text-slate-800 self-start max-w-[92%]'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-slate-500 uppercase">
                  {msg.role === 'patient' ? 'You' : 'Companion'}
                </span>
                {msg.role === 'assistant' && (
                  <button onClick={() => speakText(msg.text)} className="text-emerald-700 hover:text-emerald-900 p-1 cursor-pointer">
                    <Volume2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              <p className="text-xl font-medium leading-relaxed">{msg.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}