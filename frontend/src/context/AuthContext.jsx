import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem('smriti_role') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('smriti_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (selectedRole, profile = {}) => {
    const nextUser = { ...profile, role: selectedRole };
    setRole(selectedRole);
    setUser(nextUser);
    localStorage.setItem('smriti_role', selectedRole);
    localStorage.setItem('smriti_user', JSON.stringify(nextUser));
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    localStorage.removeItem('smriti_role');
    localStorage.removeItem('smriti_user');
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
