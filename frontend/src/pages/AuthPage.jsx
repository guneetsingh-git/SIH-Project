import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CognitoLogo from '../components/CognitoLogo';
import { ArrowLeft } from 'lucide-react';

export default function AuthPage({ onAuthSuccess }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth() || {};

  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [role, setRole] = useState('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof login === 'function') {
      try {
        login(role, { name: name || (role === 'patient' ? 'Mrs. Sharma' : 'Caregiver') });
      } catch {
        login({ name: name || (role === 'patient' ? 'Mrs. Sharma' : 'Caregiver'), role });
      }
    }
    localStorage.setItem('smriti_patient_active', 'true');

    if (onAuthSuccess) {
      onAuthSuccess(role);
    } else {
      navigate(role === 'patient' ? '/patient' : '/caregiver');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-6 py-12 relative">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-slate-600 hover:text-slate-900 font-bold flex items-center gap-2 text-base cursor-pointer"
      >
        <ArrowLeft size={20} /> Back to Overview
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 border-2 border-slate-200 shadow-2xl">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <CognitoLogo size={56} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-editorial">
            {isSignUp ? 'Join Cognito' : 'Welcome Back'}
          </h2>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            {isSignUp ? 'Personalized cognitive activation' : 'Sign in to access daily mind exercises'}
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setRole('patient')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              role === 'patient' 
                ? 'bg-white text-emerald-800 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🧓 Elder / Patient
          </button>
          <button
            type="button"
            onClick={() => setRole('caregiver')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              role === 'caregiver' 
                ? 'bg-white text-emerald-800 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🧑‍⚕️ Caretaker
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                {role === 'patient' ? 'Patient Name' : 'Caretaker Name'}
              </label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'patient' ? "Mrs. Sharma" : "Family Caregiver"}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 font-semibold focus:ring-4 focus:ring-emerald-400 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@cognito.org"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-300 font-semibold focus:ring-4 focus:ring-emerald-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#FF5E36] hover:bg-[#E84E27] text-white font-extrabold text-lg shadow-lg shadow-orange-500/25 transition-all mt-4 cursor-pointer"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-bold text-emerald-800 hover:underline cursor-pointer"
          >
            {isSignUp ? 'Already registered? Log in here' : "Don't have an account? Sign up free"}
          </button>
        </div>
      </div>
    </div>
  );
}