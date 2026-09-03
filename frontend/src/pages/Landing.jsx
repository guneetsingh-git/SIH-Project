import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Leaf, Menu, X, ArrowRight, Mic, WifiOff, Users, 
  Activity, Bell, ChevronRight, CheckCircle2, Globe, Heart, Shield, Sparkles, Image as ImageIcon
} from 'lucide-react';

const LandingNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center">
            <Brain size={32} className="text-[#1E3A8A]" />
            <Leaf size={20} className="text-[#059669] absolute -bottom-1 -right-1" />
          </div>
          <span className="text-xl font-bold text-[#1E3A8A] tracking-tight">SmritiCare</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-semibold text-[#0F172A] hover:text-[#059669] transition-colors">How It Works</button>
          <button onClick={() => scrollToSection('features')} className="text-sm font-semibold text-[#0F172A] hover:text-[#059669] transition-colors">Features</button>
          <button onClick={() => scrollToSection('accessibility')} className="text-sm font-semibold text-[#0F172A] hover:text-[#059669] transition-colors">Accessibility</button>
          <button onClick={() => navigate('/login')} className="bg-[#059669] hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-[#059669]/20 active:scale-95">
            Get Started
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-[#0F172A]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 flex flex-col py-4 px-4 gap-4">
          <button onClick={() => scrollToSection('how-it-works')} className="text-left font-semibold text-lg text-[#0F172A] p-2">How It Works</button>
          <button onClick={() => scrollToSection('features')} className="text-left font-semibold text-lg text-[#0F172A] p-2">Features</button>
          <button onClick={() => scrollToSection('accessibility')} className="text-left font-semibold text-lg text-[#0F172A] p-2">Accessibility</button>
          <button onClick={() => navigate('/login')} className="bg-[#059669] text-white px-4 py-3 rounded-xl font-bold text-center mt-2">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      <div className="flex-1 text-center lg:text-left z-10">
        <h1 className="text-5xl lg:text-7xl font-extrabold text-[#0F172A] leading-tight mb-6 tracking-tight">
          Supporting Memory.<br />
          <span className="text-[#1E3A8A]">Supporting Everyday Life.</span>
        </h1>
        <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          An AI-powered cognitive companion designed to help older adults stay engaged, supported, and connected. SmritiCare combines simple cognitive activities, personalized difficulty, daily reminders, and caregiver insights — designed with accessibility and low-connectivity environments in mind.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <button onClick={() => navigate('/login')} className="w-full sm:w-auto bg-[#1E3A8A] hover:bg-blue-900 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:shadow-[#1E3A8A]/20 active:scale-95 flex items-center justify-center gap-2">
            Get Started <ArrowRight size={20} />
          </button>
          <button onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-transparent border-2 border-slate-200 hover:border-slate-300 text-[#0F172A] px-8 py-4 rounded-full font-bold text-lg transition-all">
            Explore SmritiCare
          </button>
        </div>
      </div>
      
      {/* Abstract Graphic */}
      <div className="flex-1 relative w-full max-w-lg lg:max-w-none hidden md:block">
        <div className="relative w-full aspect-square rounded-[3rem] bg-gradient-to-tr from-blue-50 to-[#059669]/10 p-8 flex items-center justify-center overflow-hidden border border-slate-100 shadow-2xl">
          {/* Decorative elements representing nature and tech */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#60A5FA]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#059669]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="bg-white/80 backdrop-blur-md w-full h-full rounded-[2rem] shadow-sm border border-white/50 p-6 flex flex-col gap-4 relative z-10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Brain className="text-[#1E3A8A]" size={28} />
                <div className="h-4 w-24 bg-slate-200 rounded-full"></div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#059669]/20 flex items-center justify-center text-[#059669]"><Mic size={20} /></div>
            </div>
            <div className="flex-1 bg-slate-50 rounded-xl p-4 flex flex-col gap-3">
               <div className="h-6 w-3/4 bg-slate-200 rounded-md"></div>
               <div className="h-20 w-full bg-white rounded-xl shadow-sm border border-slate-100 mt-auto flex items-center p-4 gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl">🧠</div>
                  <div className="flex-1">
                    <div className="h-4 w-1/2 bg-slate-200 rounded-md mb-2"></div>
                    <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden"><div className="h-full w-2/3 bg-[#059669]"></div></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => (
  <section className="border-y border-slate-100 bg-white py-12">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Designed for older adults and the people who care for them</p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        <div className="flex items-center gap-2 text-[#0F172A] font-semibold"><Brain className="text-[#1E3A8A]" size={24} /> Cognitive Activities</div>
        <div className="flex items-center gap-2 text-[#0F172A] font-semibold"><Mic className="text-[#059669]" size={24} /> Voice-Friendly</div>
        <div className="flex items-center gap-2 text-[#0F172A] font-semibold"><WifiOff className="text-slate-500" size={24} /> Offline Ready</div>
        <div className="flex items-center gap-2 text-[#0F172A] font-semibold"><Users className="text-[#D97706]" size={24} /> Caregiver Support</div>
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="py-24 bg-[#F8FAFC]">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-8">Everyday cognitive support should be simple.</h2>
      <p className="text-xl text-slate-600 leading-relaxed mb-12">
        Older adults often face difficulty remembering daily routines, staying mentally active, and navigating complicated technology. In remote areas, connectivity challenges can isolate them further, while caregivers struggle with limited visibility into their loved ones' daily activities.
      </p>
      <div className="inline-block bg-white px-8 py-4 rounded-full shadow-sm border border-slate-100">
        <p className="text-xl font-bold text-[#1E3A8A]">"Technology should reduce the burden — not add another one."</p>
      </div>
    </div>
  </section>
);

const SolutionSection = () => (
  <section id="features" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">One calm companion for everyday support.</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { icon: '🧠', title: 'Cognitive Activities', desc: 'Simple memory, attention, and pattern activities designed for everyday engagement.', color: 'bg-blue-50 text-[#1E3A8A]' },
          { icon: '🤖', title: 'Adaptive Personalization', desc: 'Activities adjust their difficulty based on recent performance.', color: 'bg-emerald-50 text-[#059669]' },
          { icon: '🎙', title: 'Voice Assistance', desc: 'Large, simple interactions designed to make technology easier to use.', color: 'bg-purple-50 text-purple-700' },
          { icon: '📶', title: 'Offline First', desc: 'Core activities can continue even when internet connectivity is limited.', color: 'bg-amber-50 text-[#D97706]' }
        ].map((feature, i) => (
          <div key={i} className="bg-[#F8FAFC] rounded-[2rem] p-10 border border-slate-100 hover:shadow-lg transition-shadow">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 ${feature.color}`}>{feature.icon}</div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">{feature.title}</h3>
            <p className="text-lg text-slate-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-[#1E3A8A] text-white overflow-hidden relative">
    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">How it works</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-white/20"></div>
        
        {[
          { step: '01', title: 'Play', desc: 'The patient completes a short cognitive activity.' },
          { step: '02', title: 'Learn', desc: 'SmritiCare records activity performance.' },
          { step: '03', title: 'Personalize', desc: 'The system adjusts future activity difficulty.' },
          { step: '04', title: 'Support', desc: 'Caregivers can view activity trends and reminders.' }
        ].map((item, i) => (
          <div key={i} className="relative flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-[#1E3A8A] border-4 border-[#059669] flex items-center justify-center text-2xl font-bold mb-6 z-10 shadow-[0_0_30px_rgba(5,150,105,0.3)]">
              {item.step}
            </div>
            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-blue-100 text-lg">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ExperienceSection = () => (
  <section className="py-24 bg-[#F8FAFC]">
    <div className="max-w-7xl mx-auto px-4">
      {/* Patient Experience */}
      <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
        <div className="flex-1 order-2 lg:order-1">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 md:p-10 max-w-md mx-auto transform -rotate-1 hover:rotate-0 transition-transform">
            <p className="text-slate-500 font-medium mb-1">Good Morning</p>
            <h3 className="text-3xl font-bold text-[#0F172A] mb-6">How are you feeling today?</h3>
            <div className="flex gap-3 mb-8">
               {['🙂', '😐', '😟'].map(emoji => (
                 <div key={emoji} className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 text-center text-3xl cursor-pointer">{emoji}</div>
               ))}
            </div>
            <div className="space-y-4">
               <div className="bg-blue-50 border-l-8 border-[#1E3A8A] p-5 rounded-2xl flex items-center gap-4">
                  <span className="text-3xl">🧠</span><span className="text-xl font-bold text-[#1E3A8A]">Memory Game</span>
               </div>
               <div className="bg-emerald-50 border-l-8 border-[#059669] p-5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4"><span className="text-3xl">💊</span><span className="text-xl font-bold line-through text-slate-400">Medicine</span></div>
                  <CheckCircle2 className="text-[#059669]" size={28} />
               </div>
               <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl flex items-center gap-4">
                  <span className="text-3xl">💧</span><span className="text-xl font-bold text-[#0F172A]">Drink Water</span>
               </div>
            </div>
            <div className="mt-8 bg-[#059669] text-white rounded-full py-4 flex items-center justify-center gap-2 font-bold text-lg shadow-lg shadow-[#059669]/20">
               <Mic size={24} /> Talk to me
            </div>
          </div>
        </div>
        <div className="flex-1 order-1 lg:order-2">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">Designed around the person — not the technology.</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Large controls, clear language, calm colors, and voice-friendly interactions reduce unnecessary cognitive load. The interface feels welcoming, not clinical.
          </p>
        </div>
      </div>

      {/* Caregiver Experience */}
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">Helping caregivers stay informed.</h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-6">
            Activity-based insights help caregivers understand patterns over time, ensuring they can provide the right support when it's needed.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
             <Shield className="text-amber-600 shrink-0 mt-1" />
             <p className="text-amber-800 text-sm font-medium">Important: SmritiCare provides activity insights for engagement and monitoring, but does not diagnose medical conditions.</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 md:p-10 max-w-lg mx-auto transform rotate-1 hover:rotate-0 transition-transform">
             <div className="flex justify-between items-end mb-6">
                <div>
                   <h3 className="text-xl font-bold text-[#0F172A]">Weekly Overview</h3>
                   <p className="text-slate-500">Activity trends for Mrs. Sharma</p>
                </div>
                <div className="bg-blue-50 text-[#1E3A8A] px-3 py-1 rounded-full font-bold text-sm">Last 7 Days</div>
             </div>
             <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <p className="text-sm font-bold text-slate-400 uppercase">Games Completed</p>
                   <p className="text-3xl font-bold text-[#0F172A]">4 <span className="text-lg text-slate-400">/ 5</span></p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <p className="text-sm font-bold text-slate-400 uppercase">Avg Accuracy</p>
                   <p className="text-3xl font-bold text-[#059669]">74%</p>
                </div>
             </div>
             {/* Mock Chart */}
             <div className="h-40 w-full bg-slate-50 rounded-2xl border border-slate-100 flex items-end justify-between p-4 px-6 gap-2">
                {[40, 55, 45, 70, 65, 80, 74].map((val, i) => (
                  <div key={i} className="w-full bg-[#1E3A8A] rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${val}%` }}></div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AISection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <div className="inline-block bg-blue-50 text-[#1E3A8A] px-4 py-2 rounded-full font-bold text-sm mb-6 border border-blue-100">
        Activity-based personalization
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-8">Personalized by activity, not assumptions.</h2>
      <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-16">
        SmritiCare analyzes activity performance such as accuracy, response time, mistakes, and completion rate to recommend an appropriate difficulty level for future exercises.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto bg-[#F8FAFC] p-8 md:p-12 rounded-[2rem] border border-slate-100 relative">
        <div className="text-center z-10 w-full md:w-auto mb-8 md:mb-0">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto mb-3">🎯</div>
           <p className="font-bold text-[#0F172A]">Performance</p>
        </div>
        <ChevronRight className="hidden md:block text-slate-300" size={32} />
        <div className="text-center z-10 w-full md:w-auto mb-8 md:mb-0">
           <div className="w-16 h-16 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto mb-3">🤖</div>
           <p className="font-bold text-[#0F172A]">AI Activity Analysis</p>
        </div>
        <ChevronRight className="hidden md:block text-slate-300" size={32} />
        <div className="text-center z-10 w-full md:w-auto">
           <div className="bg-white border-2 border-[#059669] rounded-xl p-4 shadow-sm mx-auto">
             <div className="text-sm font-semibold text-slate-500 mb-2">Recommended Difficulty</div>
             <div className="flex flex-col gap-2 text-left">
               <div className="bg-slate-50 px-3 py-1 rounded text-sm font-bold">Attention → <span className="text-[#059669]">Level 1</span></div>
               <div className="bg-slate-50 px-3 py-1 rounded text-sm font-bold">Memory → <span className="text-[#059669]">Level 2</span></div>
               <div className="bg-slate-50 px-3 py-1 rounded text-sm font-bold">Pattern → <span className="text-[#059669]">Level 3</span></div>
             </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const OfflineSection = () => (
  <section className="py-24 bg-[#0F172A] text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
       <div className="flex-1">
         <h2 className="text-4xl md:text-5xl font-bold mb-6">Support shouldn't stop when the signal does.</h2>
         <p className="text-xl text-slate-400 leading-relaxed mb-8">
           SmritiCare is designed with an offline-first approach so essential activities and reminders can continue even when connectivity is unreliable.
         </p>
       </div>
       <div className="flex-1 w-full max-w-sm">
         <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl flex flex-col gap-4">
            <div className="bg-slate-900 rounded-2xl p-4 flex items-center gap-4 border border-emerald-900/50">
               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
               <div><p className="font-bold">Online</p><p className="text-sm text-slate-400">Synced just now</p></div>
            </div>
            <div className="flex justify-center py-2"><div className="w-1 h-8 bg-slate-700 rounded-full"></div></div>
            <div className="bg-slate-900 rounded-2xl p-4 flex items-center gap-4 border border-amber-900/50">
               <div className="text-amber-500"><WifiOff size={20} /></div>
               <div><p className="font-bold text-amber-500">Offline</p><p className="text-sm text-slate-400">Activities saved on this device</p></div>
            </div>
            <div className="flex justify-center py-2"><div className="w-1 h-8 bg-slate-700 rounded-full"></div></div>
            <div className="bg-slate-900 rounded-2xl p-4 flex items-center gap-4 border border-emerald-900/50">
               <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
               <div><p className="font-bold">Online</p><p className="text-sm text-slate-400">Synced</p></div>
            </div>
         </div>
       </div>
    </div>
  </section>
);

const ReminiscenceSection = () => (
  <section className="py-24 bg-[#FAF8F5] border-y border-[#1C1917]/5 relative overflow-hidden">
    {/* Subtle woven/bamboo pattern background */}
    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1B4332 25%, transparent 25%, transparent 75%, #1B4332 75%, #1B4332), repeating-linear-gradient(45deg, #1B4332 25%, #FAF8F5 25%, #FAF8F5 75%, #1B4332 75%, #1B4332)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
    
    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-6 font-serif">Memories that feel familiar.</h2>
      <p className="text-xl text-[#1C1917]/70 leading-relaxed max-w-3xl mx-auto mb-16">
        Personalized memory prompts can use familiar people, places, objects, and experiences to create more meaningful cognitive activities.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {[
          { text: 'Tea Garden', icon: '🌿' },
          { text: 'Family Home', icon: '🏠' },
          { text: 'Family Photo', icon: '📸' },
          { text: 'Tea Cup', icon: '🍵' },
          { text: 'Traditional Pattern', icon: '🧶' }
        ].map((item, i) => (
          <div key={i} className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-[#D97706]/20 flex items-center gap-4 hover:shadow-md transition-shadow cursor-default transform hover:-translate-y-1">
             <span className="text-3xl">{item.icon}</span>
             <span className="text-lg font-bold text-[#1C1917]">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AccessibilitySection = () => (
  <section id="accessibility" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">Designed for aging eyes and simple interaction.</h2>
        <p className="text-xl text-slate-600">The interface prioritizes strong contrast and large interaction areas, keeping cognitive load to a minimum.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          'Large typography', 'High contrast', 'Large touch targets', 'Calm visual language',
          'Simple navigation', 'Voice-friendly interactions', 'Minimal cognitive load', 'Clear feedback'
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-slate-100">
            <CheckCircle2 className="text-[#059669] shrink-0" />
            <span className="font-semibold text-[#0F172A]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MultilingualSection = () => (
  <section className="py-24 bg-[#1E3A8A] text-white">
    <div className="max-w-5xl mx-auto px-4 text-center">
       <Globe size={48} className="mx-auto mb-6 text-[#60A5FA]" />
       <h2 className="text-4xl font-bold mb-6">Speak in a language that feels familiar.</h2>
       <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
         SmritiCare is designed with localization in mind so language should not become another barrier.
       </p>
       <div className="flex justify-center flex-wrap gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur border border-white/20 px-8 py-3 rounded-full font-bold text-lg">English</div>
          <div className="bg-white/10 backdrop-blur border border-white/20 px-8 py-3 rounded-full font-bold text-lg">Hindi</div>
          <div className="bg-white/10 backdrop-blur border border-white/20 px-8 py-3 rounded-full font-bold text-lg">Assamese</div>
       </div>
       <p className="text-blue-200/80 italic">More regional languages can be added.</p>
    </div>
  </section>
);

const WhoIsItFor = () => (
  <section className="py-24 bg-[#F8FAFC]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <Heart size={40} className="text-[#059669] mb-6" />
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Elderly Users</h3>
            <p className="text-slate-600 text-lg">Simple cognitive activities, reminders, memories, and voice-friendly interaction.</p>
         </div>
         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <Users size={40} className="text-[#1E3A8A] mb-6" />
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Caregivers</h3>
            <p className="text-slate-600 text-lg">Understand activity patterns, reminders, and progress in one place.</p>
         </div>
         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <Activity size={40} className="text-[#D97706] mb-6" />
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Healthcare Support</h3>
            <p className="text-slate-600 text-lg mb-6">Provide activity-based information that can complement professional care.</p>
            <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-lg border border-slate-100">
              Healthcare professionals remain responsible for medical assessment and diagnosis.
            </div>
         </div>
      </div>
    </div>
  </section>
);

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-32 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-8">Small moments of support can make everyday life easier.</h2>
        <p className="text-xl text-slate-600 mb-12">
          Explore SmritiCare and see how cognitive activities, personalization, reminders, and caregiver support come together.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => navigate('/login')} className="w-full sm:w-auto bg-[#059669] hover:bg-emerald-700 text-white px-10 py-5 rounded-full font-bold text-xl transition-all hover:shadow-xl hover:shadow-[#059669]/20 active:scale-95">
            Get Started
          </button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-[#0F172A] px-10 py-5 rounded-full font-bold text-xl transition-all">
            Back to top
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#0F172A] text-slate-400 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
      <div className="text-center md:text-left">
         <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <Brain size={24} className="text-[#60A5FA]" />
            <span className="text-xl font-bold text-white">SmritiCare</span>
         </div>
         <p className="text-sm">Cognitive Support for Every Day</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
         <a href="#" className="hover:text-white transition-colors">About</a>
         <a href="#features" className="hover:text-white transition-colors">Features</a>
         <a href="#accessibility" className="hover:text-white transition-colors">Accessibility</a>
         <a href="#" className="hover:text-white transition-colors">Privacy</a>
         <a href="/login" className="hover:text-white transition-colors">Login</a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-xs text-center text-slate-500">
      <p>This application supports cognitive engagement and daily assistance. It does not provide medical diagnosis.</p>
    </div>
  </footer>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0F172A] selection:bg-[#059669]/20">
      <LandingNavbar />
      <HeroSection />
      <TrustSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <ExperienceSection />
      <AISection />
      <OfflineSection />
      <ReminiscenceSection />
      <AccessibilitySection />
      <MultilingualSection />
      <WhoIsItFor />
      <FinalCTA />
      <Footer />
    </div>
  );
}
