import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';

const PATTERN_LEVELS = [
  { sequence: ['🔵', '🟢', '🔵', '🟢'], answer: '🔵', options: ['🔵', '🟢', '🟡'] },
  { sequence: ['🌺', '🍃', '🌺', '🍃'], answer: '🌺', options: ['🌺', '🍃', '☀️'] },
  { sequence: ['🔶', '🔷', '🔶', '🔷'], answer: '🔶', options: ['🔶', '🔷', '🟣'] },
  { sequence: ['☀️', '🌙', '☀️', '🌙'], answer: '☀️', options: ['☀️', '🌙', '⭐'] }
];

const COMPLIMENTS = [
  "✨ Brilliant pattern recognition! Your eye for symmetry is remarkable!",
  "🌸 Wonderful insight! You caught the sequence without a moment's hesitation!",
  "🌿 Splendid focus! Keeping order and patterns active preserves clarity!"
];

export default function PatternGame() {
  const navigate = useNavigate();
  const [levelIndex, setLevelIndex] = useState(0);
  const [stage, setStage] = useState('INTRO');
  const [feedback, setFeedback] = useState(null);
  const [compliment, setCompliment] = useState("");

  const currentLevel = PATTERN_LEVELS[levelIndex % PATTERN_LEVELS.length];

  const handleSelect = (option) => {
    const isCorrect = option === currentLevel.answer;
    setCompliment(COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]);

    if (isCorrect) {
      setFeedback("🌸 Splendid! You solved the weave correctly!");
    } else {
      setFeedback("🌿 Great attempt! Looking for patterns nurtures mental agility.");
    }

    setTimeout(() => {
      setFeedback(null);
      if (levelIndex < PATTERN_LEVELS.length - 1) {
        setLevelIndex(prev => prev + 1);
      } else {
        setStage('RESULT');
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto items-center justify-center pt-4">
      {stage === 'INTRO' && (
        <Card className="w-full text-center p-10 bg-white rounded-3xl border-2 border-slate-200 shadow-xl">
          <div className="text-7xl mb-4">🔷</div>
          <h2 className="text-3xl font-black text-slate-900 font-editorial mb-3">Pattern Weave</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Look at the rhythm of the sequence and choose the shape or symbol that naturally fits next.
          </p>
          <Button variant="primary" className="py-4 px-10 text-xl font-bold" onClick={() => setStage('QUESTION')}>
            Start Weaving
          </Button>
        </Card>
      )}

      {stage === 'QUESTION' && (
        <div className="w-full text-center">
          {feedback ? (
            <div className="text-2xl md:text-3xl font-bold p-10 rounded-3xl text-emerald-900 bg-emerald-100/90 border-2 border-emerald-300">
              {feedback}
            </div>
          ) : (
            <>
              <div className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                Pattern {levelIndex + 1} of {PATTERN_LEVELS.length}
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-8 font-editorial">What comes next?</h2>
              
              <Card className="bg-white py-10 px-6 mb-8 flex items-center justify-center gap-4 text-5xl rounded-3xl border-2 border-slate-200 shadow-xs">
                {currentLevel.sequence.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
                <span className="text-slate-300 font-bold border-b-4 border-slate-300 pb-1 px-2">?</span>
              </Card>

              <div className="grid grid-cols-3 gap-5">
                {currentLevel.options.map(option => (
                  <Card 
                    key={option} 
                    interactive 
                    className="flex items-center justify-center py-8 text-5xl hover:bg-emerald-50 rounded-2xl border-2 border-slate-200 cursor-pointer active:scale-95"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {stage === 'RESULT' && (
        <Card className="w-full p-10 flex flex-col items-center text-center bg-white rounded-3xl border-2 border-emerald-200 shadow-xl">
          <div className="text-7xl mb-4">🌟</div>
          <h2 className="text-4xl font-black text-slate-900 font-editorial mb-3">Pattern Completed!</h2>
          <p className="text-xl text-emerald-800 font-bold mb-8 max-w-md leading-relaxed">{compliment}</p>
          <Button variant="primary" fullWidth className="py-4 text-xl" onClick={() => navigate('/patient/games')}>
            Return to Games
          </Button>
        </Card>
      )}
    </div>
  );
}