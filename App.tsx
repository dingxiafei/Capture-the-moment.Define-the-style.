import React, { useState } from 'react';
import { generateRicohRecipes } from './services/geminiService';
import { RicohRecipe } from './types';
import { RecipeCard } from './components/RecipeCard';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { PresetGallery } from './components/PresetGallery';
import { defaultRecipes } from './data/defaultRecipes';
import { Camera, Search, Aperture, Info, Library } from 'lucide-react';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [recipes, setRecipes] = useState<RicohRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState<boolean>(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const data = await generateRicohRecipes(prompt);
      setRecipes(data.recipes);
    } catch (err) {
      setError("Failed to generate recipes. Please check your network or try a different description.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-gr-text font-sans selection:bg-gr-accent selection:text-black pb-20">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-[#1a1a1a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setRecipes([]); setPrompt(""); }}>
            <div className="w-8 h-8 bg-gr-accent rounded-sm flex items-center justify-center text-black">
              <span className="font-bold text-lg font-mono">GR</span>
            </div>
            <span className="font-semibold tracking-tight text-white hidden sm:block">Lens <span className="text-gray-500 font-normal">| Recipe Generator</span></span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1"><Aperture size={14}/> F2.8</span>
            <span className="hidden sm:inline">28mm EQ</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero / Input Section */}
        <section className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Capture the <span className="text-gr-accent">moment</span>.<br/>
            Define the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">style</span>.
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Describe your scene, lighting, or desired mood. AI will engineer 5 custom Ricoh GR III/x recipes and shooting parameters for you.
          </p>

          <form onSubmit={handleGenerate} className="relative group mb-6">
            <div className="absolute inset-0 bg-gr-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Neon rainy night in Shinjuku, high contrast cyberpunk..."
                className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-6 py-4 pr-14 rounded-xl focus:outline-none focus:border-gr-accent focus:ring-1 focus:ring-gr-accent transition-all shadow-lg placeholder:text-gray-600 font-mono text-sm"
              />
              <button 
                type="submit"
                disabled={loading || !prompt.trim()}
                className="absolute right-2 p-2 bg-gr-accent text-black rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : <Search size={20} />}
              </button>
            </div>
          </form>

          {/* Quick suggestions & Library Entry */}
          <div className="flex flex-col items-center gap-4">
             <div className="flex flex-wrap justify-center gap-2 text-xs font-mono text-gray-500">
              <span className="opacity-50">Try:</span>
              {["Sunny Beach", "Urban Night", "Cloudy Portrait", "Minimalist Architecture"].map((s) => (
                <button 
                  key={s}
                  onClick={() => setPrompt(s)}
                  className="hover:text-gr-accent transition-colors border border-gray-800 px-2 py-1 rounded hover:border-gr-accent/50"
                >
                  {s}
                </button>
              ))}
            </div>
            
            <div className="text-gray-700 text-xs">or</div>

            <button 
              onClick={() => setShowGallery(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 border border-gray-700 rounded-full text-gray-300 hover:text-white hover:border-gray-500 transition-all text-sm font-medium group"
            >
              <Library size={16} className="group-hover:text-gr-accent transition-colors" />
              <span>Browse Preset Library</span>
            </button>
          </div>
        </section>

        {/* Results Section */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-900/50 text-red-400 rounded-lg text-center mb-8">
            {error}
          </div>
        )}

        {loading && <LoadingSkeleton />}

        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in items-start">
            {recipes.map((recipe, idx) => (
              <RecipeCard key={idx} recipe={recipe} index={idx} />
            ))}
          </div>
        )}

        {/* Gallery Overlay */}
        {showGallery && (
          <PresetGallery recipes={defaultRecipes} onClose={() => setShowGallery(false)} />
        )}
        
        {/* Info Footer */}
        <div className="mt-20 pt-8 border-t border-gray-900 text-center">
            <p className="text-gray-600 text-xs flex items-center justify-center gap-2">
                <Info size={12}/> 
                Parameters compatible with Ricoh GR III and GR IIIx. 
                Values are AI-generated suggestions or based on popular community recipes.
            </p>
        </div>
      </main>
    </div>
  );
};

export default App;