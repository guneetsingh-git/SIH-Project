import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';

// Multi-thematic decks (Flowers, Animals, North East Heritage, Household Items)
const LEVEL_DECKS = [
  {
    theme: "Tea Garden Blossoms",
    items: [
      { id: 1, icon: '🌺', name: 'Rhododendron' },
      { id: 2, icon: '🍵', name: 'Assam Tea Leaf' },
      { id: 3, icon: '🌼', name: 'Marigold' },
      { id: 4, icon: '🪷', name: 'Lotus' }
    ]
  },
  {
    theme: "Gentle Wildlife",
    items: [
      { id: 1, icon: '🦏', name: 'Kaziranga Rhino' },
      { id: 2, icon: '🐘', name: 'Wild Elephant' },
      { id: 3, icon: '🦜', name: 'Hornbill Bird' },
      { id: 4, icon: '🦌', name: 'Spotted Deer' }
    ]
  },
  {
    theme: "Cozy Morning Essentials",
    items: [
      { id: 1, icon: '☕', name: 'Warm Cup' },
      { id: 2, icon: '🧣', name: 'Warm Shawl' },
      { id: 3, icon: '📖', name: 'Morning Book' },
      { id: 4, icon: '🪞', name: 'Looking Glass' }
    ]
  },
  {
    theme: "Sweet Orchard Fruits",
    items: [
      { id: 1, icon: '🍎', name: 'Sweet Apple' },
      { id: 2, icon: '🥭', name: 'Ripe Mango' },
      { id: 3, icon: '🍌', name: 'Fresh Banana' },
      { id: 4, icon: '🍊', name: 'Orange' }
    ]
  }
];

const COMPLIMENTS = [
  "🌸 Exceptional clarity! Your visual memory is thriving today!",
  "✨ Marvelous! You spotted that with swift and gentle ease!",
  "🌿 Wonderfully focused! Every attempt enriches cognitive strength!",
  "🌟 Glowing effort! Your mind is active, calm, and alert!",
  "🪷 Warm congratulations! You found the exact spot effortlessly!"
];

export default function MemoryGame() {
  const navigate = useNavigate();
  const [deckIndex, setDeckIndex] = useState(0);
  const [stage, setStage] = useState('INTRO');
  const [targetItem, setTargetItem] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [compliment, setCompliment] = useState("");
  const [round, setRound] = useState(1);

  const currentDeck = LEVEL_DECKS[deckIndex % LEVEL_DECKS.length];

  const startRound = () => {
    setStage('MEMORIZE');
    // Pick random target from deck
    const picked = currentDeck.items[Math.floor(Math.random() * currentDeck.items.length)];
    setTargetItem(picked);

    setTimeout(() => {
      setStage('QUESTION');
    }, 2800);
  };

  const handleAnswer = (item) => {
    const isCorrect = item.id === targetItem.id;
    const randomPraise = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    setCompliment(randomPraise);

    if (isCorrect) {
      setFeedback(`🌸 Correct! You found the ${targetItem.name}!`);
    } else {
      setFeedback(`🌿 Gentle effort! You spotted the ${item.name}. Every practice brightens memory!`);
    }

    setTimeout(() => {
      setFeedback(null);
      if (round >= 3) {
        setStage('RESULT');
      } else {
        setRound(prev => prev + 1);
        setDeckIndex(prev => prev + 1); // switch theme randomly
        setStage('MEMORIZE');
        const nextDeck = LEVEL_DECKS[(deckIndex + 1) % LEVEL_DECKS.length];
        const nextPicked = nextDeck.items[Math.floor(Math.random() * nextDeck.items.length)];
        setTargetItem(nextPicked);
        setTimeout(() => setStage('QUESTION'), 2800);
      }
    }, 1800);
  };

  const restartAll = () => {
    setRound(1);
    setDeckIndex(Math.floor(Math.random() * LEVEL_DECKS.length));
    setStage('INTRO');
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto items-center justify-center pt-4">
      {stage === 'INTRO' && (
        <Card className="w-full text-center p-10 flex flex-col items-center bg-white rounded-3xl border-2 border-slate-200 shadow-xl">
          <div className="text-7xl mb-4">🌺</div>
          <h2 className="text-3xl font-black text-slate-900 font-editorial mb-3">Garden Memory Walk</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md leading-relaxed">
            Take a gentle look at the pictures. Notice where each item rests in the garden.
          </p>
          <Button variant="primary" className="py-4 px-10 text-xl font-bold" onClick={startRound}>
            Begin Walk
          </Button>
        </Card>
      )}

      {stage === 'MEMORIZE' && (
        <div className="w-full text-center">
          <div className="inline-block bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
            Theme: {currentDeck.theme} (Round {round} of 3)
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-8 font-editorial">
            Look carefully at these items...
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {currentDeck.items.map(item => (
              <Card key={item.id} className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border-2 border-slate-200 shadow-xs">
                <span className="text-7xl mb-3">{item.icon}</span>
                <span className="text-lg font-bold text-slate-700">{item.name}</span>
              </Card>
            ))}
          </div>
        </div>
      )}

      {stage === 'QUESTION' && (
        <div className="w-full text-center">
          {feedback ? (
            <div className="text-2xl md:text-3xl font-bold p-10 rounded-3xl text-emerald-900 bg-emerald-100/90 border-2 border-emerald-300">
              {feedback}
            </div>
          ) : (
            <>
              <div className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                Round {round} of 3
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-8 font-editorial">
                Where was the <span className="text-emerald-700 underline underline-offset-4">"{targetItem?.name}"</span>?
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {currentDeck.items.map(item => (
                  <Card 
                    key={item.id} 
                    interactive 
                    className="flex items-center justify-center p-12 bg-white hover:bg-emerald-50 rounded-3xl border-2 border-slate-200 active:scale-95 cursor-pointer shadow-xs"
                    onClick={() => handleAnswer(item)}
                  >
                    <span className="text-6xl text-slate-400 font-bold">?</span>
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
          <h2 className="text-4xl font-black text-slate-900 font-editorial mb-3">Heartfelt Effort!</h2>
          <p className="text-xl text-emerald-800 font-bold mb-6 max-w-md leading-relaxed">
            {compliment}
          </p>
          
          <div className="bg-emerald-50 p-5 rounded-2xl w-full border border-emerald-200 mb-8">
            <span className="text-sm font-bold text-emerald-900">
              🌿 "A quiet mind blossoms every single day."
            </span>
          </div>

          <div className="flex gap-4 w-full">
            <Button variant="secondary" fullWidth className="py-4 text-lg" onClick={restartAll}>
              Play Another Theme
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