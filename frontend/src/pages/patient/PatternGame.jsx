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

export default function PatternGame() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(STAGES.INTRO);
  const [feedback, setFeedback] = useState(null);
  const [result, setResult] = useState(null);
  const startTime = useRef(null);

  const startGame = () => {
    setStage(STAGES.QUESTION);
    startTime.current = Date.now();
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === '🔵';
    const reactionTime = (Date.now() - startTime.current) / 1000;
    
    setFeedback(isCorrect ? "Correct!" : "Good try. Let's look at the pattern again.");
    
    if (isCorrect || !isCorrect) {
      setTimeout(() => {
        const games = getGames();
        const currentDiff = games.pattern?.difficulty || 1;
        const accuracy = isCorrect ? 100 : 0;
        const newDiff = calculateNewDifficulty(currentDiff, accuracy, reactionTime);
        const diffMessage = getDifficultyMessage(currentDiff, newDiff, 'Pattern Game');
        
        const gameResult = {
          score: isCorrect ? 10 : 0,
          accuracy: accuracy,
          reactionTime: parseFloat(reactionTime.toFixed(1)),
          difficulty: newDiff
        };
        
        saveGameProgress('pattern', gameResult);
        
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
    <div className="flex flex-col h-full max-w-2xl mx-auto items-center justify-center pt-10">
      {stage === STAGES.INTRO && (
        <Card className="w-full text-center p-10 flex flex-col items-center">
          <div className="text-6xl mb-6">🔷</div>
          <h2 className="text-3xl font-bold text-text mb-4">Pattern Game</h2>
          <p className="text-xl text-slate-600 mb-10">Find what comes next in the sequence.</p>
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
              <h2 className="text-3xl font-bold text-text mb-12">What comes next?</h2>
              
              <Card className="bg-white py-12 px-6 mb-12 flex justify-center gap-4 text-5xl sm:text-6xl">
                <span>🔵</span>
                <span>🟢</span>
                <span>🔵</span>
                <span>🟢</span>
                <span className="text-slate-300 font-bold border-b-4 border-slate-300 pb-2 px-2">?</span>
              </Card>

              <div className="grid grid-cols-3 gap-6">
                {['🔵', '🟢', '🟡'].map(option => (
                  <Card 
                    key={option} 
                    interactive 
                    className="flex items-center justify-center py-10 text-5xl sm:text-6xl hover:bg-blue-50 transition-colors"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
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
