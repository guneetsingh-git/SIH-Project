import React from 'react';
import { cn } from '../utils/cn';

export default function Card({ 
  children, 
  className, 
  onClick,
  interactive = false,
  ...props 
}) {
  return (
    <div 
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-slate-100 p-6",
        interactive && "cursor-pointer transition-all duration-200 hover:shadow-glow-primary hover:border-secondary active:scale-[0.98]",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
