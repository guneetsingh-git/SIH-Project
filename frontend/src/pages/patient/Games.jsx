import React, { useEffect, useState } from 'react';
import GameCard from '../../components/GameCard';
import ProgressBar from '../../components/ProgressBar';
import { getGames } from '../../utils/storage';

export default function Games() {
  const [gamesData, setGamesData] = useState({});

  useEffect(() => {
    setGamesData(getGames());
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-4xl font-bold text-primary mb-2">Let's Play</h2>
        <p className="text-xl text-slate-600 mb-8">Small activities to keep your mind active.</p>
        
        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-xl font-bold text-text">Today's Progress</h3>
            <span className="font-semibold text-primary text-lg">3 of 5 activities completed</span>
          </div>
          <ProgressBar progress={60} color="bg-accent" className="h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GameCard 
          title="Memory"
          subtitle="Remember the pictures"
          icon="🧠"
          difficulty={gamesData.memory?.difficulty || 1}
          to="/patient/games/memory"
        />
        
        <GameCard 
          title="Pattern"
          subtitle="Find what comes next"
          icon="🔷"
          difficulty={gamesData.pattern?.difficulty || 1}
          to="/patient/games/pattern"
        />
        
        <GameCard 
          title="Attention"
          subtitle="Find the correct object"
          icon="👀"
          difficulty={gamesData.attention?.difficulty || 1}
          to="/patient/games/attention"
        />
      </div>
    </div>
  );
}
