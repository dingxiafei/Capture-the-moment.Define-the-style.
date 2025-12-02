import React, { useState, useEffect } from 'react';
import { RicohRecipe } from '../types';
import { Camera, Aperture, Timer, Sun, Sliders, Droplets, Contrast, Eye, MoveDiagonal, Hash, Focus, Film, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface RecipeCardProps {
  recipe: RicohRecipe;
  index?: number;
  className?: string;
  defaultExpanded?: boolean;
}

const SettingRow: React.FC<{ label: string; value: string | number | undefined; icon?: React.ReactNode }> = ({ label, value, icon }) => {
  if (value === undefined) return null;
  
  // Determine color for positive/negative values
  const valNum = typeof value === 'number' ? value : parseInt(value as string);
  let valColor = "text-gray-400";
  if (!isNaN(valNum)) {
      if (valNum > 0) valColor = "text-gr-accent";
      if (valNum < 0) valColor = "text-blue-400";
  }

  return (
    <div className="flex items-center justify-between py-1 border-b border-gray-800 last:border-0 text-sm">
      <div className="flex items-center gap-2 text-gray-400">
        {icon && <span className="w-4 h-4">{icon}</span>}
        <span>{label}</span>
      </div>
      <span className={`font-mono font-medium ${valColor}`}>{value > 0 && typeof value === 'number' ? `+${value}` : value}</span>
    </div>
  );
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index = 0, className = "", defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Collect all available images for the carousel
  // Priority: Collage Images -> Sample Image -> nothing
  const carouselImages = recipe.collageImages && recipe.collageImages.length > 0 
    ? recipe.collageImages 
    : (recipe.sampleImage ? [recipe.sampleImage] : []);

  // Auto-play carousel logic
  useEffect(() => {
    if (carouselImages.length <= 1 || !isHovering) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length, isHovering]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };
  
  const renderHeader = () => {
    // 1. Carousel Active (Images exist)
    if (carouselImages.length > 0) {
      return (
        <div 
          className="relative w-full h-full group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Current Image */}
          <img
            src={carouselImages[currentImageIndex]}
            alt={`${recipe.name} reference ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-700"
          />

          {/* Badge */}
          <div className="absolute top-3 right-3 z-10">
             <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10 uppercase tracking-wider shadow-lg">
                <ImageIcon size={10} /> Composition Ref
             </span>
          </div>

          {/* Navigation Controls (Only if multiple images) */}
          {carouselImages.length > 1 && (
            <>
              <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 <button 
                    onClick={prevImage}
                    className="w-8 h-8 bg-black/50 hover:bg-black/80 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/10 pointer-events-auto transition-colors"
                 >
                   <ChevronLeft size={16} />
                 </button>
                 <button 
                    onClick={nextImage}
                    className="w-8 h-8 bg-black/50 hover:bg-black/80 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/10 pointer-events-auto transition-colors"
                 >
                   <ChevronRight size={16} />
                 </button>
              </div>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {carouselImages.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 rounded-full transition-all duration-300 shadow-sm ${idx === currentImageIndex ? 'w-4 bg-white' : 'w-1 bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      );
    }
    
    // 2. Fallback Gradient
    return (
        <div className={`w-full h-full ${recipe.previewGradient || 'bg-gray-800'} flex items-center justify-center`}>
            <div className="text-white/20 font-bold text-4xl uppercase tracking-widest rotate-[-10deg]">
                {recipe.vibe}
            </div>
        </div>
    );
  };

  return (
    <div className={`bg-gr-black border border-gray-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-fit animate-fade-in-up transition-all duration-300 ${className}`} style={{ animationDelay: `${index * 150}ms` }}>
      
      {/* Header Visual Area */}
      <div className="w-full h-64 relative overflow-hidden bg-gray-900 shrink-0">
        {renderHeader()}
        {/* Subtle gradient overlay for text readability at bottom if needed, though we moved text out */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>

      {/* Info Header */}
      <div className="bg-gradient-to-r from-gr-dark to-gr-black p-4 border-b border-gray-800 flex justify-between items-start shrink-0">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">{recipe.name}</h3>
          <p className="text-gr-accent text-xs font-mono uppercase tracking-wider mt-1">{recipe.baseEffect}</p>
        </div>
        <div className="text-xs text-gray-500 font-mono bg-gray-900 px-2 py-1 rounded border border-gray-800">
          {recipe.vibe}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed italic">
          "{recipe.description}"
        </p>

        {/* Expansion Trigger */}
        {!defaultExpanded && (
            <div className="flex justify-center mt-2">
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gr-accent hover:text-white transition-colors"
                >
                    {isExpanded ? (
                        <>Hide Parameters <ChevronUp size={14} /></>
                    ) : (
                        <>View Parameters <ChevronDown size={14} /></>
                    )}
                </button>
            </div>
        )}

        {/* Collapsible Content */}
        {isExpanded && (
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 animate-fade-in ${!defaultExpanded ? 'border-t border-gray-800/50 pt-6' : ''}`}>
            
            {/* Left Column: Style Parameters */}
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">
                <h4 className="text-gray-500 text-xs uppercase font-bold mb-3 flex items-center gap-2">
                <Sliders size={14} /> Style Parameters
                </h4>
                <div className="space-y-1">
                {/* Effect Name */}
                <div className="flex items-center justify-between py-1 border-b border-gray-800 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Film size={14} />
                        <span>Effect</span>
                    </div>
                    <span className="font-mono font-medium text-white">{recipe.baseEffect}</span>
                </div>

                {/* Standard Image Controls */}
                <SettingRow label="Saturation" value={recipe.settings.saturation} icon={<Droplets size={12} />} />
                <SettingRow label="Hue" value={recipe.settings.hue} />
                <SettingRow label="High/Low Key" value={recipe.settings.highLowKey} />
                <SettingRow label="Contrast" value={recipe.settings.contrast} icon={<Contrast size={12} />} />
                <SettingRow label="Highlight" value={recipe.settings.contrastHighlight} />
                <SettingRow label="Shadow" value={recipe.settings.contrastShadow} />
                <SettingRow label="Sharpness" value={recipe.settings.sharpness} icon={<Eye size={12} />} />
                <SettingRow label="Shading" value={recipe.settings.shading} />
                <SettingRow label="Clarity" value={recipe.settings.clarity} icon={<MoveDiagonal size={12} />} />
                <SettingRow label="Grain" value={recipe.settings.grain} icon={<Hash size={12} />} />
                {recipe.settings.toning && <SettingRow label="Toning" value={recipe.settings.toning} />}
                {recipe.settings.filterEffect && <SettingRow label="Filter" value={recipe.settings.filterEffect} />}

                {/* White Balance (Integrated) */}
                <div className="flex items-center justify-between py-1 border-b border-gray-800 last:border-0 text-sm mt-2 pt-2 border-t border-gray-800/50">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Sun size={14} />
                        <span>White Balance</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <span className="font-mono font-medium text-white text-xs sm:text-sm">{recipe.shootingParams.whiteBalance}</span>
                        {recipe.shootingParams.wbCorrection && (
                            <span className="font-mono text-[10px] text-gr-accent/80">{recipe.shootingParams.wbCorrection}</span>
                        )}
                    </div>
                </div>
                </div>
            </div>

            {/* Right Column: Shooting Info & Composition */}
            <div className="flex flex-col gap-4">
                {/* Shooting Info */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50 h-fit">
                    <h4 className="text-gray-500 text-xs uppercase font-bold mb-3 flex items-center gap-2">
                        <Camera size={14} /> Shooting Info
                    </h4>
                    <div className="space-y-1">
                        <SettingRow label="Aperture" value={recipe.shootingParams.aperture} icon={<Aperture size={12} />} />
                        <SettingRow label="Shutter" value={recipe.shootingParams.shutterSpeed} icon={<Timer size={12} />} />
                        <SettingRow label="ISO" value={recipe.shootingParams.iso} />
                        <SettingRow label="Exp. Comp" value={recipe.shootingParams.exposureCompensation} />
                        {recipe.shootingParams.metering && <SettingRow label="Metering" value={recipe.shootingParams.metering} icon={<Focus size={12} />} />}
                    </div>
                </div>

                {/* Composition Guide (New Section) */}
                {recipe.compositionTips && recipe.compositionTips.length > 0 && (
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50 flex-1">
                         <h4 className="text-gray-500 text-xs uppercase font-bold mb-3 flex items-center gap-2">
                            <Focus size={14} /> Composition Guide
                        </h4>
                        
                        {/* Mini Gallery for Reference if expanded and not using header strictly */}
                        {recipe.collageImages && recipe.collageImages.length > 0 && (
                             <div className="grid grid-cols-3 gap-1 mb-3 opacity-60 hover:opacity-100 transition-opacity">
                                {recipe.collageImages.slice(0,3).map((img, i) => (
                                    <div key={i} className="aspect-square rounded overflow-hidden">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                             </div>
                        )}

                        <ul className="space-y-2">
                            {recipe.compositionTips.map((tip, i) => (
                                <li key={i} className="text-xs text-gray-400 flex gap-2 leading-relaxed">
                                    <span className="text-gr-accent mt-0.5">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            </div>
        )}
      </div>
    </div>
  );
};