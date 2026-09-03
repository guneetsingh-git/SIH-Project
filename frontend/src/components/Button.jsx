import React from 'react';
import { cn } from '../utils/cn';

export default function Button({ 
  children, 
  variant = 'primary', 
  className, 
  fullWidth,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center gap-3 rounded-xl font-semibold transition-all duration-200 min-h-[56px] px-6 py-3 outline-none focus:ring-2 focus:ring-offset-2 text-lg shadow-sm active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-br from-accent-dark to-emerald-800 text-white shadow-glow hover:from-emerald-800 hover:to-emerald-900 hover:shadow-glow-lg focus:ring-accent-dark",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-blue-50 hover:shadow-glow-primary focus:ring-primary",
    outline: "bg-transparent text-text border-2 border-slate-300 hover:border-primary hover:bg-blue-50 focus:ring-slate-300",
    ghost: "bg-transparent text-text hover:bg-slate-100 shadow-none",
    warning: "bg-gradient-to-br from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900 focus:ring-warning"
  };

  return (
    <button 
      className={cn(
        baseStyles, 
        variants[variant], 
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
