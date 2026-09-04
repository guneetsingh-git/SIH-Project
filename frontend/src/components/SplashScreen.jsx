import React, { useEffect, useState } from 'react';
import CognitoLogo from './CognitoLogo';

export default function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1500);
    const endTimer = setTimeout(onFinish, 1900);
    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, [onFinish]);

  return (
    <div 
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120] text-white transition-opacity duration-400 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center animate-scale-up">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <CognitoLogo size={96} />
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight font-editorial text-white mb-2">
          Cognito
        </h1>
        <p className="text-lg md:text-xl text-emerald-400 font-bold tracking-wider uppercase">
          Activating Neural Health
        </p>
      </div>
      <button 
        onClick={onFinish} 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:bg-white focus:text-black focus:p-2"
      >
        Skip animation
      </button>
    </div>
  );
}