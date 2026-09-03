import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPanel from '../components/LoginPanel';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-emerald-50 flex flex-col items-center justify-center p-4">
      <LoginPanel onLoggedIn={(role) => navigate(`/${role}`)} />
    </div>
  );
}
