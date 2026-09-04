import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, HelpCircle } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! I am your Cognito Guide. Need help starting games or checking the caregiver dashboard?' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let reply = "Cognito exercises adapt dynamically to response time. You can view progress logs directly under the Caretaker portal.";
      if (userText.toLowerCase().includes('game')) reply = "We feature Garden Memory, Simon Rhythm Bells, and Pattern Weave — all free of failure screens!";
      if (userText.toLowerCase().includes('photo') || userText.toLowerCase().includes('picture')) reply = "You can upload family memories in the 'Amar Poriyal' album to trigger personalized recall prompts.";
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-[#0B1120] text-white px-5 py-3.5 rounded-full shadow-2xl hover:bg-slate-800 border-2 border-emerald-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900 group-hover:rotate-12 transition-transform">
            <Sparkles size={18} />
          </div>
          <span className="font-extrabold text-sm pr-1">Need help? Ask Cognito</span>
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col h-[460px] animate-scale-up">
          {/* Header */}
          <div className="bg-[#0B1120] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-900 font-bold">
                ⚡
              </div>
              <div>
                <h4 className="font-extrabold text-base leading-tight">Cognito AI Guide</h4>
                <span className="text-[11px] text-emerald-400 font-bold">Online • Ready to assist</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3.5 rounded-2xl max-w-[82%] text-sm font-medium ${
                  m.role === 'user' 
                    ? 'bg-[#FF5E36] text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2 bg-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            <button type="submit" className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}