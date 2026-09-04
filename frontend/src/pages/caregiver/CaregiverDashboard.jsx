import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { getGames, getReminders, getHistory } from '../../utils/storage';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Sparkles, Award, Users } from 'lucide-react';

export default function CaregiverDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    avgAccuracy: 88,
    gamesCompleted: 3,
    remindersCompleted: 2,
    totalReminders: 3
  });

  const weeklyData = [
    { day: 'Mon', memory: 80, pattern: 85, attention: 70 },
    { day: 'Tue', memory: 85, pattern: 90, attention: 75 },
    { day: 'Wed', memory: 90, pattern: 92, attention: 80 },
    { day: 'Thu', memory: 88, pattern: 95, attention: 82 },
    { day: 'Fri', memory: 92, pattern: 94, attention: 85 },
    { day: 'Sat', memory: 95, pattern: 98, attention: 88 },
    { day: 'Sun', memory: 96, pattern: 95, attention: 90 }
  ];

  // Leaderboard of active group members
  const leaderboard = [
    { rank: 1, name: "Mrs. Sharma", score: "940 pts", streak: "7 Days 🔥", badge: "Gold" },
    { rank: 2, name: "Mr. Barua", score: "890 pts", streak: "5 Days 🔥", badge: "Silver" },
    { rank: 3, name: "Mrs. Dutta", score: "820 pts", streak: "4 Days", badge: "Bronze" },
    { rank: 4, name: "Mr. Das", score: "780 pts", streak: "3 Days", badge: "Active" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-editorial mb-1">
            Caretaker Intelligence Portal
          </h2>
          <p className="text-slate-500 font-medium">Monitoring Mrs. Sharma • Adaptive AI Analytics</p>
        </div>
        <select className="bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-emerald-400">
          <option>Mrs. Sharma (#P-1042)</option>
          <option>Mr. Barua (#P-1089)</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white p-6 border-t-4 border-t-emerald-500 rounded-2xl shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Weekly Readiness</div>
          <div className="text-3xl font-extrabold text-slate-900">Optimal (94%)</div>
        </Card>
        <Card className="bg-white p-6 border-t-4 border-t-orange-500 rounded-2xl shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Today's Mind Games</div>
          <div className="text-3xl font-extrabold text-slate-900">3 <span className="text-lg text-slate-400 font-normal">/ 4 target</span></div>
        </Card>
        <Card className="bg-white p-6 border-t-4 border-t-blue-500 rounded-2xl shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Avg Accuracy</div>
          <div className="text-3xl font-extrabold text-slate-900">88%</div>
        </Card>
        <Card className="bg-white p-6 border-t-4 border-t-teal-500 rounded-2xl shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Daily Care Reminders</div>
          <div className="text-3xl font-extrabold text-slate-900">2 <span className="text-lg text-slate-400 font-normal">/ 3 Taken</span></div>
        </Card>
      </div>

      {/* Analytics Chart & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-3xl p-6 bg-white shadow-xs border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900 font-editorial">Cognitive Retention (7-Day Curve)</h3>
              <p className="text-xs font-semibold text-slate-400">Adaptive response metrics across all 4 game categories</p>
            </div>
            <Button variant="ghost" className="text-emerald-800 text-sm font-bold h-9" onClick={() => navigate('/caregiver/analytics')}>
              Full Analytics →
            </Button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[60, 100]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Line type="monotone" dataKey="memory" name="Memory" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="pattern" name="Pattern Weave" stroke="#0284c7" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="attention" name="Simon Rhythm" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Patient Community Leaderboard */}
        <Card className="rounded-3xl p-6 bg-white shadow-xs border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-amber-500" size={24} />
              <h3 className="text-xl font-bold text-slate-900 font-editorial">Cognitive Cohort Leaderboard</h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">Encouragement points based on daily habit consistency</p>

            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank}
                  className={`p-3.5 rounded-2xl flex items-center justify-between border ${
                    user.rank === 1 ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                      user.rank === 1 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      #{user.rank}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{user.name}</h4>
                      <span className="text-xs text-emerald-700 font-bold">{user.streak}</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-sm text-slate-800">{user.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-xs font-bold text-slate-400">Next diagnostic review in 3 days</span>
          </div>
        </Card>
      </div>
    </div>
  );
}