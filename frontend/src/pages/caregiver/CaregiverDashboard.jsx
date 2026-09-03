import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { getGames, getReminders, getHistory } from '../../utils/storage';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CaregiverDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    avgAccuracy: 0,
    gamesCompleted: 0,
    remindersCompleted: 0,
    totalReminders: 0
  });
  const [weeklyData, setWeeklyData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Load fresh data
    const games = getGames();
    const reminders = getReminders();
    const history = getHistory();
    const weekly = JSON.parse(localStorage.getItem('smriti_weekly') || '[]');

    let totalAcc = 0;
    let count = 0;
    if (games.memory) { totalAcc += games.memory.accuracy; count++; }
    if (games.attention) { totalAcc += games.attention.accuracy; count++; }
    if (games.pattern) { totalAcc += games.pattern.accuracy; count++; }

    setStats({
      avgAccuracy: count > 0 ? Math.round(totalAcc / count) : 0,
      gamesCompleted: history.filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length,
      remindersCompleted: reminders.filter(r => r.completed).length,
      totalReminders: reminders.length
    });

    setWeeklyData(weekly);
    setRecentActivity(history.slice(0, 3)); // show top 3 recent
    
    // Listen for storage updates (if playing in another tab)
    const handleUpdate = () => {
       const newHistory = getHistory();
       const newWeekly = JSON.parse(localStorage.getItem('smriti_weekly') || '[]');
       setRecentActivity(newHistory.slice(0, 3));
       setWeeklyData(newWeekly);
    };
    window.addEventListener('storage_update', handleUpdate);
    return () => window.removeEventListener('storage_update', handleUpdate);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-1">Caregiver Dashboard</h2>
          <p className="text-slate-500">Monitoring Mrs. Sharma</p>
        </div>
        <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 font-medium text-text outline-none focus:ring-2 focus:ring-primary">
          <option>Mrs. Sharma</option>
          <option>Mr. Das</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white p-6 border-t-4 border-t-primary">
          <div className="text-sm font-bold text-slate-400 uppercase mb-1">Today's Activity</div>
          <div className="text-3xl font-bold text-text">{stats.avgAccuracy > 70 ? 'High' : 'Moderate'}</div>
        </Card>
        <Card className="bg-white p-6 border-t-4 border-t-accent">
          <div className="text-sm font-bold text-slate-400 uppercase mb-1">Games Completed</div>
          <div className="text-3xl font-bold text-text">{stats.gamesCompleted} <span className="text-lg text-slate-400 font-medium">/ 5</span></div>
        </Card>
        <Card className="bg-white p-6 border-t-4 border-t-blue-400">
          <div className="text-sm font-bold text-slate-400 uppercase mb-1">Avg Accuracy</div>
          <div className="text-3xl font-bold text-text">{stats.avgAccuracy}%</div>
        </Card>
        <Card className="bg-white p-6 border-t-4 border-t-emerald-400">
          <div className="text-sm font-bold text-slate-400 uppercase mb-1">Reminders</div>
          <div className="text-3xl font-bold text-text">{stats.remindersCompleted} <span className="text-lg text-slate-400 font-medium">/ {stats.totalReminders}</span></div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-text">Cognitive Activity (7-Day Trend)</h3>
            <Button variant="ghost" className="text-primary text-sm h-8 px-3" onClick={() => navigate('/caregiver/analytics')}>
              View Analytics
            </Button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Line type="monotone" dataKey="memory" name="Memory" stroke="#1E3A8A" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="pattern" name="Pattern" stroke="#059669" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="attention" name="Attention" stroke="#D97706" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="bg-blue-50 border-blue-100 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-6xl opacity-10">🤖</div>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">AI Activity Insight</h3>
            <p className="text-slate-700 font-medium mb-2">Mrs. Sharma completed {stats.gamesCompleted} activities today.</p>
            {stats.avgAccuracy > 70 ? (
              <p className="text-slate-700 text-sm">Overall performance is consistent with the weekly average. Recommended next session: maintain current difficulty levels.</p>
            ) : (
              <p className="text-slate-700 text-sm">Attention activities required slightly more time than usual. Recommended next session: easier attention exercises with longer response time.</p>
            )}
            <div className="mt-4 pt-4 border-t border-blue-200/50">
              <span className="text-xs font-semibold text-slate-500">Activity-based insight • Not a medical diagnosis</span>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-bold text-text mb-4">Recent Activities</h3>
            {recentActivity.length > 0 ? (
              <div className="flex flex-col gap-4">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                    <div>
                      <div className="font-bold text-text capitalize">{act.type} Game</div>
                      <div className="text-sm text-slate-500">{new Date(act.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                    <div className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-bold text-sm">
                      {act.accuracy}%
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No activities recorded today.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
