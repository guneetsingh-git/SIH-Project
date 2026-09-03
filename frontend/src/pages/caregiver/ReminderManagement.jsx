import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { getReminders } from '../../utils/storage';
import { Clock, Calendar, CheckCircle2, Circle } from 'lucide-react';

export default function ReminderManagement() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    setReminders(getReminders());
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-1">Reminders</h2>
          <p className="text-slate-500">Manage daily schedule for Mrs. Sharma</p>
        </div>
        <Button variant="primary">
          + Add Reminder
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-700">Active Schedule</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {reminders.map(reminder => (
                <div key={reminder.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-primary w-12 h-12 rounded-full flex items-center justify-center text-xl">
                      {reminder.type === 'Medicine' ? '💊' : reminder.type === 'Water' ? '💧' : '📅'}
                    </div>
                    <div>
                      <h4 className="font-bold text-text text-lg">{reminder.title}</h4>
                      <div className="flex items-center gap-3 text-slate-500 text-sm mt-1">
                        <span className="flex items-center gap-1"><Clock size={14} /> {reminder.time}</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> Daily</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    {reminder.completed ? (
                      <span className="flex items-center gap-1 text-accent font-bold text-sm bg-emerald-50 px-2 py-1 rounded-md">
                        <CheckCircle2 size={16} /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 font-bold text-sm bg-slate-100 px-2 py-1 rounded-md">
                        <Circle size={16} /> Pending
                      </span>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button className="text-xs font-bold text-primary hover:underline">Edit</button>
                      <button className="text-xs font-bold text-warning hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="bg-slate-50 border-slate-200">
            <h3 className="font-bold text-slate-700 mb-4">Quick Add</h3>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start bg-white w-full border-slate-200 shadow-sm text-slate-700">
                <span className="mr-3">💊</span> Add Medication
              </Button>
              <Button variant="outline" className="justify-start bg-white w-full border-slate-200 shadow-sm text-slate-700">
                <span className="mr-3">💧</span> Add Hydration
              </Button>
              <Button variant="outline" className="justify-start bg-white w-full border-slate-200 shadow-sm text-slate-700">
                <span className="mr-3">📅</span> Add Appointment
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
