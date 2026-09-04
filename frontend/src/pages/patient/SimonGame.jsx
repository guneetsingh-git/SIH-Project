import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';

const COLORS = ['green', 'red', 'yellow', 'blue'];

const PADS = [
  { id: 'green', label: '🌿 Meadow', color: 'bg-emerald-500 hover:bg-emerald-400', activeRing: 'ring-8 ring-emerald-300 scale-95 brightness-125' },
  { id: 'red', label: '🌺 Rose', color: 'bg-rose-500 hover:bg-rose-400', activeRing: 'ring-8 ring-rose-300 scale-95 brightness-125' },
  { id: 'yellow', label: '☀️ Sun', color: 'bg-amber-400 hover:bg-amber-300', activeRing: 'ring-8 ring-amber-200 scale-95 brightness-125' },
  { id: 'blue', label: '🌊 River', color: 'bg-sky-500 hover:bg-sky-400', activeRing: 'ring-8 ring-sky-300 scale-95 brightness-125' }
];

const COMPLIMENTS = [
  "🌸 Outstanding rhythm! Your focus is truly sharp today!",
  "✨ Wonderful! Your mind caught that melody with pure grace!",
  "🌿 Superb effort! Every round keeps your neural paths alive!",
  "💎 Magnificent memory! You are flowing like a clear river!",
  "🌟 Beautifully played! That was pure harmony!"
];

export default function SimonGame() {
  const navigate = useNavigate();
  const [sequence, setSequence] = useState([]);
  const [userStep, setUserStep] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [isPlayingSeq, setIsPlayingSeq] = useState(false);
  const [gameStage, setGameStage] = useState('INTRO'); // INTRO, PLAYING, RESULT
  const [message, setMessage] = useState("Watch the joyful colors light up!");
  const [compliment, setCompliment] = useState("");
  const [roundsCompleted, setRoundsCompleted] = useState(0);

  const startNextRound = (currentSeq) => {
    // Pick random pad
    const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const updated = [...currentSeq, nextColor];
    setSequence(updated);
    setUserStep(0);
    playSequence(updated);
  };

  const playSequence = (seqToPlay) => {
    setIsPlayingSeq(true);
    setMessage("Listen & observe the pattern...");

    seqToPlay.forEach((col, idx) => {
      setTimeout(() => {
        setActivePad(col);
        setTimeout(() => setActivePad(null), 500);

        if (idx === seqToPlay.length - 1) {
          setTimeout(() => {
            setIsPlayingSeq(false);
            setMessage("Your turn! Tap the colors in order 🌸");
          }, 600);
        }
      }, (idx + 1) * 850);
    });
  };

  const handlePadClick = (colorId) => {
    if (isPlayingSeq || gameStage !== 'PLAYING') return;

    // Flash tapped pad
    setActivePad(colorId);
    setTimeout(() => setActivePad(null), 250);

    if (colorId === sequence[userStep]) {
      const nextStep = userStep + 1;
      if (nextStep === sequence.length) {
        // Round passed!
        const nextRound = roundsCompleted + 1;
        setRoundsCompleted(nextRound);
        setMessage("🎉 Splendid memory! Moving to next note...");

        if (nextRound >= 3) {
          // Completed session
          setCompliment(COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]);
          setTimeout(() => setGameStage('RESULT'), 1000);
        } else {
          setTimeout(() => startNextRound(sequence), 1200);
        }
      } else {
        setUserStep(nextStep);
      }
    } else {
      // Friendly non-negative finish
      setCompliment("🌿 Admirable rhythm! You held wonderful concentration throughout the sequence.");
      setTimeout(() => setGameStage('RESULT'), 800);
    }
  };

  const startGame = () => {
    setGameStage('PLAYING');
    setRoundsCompleted(0);
    startNextRound([]);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto pt-4">
      {gameStage === 'INTRO' && (
        <Card className="w-full text-center p-10 bg-white rounded-3xl border-2 border-slate-200 shadow-xl">
          <div className="text-7xl mb-4">🔔</div>
          <h2 className="text-3xl font-black text-slate-900 font-editorial mb-3">Simon Rhythm Bells</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Follow the gentle sequence of lights and bells. Great for rhythm, attention, and sensory memory.
          </p>
          <Button variant="primary" className="py-4 px-10 text-xl font-bold" onClick={startGame}>
            Start Rhythm
          </Button>
        </Card>
      )}

      {gameStage === 'PLAYING' && (
        <Card className="w-full text-center p-8 bg-white rounded-3xl border-2 border-slate-200 shadow-xl">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Round {roundsCompleted + 1}
            </span>
            <span className="text-xs font-bold text-slate-400">Step {userStep} of {sequence.length}</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-6 font-editorial">{message}</h3>

          <div className="grid grid-cols-2 gap-5 max-w-xs mx-auto mb-6">
            {PADS.map(pad => (
              <button
                key={pad.id}
                disabled={isPlayingSeq}
                onClick={() => handlePadClick(pad.id)}
                className={`h-32 rounded-3xl shadow-md transition-all duration-150 cursor-pointer flex flex-col items-center justify-center text-white font-bold text-sm select-none ${pad.color} ${
                  activePad === pad.id ? pad.activeRing : ''
                } ${isPlayingSeq ? 'cursor-not-allowed opacity-90' : 'active:scale-95'}`}
              >
                <span className="text-3xl mb-1">{pad.id === 'green' ? '🌿' : pad.id === 'red' ? '🌺' : pad.id === 'yellow' ? '☀️' : '🌊'}</span>
                <span>{pad.label}</span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {gameStage === 'RESULT' && (
        <Card className="w-full p-10 flex flex-col items-center text-center bg-white rounded-3xl border-2 border-emerald-200 shadow-xl">
          <div className="text-7xl mb-4">🌟</div>
          <h2 className="text-4xl font-black text-slate-900 font-editorial mb-3">Heartfelt Rhythm!</h2>
          <p className="text-xl text-emerald-800 font-bold mb-6 max-w-md">
            {compliment}
          </p>
          
          <div className="bg-emerald-50 p-5 rounded-2xl w-full border border-emerald-200 mb-8">
            <span className="text-sm font-bold text-emerald-900 block">
              Completed {roundsCompleted} beautiful sound sequence(s) today!
            </span>
          </div>

          <div className="flex gap-4 w-full">
            <Button variant="secondary" fullWidth className="py-4 text-lg" onClick={startGame}>
              Play Again
            </Button>
            <Button variant="primary" fullWidth className="py-4 text-lg" onClick={() => navigate('/patient/games')}>
              Return to Games
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}