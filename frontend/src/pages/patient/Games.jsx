import React from 'react';
import GameCard from '../../components/GameCard';

export default function Games() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h2 className="text-4xl font-extrabold text-[#1B4332] mb-2">Mind Harmony</h2>
        <p className="text-2xl text-slate-600 font-medium">Gentle games to spark joy and connection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GameCard 
          title="Garden Memory"
          subtitle="Remember beautiful flowers and herbs from Assam and Meghalaya."
          icon="🌺"
          difficulty={1}
          to="/patient/games/memory"
        />
        
        <GameCard 
          title="Simon Rhythm Bells"
          subtitle="Follow the joyful light and melody sequence."
          icon="🔔"
          difficulty={1}
          to="/patient/games/simon"
        />

        <GameCard 
          title="Pattern Weave"
          subtitle="Complete traditional weaving geometric sequences."
          icon="🔷"
          difficulty={2}
          to="/patient/games/pattern"
        />
        
        <GameCard 
          title="Find the Object"
          subtitle="Locate familiar household items in a peaceful setting."
          icon="👀"
          difficulty={1}
          to="/patient/games/attention"
        />
      </div>
    </div>
  );
}