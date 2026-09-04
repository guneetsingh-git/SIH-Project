import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Upload, Heart, Trash2 } from 'lucide-react';

const INITIAL_MEMORIES = [
  { id: 1, title: 'Rahul', relation: 'Your son', year: '1 year ago at Bihu Festival', photo: '👨‍🌾', isCustomImage: false },
  { id: 2, title: 'Anita', relation: 'Your daughter', year: 'Guwahati family tea reunion', photo: '👩‍🏫', isCustomImage: false }
];

export default function MemoryAlbum() {
  const [memories, setMemories] = useState([]);
  const [featuredMemory, setFeaturedMemory] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('cognito_family_photos');
    if (saved) {
      try {
        setMemories(JSON.parse(saved));
      } catch {
        setMemories(INITIAL_MEMORIES);
      }
    } else {
      setMemories(INITIAL_MEMORIES);
      localStorage.setItem('cognito_family_photos', JSON.stringify(INITIAL_MEMORIES));
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMemory = {
          id: Date.now(),
          title: 'Family Treasure',
          relation: 'Loved One',
          year: 'Recently added memory',
          photo: reader.result,
          isCustomImage: true
        };
        const updated = [newMemory, ...memories];
        setMemories(updated);
        localStorage.setItem('cognito_family_photos', JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (id, e) => {
    e.stopPropagation();
    const updated = memories.filter(item => item.id !== id);
    setMemories(updated);
    localStorage.setItem('cognito_family_photos', JSON.stringify(updated));
    if (featuredMemory?.id === id) {
      setFeaturedMemory(null);
    }
  };

  const showRandomMemory = () => {
    if (memories.length === 0) return;
    const random = memories[Math.floor(Math.random() * memories.length)];
    setFeaturedMemory(random);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-[#1B4332] font-editorial mb-1">
            Amar Poriyal • Family Album
          </h2>
          <p className="text-xl text-slate-600">Faces and moments that cherish you forever.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="secondary" onClick={showRandomMemory} className="text-lg">
            Surprise Me 🌸
          </Button>
          <label className="cursor-pointer inline-flex items-center justify-center rounded-2xl font-bold bg-emerald-700 text-white px-6 py-3 text-lg hover:bg-emerald-800 shadow-sm active:scale-95 transition-all">
            <Upload className="mr-2 w-6 h-6" /> Add Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {/* Featured Photo Modal/Card */}
      {featuredMemory && (
        <Card className="bg-amber-50/80 border-2 border-amber-300 p-8 rounded-3xl text-center shadow-md relative">
          <button 
            onClick={() => setFeaturedMemory(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-bold bg-white px-3 py-1 rounded-full border border-slate-200"
          >
            Close
          </button>
          <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center justify-center gap-2 font-editorial">
            <Heart className="text-rose-500 fill-rose-500" /> Remember This Moment
          </h3>
          <div className="w-60 h-60 mx-auto mb-4 rounded-3xl overflow-hidden shadow-xl border-4 border-white flex items-center justify-center bg-white text-7xl">
            {featuredMemory.isCustomImage ? (
              <img src={featuredMemory.photo} alt={featuredMemory.title} className="w-full h-full object-cover" />
            ) : (
              featuredMemory.photo
            )}
          </div>
          <h4 className="text-3xl font-extrabold text-slate-900 font-editorial">{featuredMemory.title}</h4>
          <p className="text-2xl text-emerald-800 font-bold mb-1">{featuredMemory.relation}</p>
          <p className="text-base text-slate-600 font-medium">{featuredMemory.year}</p>
        </Card>
      )}

      {/* Photo Grid with Delete Action */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        {memories.map(m => (
          <Card key={m.id} className="p-6 flex items-center justify-between rounded-3xl border-2 border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-amber-50 flex items-center justify-center text-5xl shrink-0 border border-amber-200">
                {m.isCustomImage ? (
                  <img src={m.photo} alt={m.title} className="w-full h-full object-cover" />
                ) : (
                  m.photo
                )}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900 font-editorial">{m.title}</h4>
                <p className="text-lg text-emerald-800 font-bold">{m.relation}</p>
                <p className="text-slate-500 text-sm mt-0.5">{m.year}</p>
              </div>
            </div>

            <button
              onClick={(e) => handleDeletePhoto(m.id, e)}
              className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors cursor-pointer"
              title="Delete Photo"
              aria-label={`Delete photo of ${m.title}`}
            >
              <Trash2 size={24} />
            </button>
          </Card>
        ))}
      </div>

      {memories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8">
          <p className="text-xl text-slate-500 font-medium">No family photos added yet.</p>
          <p className="text-sm text-slate-400 mt-1">Tap "Add Photo" above to store memorable family moments.</p>
        </div>
      )}
    </div>
  );
}