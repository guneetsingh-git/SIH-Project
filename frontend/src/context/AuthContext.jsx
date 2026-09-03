import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem('smriti_role') || null);

  const login = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem('smriti_role', selectedRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('smriti_role');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
