import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Brain, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { getReminders, toggleReminder } from '../../utils/storage';

export default function PatientHome() {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);
  
  // Simulated patient state
  const patientName = "Mrs. Sharma";
  
  useEffect(() => {
    setReminders(getReminders());
    
    // Listen for cross-component storage updates
    const handleStorage = () => setReminders(getReminders());
    window.addEventListener('storage_update', handleStorage);
    return () => window.removeEventListener('storage_update', handleStorage);
  }, []);

  const handleReminderToggle = (id) => {
    toggleReminder(id);
  };

  const todayReminders = reminders.slice(0, 3); // show only top 3

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-2">
        <h2 className="text-3xl font-bold text-primary mb-6">Good Morning, {patientName}</h2>
        
        <Card className="bg-blue-50 border-blue-100">
          <p className="text-xl text-text font-medium mb-6">How are you feeling today?</p>
          <div className="flex gap-4">
            <Button variant="secondary" className="flex-1 py-4 text-2xl border-none shadow-sm">
              <span className="mr-2">🙂</span> Good
            </Button>
            <Button variant="secondary" className="flex-1 py-4 text-2xl border-none shadow-sm">
              <span className="mr-2">😐</span> Okay
            </Button>
            <Button variant="secondary" className="flex-1 py-4 text-2xl border-none shadow-sm">
              <span className="mr-2">😟</span> Not Good
            </Button>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Today's Activity</h3>
        <Card className="border-l-8 border-l-accent flex flex-col sm:flex-row items-center justify-between p-6 gap-6">
          <div className="flex items-center gap-6">
            <div className="bg-emerald-50 text-accent p-4 rounded-2xl">
              <Brain size={48} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-text mb-2">Memory Game</h4>
              <p className="text-slate-600 text-lg">Let's exercise your memory.</p>
            </div>
          </div>
          <Button variant="primary" className="text-xl py-4 px-10 w-full sm:w-auto" onClick={() => navigate('/patient/games/memory')}>
            Start
          </Button>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Today's Reminders</h3>
          <Button variant="ghost" className="text-primary font-bold" onClick={() => navigate('/patient/reminders')}>
            See All
          </Button>
        </div>
        
        <div className="flex flex-col gap-4">
          {todayReminders.map(reminder => (
            <Card 
              key={reminder.id}
              interactive
              onClick={() => handleReminderToggle(reminder.id)}
              className={`p-5 flex items-center justify-between ${reminder.completed ? 'opacity-75' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${reminder.completed ? 'bg-emerald-50 text-accent' : 'bg-blue-50 text-primary'}`}>
                  {reminder.type === 'Medicine' ? '💊' : reminder.type === 'Water' ? '💧' : '📅'}
                </div>
                <div>
                  <h4 className={`text-xl font-bold mb-1 ${reminder.completed ? 'text-slate-500 line-through' : 'text-text'}`}>
                    {reminder.title}
                  </h4>
                  <p className="text-slate-500 font-medium">
                    {reminder.completed ? '✓ Taken' : `Next reminder: ${reminder.time}`}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
