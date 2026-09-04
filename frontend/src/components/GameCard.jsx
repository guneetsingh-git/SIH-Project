import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function GameCard({ title, subtitle, icon, difficulty, to, themeColor = "from-emerald-500 to-teal-600" }) {
  const navigate = useNavigate();
  const [tapping, setTapping] = useState(false);

  const handleLaunch = () => {
    setTapping(true);
    setTimeout(() => {
      navigate(to);
    }, 280);
  };

  return (
    <Card 
      onClick={handleLaunch}
      className={cn(
        "flex flex-col h-full border-2 border-amber-900/10 hover:border-emerald-600/40 transition-all cursor-pointer p-7 rounded-3xl bg-white shadow-sm hover:shadow-xl",
        tapping && "animate-card-tap ring-4 ring-emerald-500/50 bg-emerald-50/40"
      )}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-20 h-20 rounded-2xl bg-amber-50 flex items-center justify-center text-5xl shadow-inner border border-amber-100">
          {icon}
        </div>
        <span className="bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-base font-bold">
          Level {difficulty}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-lg flex-1 mb-6 leading-relaxed">{subtitle}</p>
      
      <Button variant="primary" fullWidth className="text-lg">
        Play Now
      </Button>
    </Card>
  );
}