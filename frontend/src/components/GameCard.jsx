import React from 'react';
import Card from './Card';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function GameCard({ title, subtitle, icon, difficulty, to }) {
  const navigate = useNavigate();
  
  return (
    <Card className="flex flex-col h-full border-2 border-transparent hover:border-slate-200 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl">
          {icon}
        </div>
        <div className="bg-blue-50 text-primary px-3 py-1 rounded-full text-sm font-semibold">
          Level {difficulty}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-text mb-2">{title}</h3>
      <p className="text-slate-600 text-lg flex-1 mb-6">{subtitle}</p>
      
      <Button variant="primary" fullWidth onClick={() => navigate(to)}>
        Start Activity
      </Button>
    </Card>
  );
}
