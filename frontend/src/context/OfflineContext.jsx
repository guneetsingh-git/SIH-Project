import React, { createContext, useContext, useState, useEffect } from 'react';

const OfflineContext = createContext();

export const OfflineProvider = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [lastSynced, setLastSynced] = useState('just now');

  // Simulated toggle for demo purposes
  const toggleOffline = () => {
    setIsOffline(prev => {
      const newState = !prev;
      if (!newState) {
        setLastSynced('just now');
      }
      return newState;
    });
  };

  return (
    <OfflineContext.Provider value={{ isOffline, toggleOffline, lastSynced }}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => useContext(OfflineContext);
