import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { saveGameProgress, getGames } from '../../utils/storage';
import { calculateNewDifficulty, getDifficultyMessage } from '../../utils/adaptiveDifficulty';

const STAGES = {
  INTRO: 'INTRO',
  MEMORIZE: 'MEMORIZE',
  QUESTION: 'QUESTION',
  RESULT: 'RESULT'
};

const ITEMS = [
  { id: 1, icon: '🍵', name: 'Tea' },
  { id: 2, icon: '🌸', name: 'Flower' },
  { id: 3, icon: '🏠', name: 'House' },
  { id: 4, icon: '🐟', name: 'Fish' }
];

export default function MemoryGame() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(STAGES.INTRO);
  const [targetItem, setTargetItem] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [result, setResult] = useState(null);
  const startTime = useRef(null);

  const [currentDiff, setCurrentDiff] = useState(1);

  useEffect(() => {
    const games = getGames();
    if (games.memory) {
      setCurrentDiff(games.memory.difficulty);
    }
  }, []);

  const startGame = () => {
    setStage(STAGES.MEMORIZE);
    // After 3 seconds, move to question
    setTimeout(() => {
      // Pick random item to ask about
      const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      setTargetItem(randomItem);
      setStage(STAGES.QUESTION);
      startTime.current = Date.now();
    }, 3000);
  };

  const handleAnswer = (item) => {
    const isCorrect = item.id === targetItem.id;
    const reactionTime = (Date.now() - startTime.current) / 1000;
    
    setFeedback(isCorrect ? "Well done!" : "That's okay. Let's try again.");
    
    setTimeout(() => {
      // Calculate results
      const accuracy = isCorrect ? 100 : 0; // Simple binary for MVP
      const newDiff = calculateNewDifficulty(currentDiff, accuracy, reactionTime);
      const diffMessage = getDifficultyMessage(currentDiff, newDiff, 'Memory Game');
      
      const gameResult = {
        score: isCorrect ? 10 : 0,
        accuracy: accuracy,
        reactionTime: parseFloat(reactionTime.toFixed(1)),
        difficulty: newDiff
      };
      
      saveGameProgress('memory', gameResult);
      
      setResult({
        ...gameResult,
        diffMessage
      });
      setStage(STAGES.RESULT);
      setFeedback(null);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto items-center justify-center pt-10">
      {stage === STAGES.INTRO && (
        <Card className="w-full text-center p-10 flex flex-col items-center">
          <div className="text-6xl mb-6">🧠</div>
          <h2 className="text-3xl font-bold text-text mb-4">Memory Game</h2>
          <p className="text-xl text-slate-600 mb-10">Remember the pictures you see on the screen.</p>
          <Button variant="primary" className="py-4 px-12 text-2xl" onClick={startGame}>
            Start Activity
          </Button>
        </Card>
      )}

      {stage === STAGES.MEMORIZE && (
        <div className="w-full text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-primary mb-12">Look carefully...</h2>
          <div className="grid grid-cols-2 gap-8">
            {ITEMS.map(item => (
              <Card key={item.id} className="flex items-center justify-center p-12 bg-white">
                <span className="text-8xl">{item.icon}</span>
              </Card>
            ))}
          </div>
        </div>
      )}

      {stage === STAGES.QUESTION && (
        <div className="w-full text-center animate-fade-in">
          {feedback ? (
            <div className={`text-4xl font-bold my-20 p-8 rounded-2xl ${feedback === "Well done!" ? 'text-accent bg-emerald-50' : 'text-slate-600 bg-slate-100'}`}>
              {feedback}
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-text mb-12">Where was the {targetItem.name}?</h2>
              <div className="grid grid-cols-2 gap-8">
                {ITEMS.map(item => (
                  <Card 
                    key={item.id} 
                    interactive 
                    className="flex items-center justify-center p-12 bg-white hover:bg-blue-50"
                    onClick={() => handleAnswer(item)}
                  >
                    <span className="text-8xl opacity-0 hover:opacity-0 transition-opacity">❓</span>
                    {/* The items are hidden, we just show question marks or blank cards */}
                    <span className="absolute text-5xl text-slate-300">?</span>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {stage === STAGES.RESULT && result && (
        <Card className="w-full p-10 flex flex-col items-center text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-primary mb-2">Great work!</h2>
          <p className="text-xl text-slate-600 mb-8">Activity completed successfully.</p>
          
          <div className="grid grid-cols-2 w-full gap-4 mb-8">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="text-sm font-bold text-slate-400 uppercase">Score</div>
              <div className="text-3xl font-bold text-text">{result.score} / 10</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="text-sm font-bold text-slate-400 uppercase">Accuracy</div>
              <div className="text-3xl font-bold text-text">{result.accuracy}%</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl col-span-2">
              <div className="text-sm font-bold text-slate-400 uppercase">Time</div>
              <div className="text-3xl font-bold text-text">{result.reactionTime} seconds</div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 w-full p-6 rounded-2xl mb-8 flex flex-col items-center">
            <span className="text-2xl mb-2">🤖</span>
            <h4 className="font-bold text-primary mb-1">Your activities are being personalized</h4>
            <p className="text-slate-700">{result.diffMessage}</p>
          </div>
          
          <Button variant="primary" fullWidth className="py-4 text-xl" onClick={() => navigate('/patient/games')}>
            Next Activity
          </Button>
        </Card>
      )}
    </div>
  );
}
