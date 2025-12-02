import React, { useState } from 'react';
import { RicohRecipe } from '../types';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { RecipeCard } from './RecipeCard';

interface PresetCarouselProps {
  recipes: RicohRecipe[];
}

const CollageBackground: React.FC<{ images: string[] }> = ({ images }) => {
  if (!images || images.length === 0) return null;

  // Layout for 3 images: 1 Left (Large), 2 Right (Stacked)
  if (images.length >= 3) {
    return (
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full relative border-r border-black/10">
           <img src={images[0]} alt="Collage 1" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="w-1/2 h-full flex flex-col">
           <div className="h-1/2 relative border-b border-black/10">
              <img src={images[1]} alt="Collage 2" className="w-full h-full object-cover opacity-90" />
           </div>
           <div className="h-1/2 relative">
              <img src={images[2]} alt="Collage 3" className="w-full h-full object-cover opacity-90" />
           </div>
        </div>
      </div>
    );
  }

  // Fallback for fewer images (e.g. 1 image)
  return (
    <div className="absolute inset-0">
        <img src={images[0]} alt="Cover" className="w-full h-full object-cover opacity-90" />
    </div>
  );
};

export const PresetCarousel: React.FC<PresetCarouselProps> = ({ recipes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % recipes.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  const currentRecipe = recipes[currentIndex];

  return (
    <>
      <div className="relative max-w-lg mx-auto mb-12">
        <h2 className="text-center text-white/50 text-xs font-mono mb-6 uppercase tracking-widest">
          Popular Presets
        </h2>
        
        {/* Main Card View (Clickable) */}
        <div 
          className="relative aspect-[4/5] md:aspect-square bg-gr-dark rounded-xl overflow-hidden shadow-2xl cursor-pointer group transform transition-all hover:scale-[1.02] border border-gray-800"
          onClick={() => setShowDetails(true)}
        >
          {/* Background: Collage or Gradient */}
          {currentRecipe.collageImages && currentRecipe.collageImages.length > 0 ? (
            <CollageBackground images={currentRecipe.collageImages} />
          ) : (
             <div className={`absolute inset-0 ${currentRecipe.previewGradient || 'bg-gray-800'} transition-colors duration-500`}></div>
          )}
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors duration-300 flex flex-col justify-between p-6 md:p-8">
             <div className="flex justify-between items-start">
                <span className="bg-black/50 backdrop-blur text-white/90 text-xs font-mono px-2 py-1 rounded border border-white/20 shadow-sm">
                   {currentRecipe.baseEffect}
                </span>
                <Maximize2 className="text-white/70 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>

             <div className="text-center relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {currentRecipe.vibe}
                </h3>
                <p className="text-white/90 font-mono text-sm tracking-widest uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  {currentRecipe.name}
                </p>
             </div>

             <div className="text-center">
                <span className="text-gr-accent text-xs font-bold border-b border-gr-accent pb-0.5 animate-pulse drop-shadow-md">
                   Tap for Details
                </span>
             </div>
          </div>

          {/* Navigation Buttons (Absolute) */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/70 backdrop-blur rounded-full flex items-center justify-center text-white transition-all border border-white/20 z-20"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/70 backdrop-blur rounded-full flex items-center justify-center text-white transition-all border border-white/20 z-20"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {recipes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-gr-accent w-6' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal for Details */}
      {showDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col">
            <button 
              onClick={() => setShowDetails(false)}
              className="absolute -top-12 right-0 md:-right-12 text-gray-400 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <div className="flex-1 overflow-y-auto rounded-xl custom-scrollbar">
               <RecipeCard recipe={currentRecipe} className="h-auto min-h-0" defaultExpanded={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};