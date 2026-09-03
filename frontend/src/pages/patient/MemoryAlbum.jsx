import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { cn } from '../../utils/cn';

export default function MemoryAlbum() {
  const [selectedMemory, setSelectedMemory] = useState(null);

  const memories = [
    { id: 1, title: 'Raj', subtitle: 'Your son', type: 'person', icon: '👨' },
    { id: 2, title: 'Anita', subtitle: 'Your daughter', type: 'person', icon: '👩' },
    { id: 3, title: 'Your Old Home', subtitle: 'A place you know', type: 'place', icon: '🏠' },
    { id: 4, title: 'Tea Garden', subtitle: 'A familiar place', type: 'place', icon: '🍃' },
    { id: 5, title: 'Family Photo', subtitle: '1998', type: 'photo', icon: '📸' }
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="mb-2">
        <h2 className="text-4xl font-bold text-reminiscence-forest mb-2">My Memories</h2>
        <p className="text-xl text-reminiscence-amber">Familiar faces and places.</p>
      </div>

      {!selectedMemory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {memories.map(memory => (
            <Card 
              key={memory.id}
              interactive
              onClick={() => setSelectedMemory(memory)}
              className="bg-reminiscence-cream border-none flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-orange-50"
            >
              <div className="text-6xl">{memory.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-reminiscence-espresso">{memory.title}</h3>
                <p className="text-reminiscence-forest text-lg font-medium">{memory.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="animate-fade-in flex flex-col items-center max-w-2xl mx-auto w-full">
          <Button 
            variant="ghost" 
            className="self-start mb-6 text-reminiscence-forest font-bold"
            onClick={() => setSelectedMemory(null)}
          >
            ← Back to Album
          </Button>
          
          <Card className="w-full bg-reminiscence-cream border-none p-10 flex flex-col items-center text-center">
            <div className="text-8xl mb-8 bg-white p-8 rounded-full shadow-sm">{selectedMemory.icon}</div>
            <h2 className="text-4xl font-bold text-reminiscence-espresso mb-2">{selectedMemory.title}</h2>
            <p className="text-2xl text-reminiscence-forest mb-12">{selectedMemory.subtitle}</p>
            
            <div className="w-full bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-text mb-8">Do you remember this {selectedMemory.type}?</h3>
              <div className="flex gap-4">
                <Button 
                  className="flex-1 py-4 text-xl bg-reminiscence-bamboo text-reminiscence-forest hover:bg-lime-400 border-none"
                  onClick={() => setSelectedMemory(null)}
                >
                  Yes
                </Button>
                <Button 
                  className="flex-1 py-4 text-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border-none"
                  onClick={() => setSelectedMemory(null)}
                >
                  Not Sure
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
