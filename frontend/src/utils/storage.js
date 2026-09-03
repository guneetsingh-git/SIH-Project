import { initialGames, initialReminders, mockPatient, mockWeeklyActivity } from '../data/mockData';

// Initialize localStorage with mock data if it doesn't exist
export const initStorage = () => {
  if (!localStorage.getItem('smriti_patient')) {
    localStorage.setItem('smriti_patient', JSON.stringify(mockPatient));
  }
  if (!localStorage.getItem('smriti_games')) {
    localStorage.setItem('smriti_games', JSON.stringify(initialGames));
  }
  if (!localStorage.getItem('smriti_reminders')) {
    localStorage.setItem('smriti_reminders', JSON.stringify(initialReminders));
  }
  if (!localStorage.getItem('smriti_weekly')) {
    localStorage.setItem('smriti_weekly', JSON.stringify(mockWeeklyActivity));
  }
  if (!localStorage.getItem('smriti_history')) {
    localStorage.setItem('smriti_history', JSON.stringify([]));
  }
};

export const getGames = () => {
  return JSON.parse(localStorage.getItem('smriti_games') || '{}');
};

export const saveGameProgress = (gameType, result) => {
  const games = getGames();
  const history = JSON.parse(localStorage.getItem('smriti_history') || '[]');
  
  // Add to history
  const newRecord = {
    ...result,
    type: gameType,
    timestamp: new Date().toISOString()
  };
  history.unshift(newRecord); // add to top
  
  // Keep only last 20 records
  if (history.length > 20) history.pop();
  
  localStorage.setItem('smriti_history', JSON.stringify(history));

  // Update current game stats
  games[gameType] = {
    accuracy: result.accuracy,
    reactionTime: result.reactionTime,
    difficulty: result.difficulty
  };
  localStorage.setItem('smriti_games', JSON.stringify(games));
  
  // Mock updating weekly activity to simulate progress
  const weekly = JSON.parse(localStorage.getItem('smriti_weekly') || '[]');
  if (weekly.length > 0) {
    // Update 'Sun' just as an example
    const today = weekly[weekly.length - 1];
    today[gameType] = Math.round((today[gameType] + result.accuracy) / 2);
    localStorage.setItem('smriti_weekly', JSON.stringify(weekly));
  }
  
  // Force storage event for cross-tab or context updates if needed
  window.dispatchEvent(new Event('storage_update'));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem('smriti_history') || '[]');
};

export const getReminders = () => {
  return JSON.parse(localStorage.getItem('smriti_reminders') || '[]');
};

export const toggleReminder = (id) => {
  const reminders = getReminders();
  const updated = reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r);
  localStorage.setItem('smriti_reminders', JSON.stringify(updated));
  window.dispatchEvent(new Event('storage_update'));
};
