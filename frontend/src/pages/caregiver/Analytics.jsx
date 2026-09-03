import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getHistory } from '../../utils/storage';

export default function Analytics() {
  const [weeklyData, setWeeklyData] = useState([]);
  
  useEffect(() => {
    setWeeklyData(JSON.parse(localStorage.getItem('smriti_weekly') || '[]'));
  }, []);

  const completionData = [
    { name: 'Memory', rate: 85 },
    { name: 'Pattern', rate: 92 },
    { name: 'Attention', rate: 68 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-3xl font-bold text-primary mb-1">Analytics</h2>
        <p className="text-slate-500">Detailed performance metrics for Mrs. Sharma</p>
      </div>

      <Card className="bg-emerald-50 border-emerald-100 mb-4">
        <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Trend Summary</h3>
        <p className="text-lg text-slate-700">This week's activity completion rate is stable. Pattern recognition shows the highest accuracy, while attention exercises take slightly longer to complete.</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-sm font-bold text-slate-400 uppercase mb-4">Average Accuracy</div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-primary">74%</span>
            <span className="text-emerald-500 font-bold mb-1">↑ 2%</span>
          </div>
        </Card>
        
        <Card>
          <div className="text-sm font-bold text-slate-400 uppercase mb-4">Average Reaction Time</div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-text">4.8s</span>
            <span className="text-amber-500 font-bold mb-1">↑ 0.5s</span>
          </div>
        </Card>

        <Card>
          <div className="text-sm font-bold text-slate-400 uppercase mb-4">Completion Rate</div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-text">88%</span>
            <span className="text-slate-400 font-bold mb-1">—</span>
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <h3 className="text-xl font-bold text-text mb-6">Activity Completion by Type</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#0f172a', fontWeight: 'bold'}} width={100} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="rate" name="Completion %" fill="#1E3A8A" radius={[0, 4, 4, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
