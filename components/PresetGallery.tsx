import React, { useState, useMemo } from 'react';
import { RicohRecipe } from '../types';
import { X, Maximize2 } from 'lucide-react';
import { RecipeCard } from './RecipeCard';

interface PresetGalleryProps {
  recipes: RicohRecipe[];
  onClose: () => void;
}

const GalleryCollage: React.FC<{ images: string[] }> = ({ images }) => {
  if (!images || images.length === 0) return null;
  // Compact 2x2 grid for gallery thumbnails if 4 images, or stacked 
  // Let's stick to the 1-Left 2-Right layout but smaller
  return (
    <div className="absolute inset-0 flex pointer-events-none">
      <div className="w-2/3 h-full relative border-r border-black/10">
         <img src={images[0]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/3 h-full flex flex-col">
         {images[1] && (
             <div className="h-1/2 relative border-b border-black/10">
                <img src={images[1]} alt="" className="w-full h-full object-cover" />
             </div>
         )}
         {images[2] && (
             <div className="h-1/2 relative">
                <img src={images[2]} alt="" className="w-full h-full object-cover" />
             </div>
         )}
      </div>
    </div>
  );
};

export const PresetGallery: React.FC<PresetGalleryProps> = ({ recipes, onClose }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<RicohRecipe | null>(null);

  // Group recipes by category
  const categories = useMemo(() => {
    const grouped: Record<string, RicohRecipe[]> = {};
    recipes.forEach(recipe => {
      const cat = recipe.category || "Uncategorized";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(recipe);
    });
    return grouped;
  }, [recipes]);

  return (
    <div className="fixed inset-0 z-[60] bg-[#111] animate-fade-in flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center border-b border-gray-800 bg-[#1a1a1a]">
        <h2 className="text-xl font-bold text-white tracking-tight">Preset Library</h2>
        <button 
          onClick={onClose}
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-12 pb-20">
        {(Object.entries(categories) as [string, RicohRecipe[]][]).map(([categoryName, categoryRecipes]) => (
          <div key={categoryName} className="space-y-4">
            <h3 className="text-gr-accent font-mono text-xs uppercase tracking-widest border-l-2 border-gr-accent pl-3">
              {categoryName}
            </h3>
            
            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
              {categoryRecipes.map((recipe) => (
                <div 
                  key={recipe.id || recipe.name}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="snap-center shrink-0 w-64 aspect-[3/4] relative rounded-xl overflow-hidden border border-gray-800 bg-gray-900 cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
                >
                   {/* Background Image */}
                   {recipe.collageImages ? (
                       <GalleryCollage images={recipe.collageImages} />
                   ) : (
                       <div className={`absolute inset-0 ${recipe.previewGradient || 'bg-gray-800'}`}></div>
                   )}
                   
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10 flex flex-col justify-end p-4">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-[10px] bg-gr-accent/90 text-black px-1.5 py-0.5 rounded font-bold uppercase mb-2 inline-block">
                            {recipe.baseEffect}
                        </span>
                        <h4 className="text-lg font-bold text-white leading-tight mb-1">{recipe.name}</h4>
                        <p className="text-xs text-gray-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           {recipe.vibe}
                        </p>
                      </div>
                      
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Maximize2 size={16} className="text-white drop-shadow-md" />
                      </div>
                   </div>
                </div>
              ))}
              
              {/* Spacer for right padding in scroll */}
              <div className="w-2 shrink-0"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal (Nested) */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col">
            <button 
              onClick={() => setSelectedRecipe(null)}
              className="absolute -top-12 right-0 md:-right-12 text-gray-400 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <div className="flex-1 overflow-y-auto rounded-xl custom-scrollbar border border-gray-800 shadow-2xl">
               <RecipeCard recipe={selectedRecipe} className="h-auto min-h-0 shadow-none border-0" defaultExpanded={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};