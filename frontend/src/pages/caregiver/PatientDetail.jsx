import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { getGames, getHistory } from '../../utils/storage';

export default function PatientDetail() {
  const [games, setGames] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setGames(getGames());
    setHistory(getHistory().slice(0, 5));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-3xl font-bold text-primary mb-1">Patient Profile</h2>
        <p className="text-slate-500">View detailed information and settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 bg-white flex flex-col items-center text-center p-8">
          <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-5xl mb-4 text-primary font-bold">
            MS
          </div>
          <h3 className="text-2xl font-bold text-text mb-1">Mrs. Sharma</h3>
          <p className="text-slate-500 mb-6">Patient ID: #P-1042</p>
          
          <div className="w-full grid grid-cols-2 gap-4 text-left border-t border-slate-100 pt-6">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase">Age</div>
              <div className="font-medium">72</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase">Language</div>
              <div className="font-medium">Assamese</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase">Activity Level</div>
              <div className="font-medium text-accent">Active</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase">Joined</div>
              <div className="font-medium">Mar 2024</div>
            </div>
          </div>
        </Card>

        <div className="md:col-span-2 flex flex-col gap-6">
          <Card>
            <h3 className="text-xl font-bold text-text mb-6">Cognitive Activity Performance</h3>
            
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-slate-700">Memory</span>
                  <span className="font-bold text-primary">{games.memory?.accuracy || 0}%</span>
                </div>
                <ProgressBar progress={games.memory?.accuracy || 0} color="bg-primary" />
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-slate-700">Attention</span>
                  <span className="font-bold text-primary">{games.attention?.accuracy || 0}%</span>
                </div>
                <ProgressBar progress={games.attention?.accuracy || 0} color="bg-warning" />
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-slate-700">Pattern</span>
                  <span className="font-bold text-primary">{games.pattern?.accuracy || 0}%</span>
                </div>
                <ProgressBar progress={games.pattern?.accuracy || 0} color="bg-accent" />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-bold text-text mb-4">Recent Session Log</h3>
            {history.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {history.map((session, i) => (
                  <div key={i} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 capitalize">{session.type} Game</span>
                      <span className="text-sm text-slate-500">
                        {new Date(session.timestamp).toLocaleDateString()} at {new Date(session.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-primary text-lg">{session.accuracy}%</span>
                      <span className="text-xs text-slate-400">Level {session.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No recent sessions found.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
