import React from 'react';
import { cn } from '../utils/cn';

export default function ProgressBar({ progress, max = 100, className, color = 'bg-accent' }) {
  const percentage = Math.min(Math.max((progress / max) * 100, 0), 100);
  
  return (
    <div className={cn("w-full bg-slate-200 rounded-full h-4 overflow-hidden", className)} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
      <div 
        className={cn("h-full rounded-full transition-all duration-500 ease-out", color)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
