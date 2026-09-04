import React from 'react';
import { cn } from '../utils/cn';

export default function Button({ 
  children, 
  variant = 'primary', 
  className, 
  fullWidth,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 min-h-[56px] px-8 py-4 outline-none focus:ring-4 focus:ring-offset-2 text-xl active:scale-[0.97] cursor-pointer shadow-sm select-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800 shadow-emerald-700/20 hover:shadow-lg focus:ring-emerald-400",
    secondary: "bg-white text-slate-800 border-2 border-slate-300 hover:bg-amber-50/50 hover:border-amber-400 shadow-sm focus:ring-amber-400",
    outline: "bg-transparent text-slate-700 border-2 border-slate-300 hover:border-slate-500 focus:ring-slate-400",
    ghost: "bg-transparent text-slate-700 hover:bg-amber-100/40 shadow-none",
    warm: "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-amber-500/25 hover:shadow-lg focus:ring-amber-400"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}