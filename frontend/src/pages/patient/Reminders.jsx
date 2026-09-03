import React, { useState, useEffect } from 'react';
import ReminderCard from '../../components/ReminderCard';
import { getReminders, toggleReminder } from '../../utils/storage';

export default function Reminders() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    setReminders(getReminders());
  }, []);

  const handleToggle = (id) => {
    toggleReminder(id);
    setReminders(getReminders()); // refresh local state
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-4">
        <h2 className="text-4xl font-bold text-primary mb-2">Today's Reminders</h2>
        <p className="text-xl text-slate-600">Your schedule for today.</p>
      </div>

      <div className="flex flex-col">
        {reminders.map(reminder => (
          <ReminderCard 
            key={reminder.id} 
            reminder={reminder} 
            onToggle={() => handleToggle(reminder.id)} 
          />
        ))}
      </div>
    </div>
  );
}
