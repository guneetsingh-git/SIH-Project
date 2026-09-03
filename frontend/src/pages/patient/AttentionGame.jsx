import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { saveGameProgress, getGames } from '../../utils/storage';
import { calculateNewDifficulty, getDifficultyMessage } from '../../utils/adaptiveDifficulty';

const STAGES = {
  INTRO: 'INTRO',
  QUESTION: 'QUESTION',
  RESULT: 'RESULT'
};

const ITEMS = [
  { id: 1, icon: '🍎', name: 'apple' },
  { id: 2, icon: '🍵', name: 'cup' },
  { id: 3, icon: '🌸', name: 'flower' },
  { id: 4, icon: '🏠', name: 'house' },
  { id: 5, icon: '🥄', name: 'spoon' }
];

export default function AttentionGame() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(STAGES.INTRO);
  const [feedback, setFeedback] = useState(null);
  const [result, setResult] = useState(null);
  const startTime = useRef(null);

  const startGame = () => {
    setStage(STAGES.QUESTION);
    startTime.current = Date.now();
  };

  const handleAnswer = (item) => {
    const isCorrect = item.name === 'cup'; // Hardcoded for demo
    const reactionTime = (Date.now() - startTime.current) / 1000;
    
    setFeedback(isCorrect ? "Correct!" : "Good try. Look for the cup again.");
    
    if (isCorrect || !isCorrect) {
      setTimeout(() => {
        const games = getGames();
        const currentDiff = games.attention?.difficulty || 1;
        const accuracy = isCorrect ? 100 : 0;
        const newDiff = calculateNewDifficulty(currentDiff, accuracy, reactionTime);
        const diffMessage = getDifficultyMessage(currentDiff, newDiff, 'Attention Game');
        
        const gameResult = {
          score: isCorrect ? 10 : 0,
          accuracy: accuracy,
          reactionTime: parseFloat(reactionTime.toFixed(1)),
          difficulty: newDiff
        };
        
        saveGameProgress('attention', gameResult);
        
        setResult({
          ...gameResult,
          diffMessage
        });
        setStage(STAGES.RESULT);
        setFeedback(null);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto items-center justify-center pt-10">
      {stage === STAGES.INTRO && (
        <Card className="w-full text-center p-10 flex flex-col items-center">
          <div className="text-6xl mb-6">👀</div>
          <h2 className="text-3xl font-bold text-text mb-4">Attention Game</h2>
          <p className="text-xl text-slate-600 mb-10">Find the correct object as fast as you can.</p>
          <Button variant="primary" className="py-4 px-12 text-2xl" onClick={startGame}>
            Start Activity
          </Button>
        </Card>
      )}

      {stage === STAGES.QUESTION && (
        <div className="w-full text-center animate-fade-in">
          {feedback ? (
            <div className={`text-4xl font-bold my-20 p-8 rounded-2xl ${feedback === "Correct!" ? 'text-accent bg-emerald-50' : 'text-slate-600 bg-slate-100'}`}>
              {feedback}
            </div>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-primary mb-12">Find the cup</h2>
              
              <div className="flex flex-wrap justify-center gap-6">
                {ITEMS.map(item => (
                  <Card 
                    key={item.id} 
                    interactive 
                    className="flex items-center justify-center p-8 sm:p-12 text-6xl hover:bg-blue-50 hover:scale-105 transition-all"
                    onClick={() => handleAnswer(item)}
                  >
                    {item.icon}
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
