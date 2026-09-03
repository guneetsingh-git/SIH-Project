import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Mic, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VoiceAssistant() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([]);

  const handleMicClick = () => {
    setIsListening(true);
    
    // Simulate voice interaction flow
    setTimeout(() => {
      setIsListening(false);
      setConversation([
        { role: 'patient', text: 'Start a memory game' },
        { role: 'assistant', text: 'Okay. Let\'s begin.' }
      ]);
      
      setTimeout(() => {
        navigate('/patient/games/memory');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full items-center justify-center pt-8">
      <Button 
        variant="ghost" 
        className="self-start absolute top-24 left-4 md:left-8 text-slate-500 hidden sm:flex"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2" /> Back
      </Button>
      
      <div className="w-full max-w-2xl text-center flex flex-col items-center">
        <h2 className="text-4xl font-bold text-primary mb-2">How can I help you?</h2>
        <p className="text-xl text-slate-500 mb-12">Tap the microphone to speak.</p>
        
        <div className="relative mb-16 flex justify-center">
          {isListening && (
            <div className="absolute inset-0 bg-accent opacity-20 rounded-full animate-ping scale-150" />
          )}
          <button 
            onClick={handleMicClick}
            className={`w-40 h-40 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 relative z-10 ${isListening ? 'bg-emerald-600 scale-105' : 'bg-primary hover:bg-blue-800 hover:scale-105'}`}
          >
            <Mic size={64} />
          </button>
        </div>

        {conversation.length === 0 ? (
          <div className="w-full">
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-6">You can say:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-slate-50 p-4 text-lg font-medium text-slate-700">"Start a memory game"</Card>
              <Card className="bg-slate-50 p-4 text-lg font-medium text-slate-700">"What are my reminders?"</Card>
              <Card className="bg-slate-50 p-4 text-lg font-medium text-slate-700">"When is my appointment?"</Card>
              <Card className="bg-slate-50 p-4 text-lg font-medium text-slate-700">"Show my memories"</Card>
            </div>
          </div>
        ) : (
          <div className="w-full bg-slate-50 p-6 rounded-2xl flex flex-col gap-4 animate-fade-in text-left">
            {conversation.map((msg, idx) => (
              <div key={idx} className={`p-4 rounded-xl max-w-[80%] ${msg.role === 'patient' ? 'bg-blue-100 text-primary self-end' : 'bg-white border border-slate-200 text-slate-800 self-start'}`}>
                <span className="font-bold text-sm block mb-1 opacity-70">
                  {msg.role === 'patient' ? 'You' : 'Assistant'}
                </span>
                <span className="text-xl">{msg.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
