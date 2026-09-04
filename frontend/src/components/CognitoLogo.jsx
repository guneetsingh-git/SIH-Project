import React from 'react';

export default function CognitoLogo({ size = 44, className = "" }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_0_12px_rgba(16,185,129,0.45)] transition-transform hover:scale-105"
      >
        <defs>
          <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FF5E36" />
          </linearGradient>
        </defs>

        {/* Outer Glowing Neural Hemisphere */}
        <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="url(#brainGrad)" strokeWidth="4" />

        {/* Left Brain Lobes */}
        <path 
          d="M48 24C38 24 30 30 30 40C30 44 32 48 34 50C29 53 26 59 26 65C26 74 34 80 44 80C46 80 48 79.5 50 78.5" 
          stroke="url(#brainGrad)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="none" 
        />
        
        {/* Right Brain Lobes */}
        <path 
          d="M52 24C62 24 70 30 70 40C70 44 68 48 66 50C71 53 74 59 74 65C74 74 66 80 56 80C54 80 52 79.5 50 78.5" 
          stroke="url(#brainGrad)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Central Electric Lightning Bolt */}
        <path 
          d="M54 22L38 48H52L46 76L66 44H50L54 22Z" 
          fill="url(#boltGrad)" 
          stroke="#FFFFFF" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}