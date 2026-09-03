// Mock Data to populate the application
export const mockPatient = {
  id: 'p1',
  name: 'Mrs. Sharma',
  age: 72,
  language: 'Assamese'
};

export const initialGames = {
  memory: { accuracy: 80, reactionTime: 4.2, difficulty: 2 },
  attention: { accuracy: 62, reactionTime: 7.1, difficulty: 1 },
  pattern: { accuracy: 88, reactionTime: 3.4, difficulty: 2 }
};

export const initialReminders = [
  { id: 1, title: 'Morning Medicine', type: 'Medicine', time: '08:00 AM', completed: true },
  { id: 2, title: 'Hydration', type: 'Water', time: '10:30 AM', completed: true },
  { id: 3, title: 'Doctor Appointment', type: 'Appointment', time: '11:00 AM', completed: false, date: 'Tomorrow' },
  { id: 4, title: 'Lunch', type: 'Meal', time: '12:30 PM', completed: false },
  { id: 5, title: 'Hydration', type: 'Water', time: '03:00 PM', completed: false },
  { id: 6, title: 'Evening Medicine', type: 'Medicine', time: '06:00 PM', completed: false }
];

export const mockWeeklyActivity = [
  { day: 'Mon', memory: 68, attention: 55, pattern: 70 },
  { day: 'Tue', memory: 70, attention: 58, pattern: 75 },
  { day: 'Wed', memory: 72, attention: 60, pattern: 80 },
  { day: 'Thu', memory: 69, attention: 59, pattern: 78 },
  { day: 'Fri', memory: 75, attention: 62, pattern: 85 },
  { day: 'Sat', memory: 78, attention: 61, pattern: 88 },
  { day: 'Sun', memory: 74, attention: 65, pattern: 82 }
];
