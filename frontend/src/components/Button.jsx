import React from 'react';
import { cn } from '../utils/cn';

export default function Button({ 
  children, 
  variant = 'primary', 
  className, 
  fullWidth,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-200 min-h-[48px] px-6 py-3 outline-none focus:ring-2 focus:ring-offset-2 text-lg shadow-sm";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-emerald-700 focus:ring-accent",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-slate-50 focus:ring-primary",
    outline: "bg-transparent text-text border-2 border-slate-300 hover:border-slate-400 focus:ring-slate-300",
    ghost: "bg-transparent text-text hover:bg-slate-100 shadow-none",
    warning: "bg-warning text-white hover:bg-amber-700 focus:ring-warning"
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
