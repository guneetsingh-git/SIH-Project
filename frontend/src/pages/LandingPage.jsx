import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CognitoLogo from '../components/CognitoLogo';
import ChatbotWidget from '../components/ChatbotWidget';
import { 
  Sparkles, ArrowRight, ChevronDown, CheckCircle2, ShieldCheck, 
  Brain, Users, Heart, Star, Send, Layers, ArrowDown
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const scrollToOverview = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  const gameBadges = [
    { title: "Garden Recall", icon: "🌺", bg: "bg-emerald-500", tag: "Memory" },
    { title: "Simon Bells", icon: "🔔", bg: "bg-amber-500", tag: "Rhythm" },
    { title: "Pattern Weave", icon: "🔷", bg: "bg-indigo-500", tag: "Focus" },
    { title: "Tea Harvest", icon: "🍃", bg: "bg-teal-500", tag: "Speed" },
    { title: "Family Photo Vault", icon: "👨‍👩‍👧", bg: "bg-rose-500", tag: "Reminiscence" }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col selection:bg-amber-200 relative">
      <ChatbotWidget />

      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CognitoLogo size={46} />
          <div>
            <span className="text-3xl font-black text-slate-900 tracking-tight font-editorial block">
              Cognito
            </span>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
              Adaptive Cognitive Activation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={() => navigate('/auth?mode=login')}
            className="px-5 py-2.5 rounded-full font-bold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 text-base cursor-pointer"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/auth?mode=signup')}
            className="px-6 py-3 rounded-full font-extrabold bg-[#FF5E36] hover:bg-[#E84E27] text-white shadow-lg shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all text-base cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-6 pb-24 text-center">
        {/* Soft atmospheric sunset gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[580px] bg-gradient-to-b from-sky-100/70 via-amber-100/40 to-transparent rounded-b-[80px] -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-100 text-emerald-900 font-bold text-sm mb-6 border border-emerald-300 shadow-xs">
            <Sparkles size={16} className="text-emerald-700" />
            Empowering Elderly Minds • Dignified & Culturally Resonant
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#0B1120] tracking-tight leading-[1.1] mb-6 font-editorial">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600">
              Help them stay connected to the memories that matter...
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
            Personalized brain exercises, heartwarming family photo reminiscence, and non-punitive adaptive AI designed to preserve memory with warmth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button 
              onClick={() => navigate('/auth?mode=signup')}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-[#FF5E36] hover:bg-[#E84E27] text-white text-xl font-black shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              Start Free Today <ArrowRight size={22} />
            </button>
            <button 
              onClick={() => navigate('/caregiver')}
              className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white text-slate-800 border-2 border-slate-200 hover:border-slate-300 text-lg font-bold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              Explore Caretaker View
            </button>
          </div>

          {/* Floating Game Badges */}
          <div className="mb-14">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
              Core Daily Activities Inside Cognito
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {gameBadges.map((game, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-all"
                >
                  <div className={`w-11 h-11 ${game.bg} rounded-xl flex items-center justify-center text-2xl text-white shadow-xs`}>
                    {game.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-slate-900 text-base">{game.title}</h4>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">{game.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Downward bouncing arrow */}
          <button 
            onClick={scrollToOverview}
            className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors font-bold text-sm cursor-pointer group"
          >
            <span>See how Cognito works</span>
            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-md flex items-center justify-center group-hover:border-emerald-500 group-hover:scale-110 transition-all animate-bounce">
              <ChevronDown size={24} className="text-emerald-700" />
            </div>
          </button>
        </div>
      </section>

      {/* Visual Walkthrough: What happens when you sign up */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 font-editorial">
              What Happens Once You Sign Up?
            </h2>
            <p className="text-lg text-slate-600">
              Three interconnected modules work harmoniously between the senior and their caretaker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border-2 border-emerald-100 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl mb-6 shadow-md">
                  🌺
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-editorial">1. Friendly Mind Workouts</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Elderly players explore Garden Memory, Simon Bells, and Pattern recognition using regional Assam tea, silk, and familiar items.
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-black text-emerald-800 uppercase">Positive Psychology</span>
                <p className="text-xs font-bold text-slate-700 mt-1">Zero negative score screens. Every attempt is praised.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border-2 border-amber-100 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl mb-6 shadow-md">
                  🖼️
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-editorial">2. Family Photo Vault</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Caregivers upload authentic family snapshots. The app presents them naturally: <em>"Here is your grandson Rahul at Bihu"</em>.
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-black text-amber-800 uppercase">Reminiscence Therapy</span>
                <p className="text-xs font-bold text-slate-700 mt-1">Keeps faces, relations, and treasured stories fresh.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border-2 border-sky-100 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-2xl mb-6 shadow-md">
                  📊
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-editorial">3. Caretaker Command Center</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Family and doctors monitor accuracy trends, speed metrics, reminders, and patient activity leaderboards in real time.
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-black text-sky-800 uppercase">Proactive Health</span>
                <p className="text-xs font-bold text-slate-700 mt-1">Receive alerts if scheduled exercises are skipped.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Feedback Section */}
      <section className="py-20 max-w-4xl mx-auto px-6 w-full">
        <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-slate-200 shadow-xl text-center">
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 font-editorial mb-3">
            How Can Cognito Support Your Family Better?
          </h3>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto text-base">
            We are constantly refining exercises with geriatric neurologists and families. Share your thoughts or feature requests.
          </p>

          {feedbackSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-emerald-900 font-bold">
              🌸 Thank you for your feedback! Your insights directly help us tailor games for our elders.
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 max-w-xl mx-auto text-left">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Rate Experience
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className="p-2 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star 
                        size={28} 
                        className={star <= feedbackRating ? "fill-amber-400 text-amber-400" : "text-slate-300"} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Your Suggestions / Feedback
                </label>
                <textarea
                  rows={3}
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="e.g. Add games with Indian folk music or easier navigation..."
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-400 outline-none font-medium text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send size={18} /> Submit Feedback
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}