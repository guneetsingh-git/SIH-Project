import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, MessageSquare, Heart, Clock } from 'lucide-react';

export default function PatientHome() {
  const navigate = useNavigate();
  const patientName = "Mrs. Sharma";

  const actions = [
    {
      title: "Games",
      subtitle: "Mind exercises",
      icon: <Brain className="w-16 h-16 md:w-20 md:h-20 text-emerald-800" strokeWidth={2.4} />,
      bg: "bg-emerald-100/90 border-emerald-300 hover:bg-emerald-200/90 active:bg-emerald-300",
      to: "/patient/games"
    },
    {
      title: "Talk",
      subtitle: "Voice companion",
      icon: <MessageSquare className="w-16 h-16 md:w-20 md:h-20 text-sky-800" strokeWidth={2.4} />,
      bg: "bg-sky-100/90 border-sky-300 hover:bg-sky-200/90 active:bg-sky-300",
      to: "/patient/voice"
    },
    {
      title: "Memories",
      subtitle: "Family pictures",
      icon: <Heart className="w-16 h-16 md:w-20 md:h-20 text-rose-700 fill-rose-100" strokeWidth={2.4} />,
      bg: "bg-rose-100/90 border-rose-300 hover:bg-rose-200/90 active:bg-rose-300",
      to: "/patient/memory-album"
    },
    {
      title: "Routine",
      subtitle: "Tea & medicine",
      icon: <Clock className="w-16 h-16 md:w-20 md:h-20 text-amber-800" strokeWidth={2.4} />,
      bg: "bg-amber-100/90 border-amber-300 hover:bg-amber-200/90 active:bg-amber-300",
      to: "/patient/reminders"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto py-6 px-4 text-center">
      {/* Big, warm, high-contrast greeting */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 font-editorial">
          Good morning, {patientName} 🌸
        </h1>
        <p className="text-2xl md:text-3xl text-slate-700 font-semibold">
          What would you like to do today?
        </p>
      </div>

      {/* 4 Big, simple action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
        {actions.map((act, idx) => (
          <button
            key={idx}
            onClick={() => navigate(act.to)}
            className={`flex flex-col items-center justify-center p-8 md:p-12 rounded-3xl border-3 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer ${act.bg}`}
          >
            <div className="mb-4 bg-white/90 p-5 rounded-3xl shadow-sm">
              {act.icon}
            </div>
            <span className="text-3xl md:text-4xl font-black text-slate-900 font-editorial mb-1">
              {act.title}
            </span>
            <span className="text-lg md:text-xl text-slate-700 font-bold">
              {act.subtitle}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}