import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { initStorage } from '../utils/storage';
import Button from '../components/Button';
import Card from '../components/Card';
import { Brain, Leaf } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoSelect = (role) => {
    initStorage(); // Make sure data exists
    login(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Brain size={48} />
            <Leaf size={40} className="text-accent -ml-4 mt-4" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">SmritiCare</h1>
          <p className="text-xl text-slate-600">Cognitive Support for Every Day</p>
        </div>

        <Card className="flex flex-col gap-6 p-8">
          <h2 className="text-2xl font-semibold text-center text-text mb-2">Select Demo Mode</h2>
          
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

          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-slate-500">
            <span>Language:</span>
            <select className="bg-transparent font-medium p-1 outline-none cursor-pointer">
              <option>English</option>
              <option>Hindi</option>
              <option>Assamese</option>
            </select>
          </div>
        </Card>
      </div>
    </div>
  );
}
