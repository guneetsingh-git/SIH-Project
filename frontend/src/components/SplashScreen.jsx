import React, { useEffect, useState } from 'react';
import { Brain, Leaf } from 'lucide-react';

const VISIBLE_MS = 1500;
const FADE_MS = 400;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function SplashScreen({ onFinish }) {
  const [leaving, setLeaving] = useState(false);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      const timer = setTimeout(onFinish, 600);
      return () => clearTimeout(timer);
    }

    const fadeTimer = setTimeout(() => setLeaving(true), VISIBLE_MS);
    const doneTimer = setTimeout(onFinish, VISIBLE_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish, reducedMotion]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Smriti Setu is starting"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-background via-white to-emerald-50 ${
        leaving ? 'animate-splash-out' : ''
      }`}
    >
      <div className={reducedMotion ? '' : 'animate-splash-in'}>
        <div className="flex items-center justify-center text-primary mb-6">
          <Brain size={96} />
          <Leaf size={72} className="text-accent-dark -ml-8 mt-8" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-primary text-center tracking-tight">
          Smriti Setu
        </h1>
        <p className="mt-4 text-xl text-slate-600 text-center">
          Cognitive Support for Every Day
        </p>
      </div>

      <button
        type="button"
        onClick={onFinish}
        className="touch-target px-6 rounded-xl text-lg font-semibold text-primary underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip intro
      </button>
    </div>
  );
}
