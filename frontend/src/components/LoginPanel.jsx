import React from 'react';
import Button from './Button';
import Card from './Card';
import { Brain, Leaf } from 'lucide-react';
import { initStorage } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

export default function LoginPanel({ heading = 'Select Demo Mode', onLoggedIn, showBranding = true }) {
  const { login } = useAuth();

  const handleDemoSelect = (role) => {
    initStorage(); // Make sure data exists
    login(role);
    onLoggedIn?.(role);
  };

  return (
    <div className="w-full max-w-md">
      {showBranding && (
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Brain size={64} />
            <Leaf size={48} className="text-accent-dark -ml-5 mt-5" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Smriti Setu</h1>
          <p className="text-xl text-slate-600">Cognitive Support for Every Day</p>
        </div>
      )}

      <Card className="flex flex-col gap-6 p-8">
        <h2 className="text-2xl font-semibold text-center text-text mb-2">{heading}</h2>

        <Button
          variant="primary"
          fullWidth
          className="py-4 text-xl"
          onClick={() => handleDemoSelect('patient')}
        >
          <span className="mr-2">👴</span> Patient Demo
        </Button>

        <Button
          variant="outline"
          fullWidth
          className="py-4 text-xl border-slate-300"
          onClick={() => handleDemoSelect('caregiver')}
        >
          <span className="mr-2">👩‍⚕️</span> Caregiver Demo
        </Button>

        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-slate-600">
          <label htmlFor="login-language">Language:</label>
          <select
            id="login-language"
            className="bg-transparent font-medium p-1 outline-none cursor-pointer"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Assamese</option>
          </select>
        </div>
      </Card>
    </div>
  );
}
