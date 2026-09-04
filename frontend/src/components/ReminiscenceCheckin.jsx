import React, { useState } from 'react';
import Card from './Card';

const CHECKIN_PROMPTS = [
  {
    question: "Did you speak with your daughter Anita today?",
    relation: "Anita • Daughter",
    icon: "👩‍🏫",
    options: ["Yes, we spoke 🌸", "Not yet today", "I will call her soon"]
  },
  {
    question: "Did you have your warm morning tea?",
    relation: "Morning Routine",
    icon: "🍵",
    options: ["Yes, had my tea 🌿", "Having it now", "A little later"]
  },
  {
    question: "Did you meet your son Rahul recently?",
    relation: "Rahul • Son",
    icon: "👨‍🌾",
    options: ["Yes, saw him 🌾", "Not today", "Remembering him warmly"]
  }
];

export default function ReminiscenceCheckin({ onContinue }) {
  const [selectedPrompt] = useState(() => {
    return CHECKIN_PROMPTS[Math.floor(Math.random() * CHECKIN_PROMPTS.length)];
  });
  const [answered, setAnswered] = useState(false);

  const handleSelect = () => {
    setAnswered(true);
    setTimeout(() => {
      onContinue();
    }, 1300);
  };

  return (
    <Card className="w-full max-w-xl mx-auto text-center p-8 md:p-10 bg-white rounded-3xl border-3 border-amber-200 shadow-xl">
      <div className="w-24 h-24 bg-amber-100 rounded-3xl mx-auto mb-5 flex items-center justify-center text-5xl border border-amber-200 shadow-inner">
        {selectedPrompt.icon}
      </div>

      <span className="text-sm font-bold text-amber-900 uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
        {selectedPrompt.relation}
      </span>

      <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-editorial my-6 leading-snug">
        {selectedPrompt.question}
      </h2>

      {answered ? (
        <div className="text-2xl font-bold text-emerald-800 bg-emerald-100 p-5 rounded-2xl border border-emerald-300 animate-pulse">
          🌸 That's wonderful to hear! Let's start our game together.
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {selectedPrompt.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={handleSelect}
              className="py-4 px-6 rounded-2xl bg-[#FBF9F5] border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 font-bold text-xl text-slate-800 active:scale-95 transition-all text-left flex items-center justify-between cursor-pointer"
            >
              <span>{opt}</span>
              <span className="text-emerald-700 text-2xl font-black">→</span>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}