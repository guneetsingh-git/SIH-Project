import React from 'react';
import { CheckCircle2, RefreshCcw } from 'lucide-react';
import { cn } from '../utils/cn';

export default function GameFeedback({ message, correct }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center gap-4 text-4xl font-bold my-20 p-8 rounded-2xl border-2",
        correct
          ? "text-accent-dark bg-gradient-to-br from-emerald-50 to-emerald-100 border-accent-glow animate-correct-pulse"
          : "text-slate-700 bg-slate-100 border-slate-200 animate-gentle-shake"
      )}
    >
      {correct ? <CheckCircle2 size={64} /> : <RefreshCcw size={64} />}
      <span>{message}</span>
    </div>
  );
}
