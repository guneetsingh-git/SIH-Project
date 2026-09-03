import React from 'react';
import Card from './Card';
import { cn } from '../utils/cn';
import { CheckCircle2, Circle } from 'lucide-react';

export default function ReminderCard({ reminder, onToggle }) {
  const { title, time, completed, type } = reminder;
  
  return (
    <Card 
      interactive
      onClick={onToggle}
      className={cn(
        "flex items-center justify-between p-5 mb-4 border-l-8",
        completed ? "border-l-accent opacity-75" : "border-l-primary"
      )}
    >
      <div className="flex flex-col">
        <span className={cn(
          "text-xl font-bold mb-1",
          completed ? "text-slate-500 line-through" : "text-text"
        )}>
          {title}
        </span>
        <span className="text-slate-500 text-lg font-medium">{time} • {type}</span>
      </div>
      
      <div>
        {completed ? (
          <div className="flex items-center gap-2 text-accent">
            <span className="font-bold hidden sm:inline">Completed</span>
            <CheckCircle2 size={32} />
          </div>
        ) : (
          <div className="text-slate-300 hover:text-primary transition-colors">
            <Circle size={32} />
          </div>
        )}
      </div>
    </Card>
  );
}
