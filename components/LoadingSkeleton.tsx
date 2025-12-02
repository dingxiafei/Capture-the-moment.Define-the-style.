import React from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[0, 1, 2].map((i) => (
        <div key={i} className="bg-gr-black border border-gray-800 rounded-xl overflow-hidden shadow-xl animate-pulse flex flex-col h-full">
           {/* Image Placeholder */}
           <div className="h-56 bg-gray-900/80 flex items-center justify-center border-b border-gray-800">
             <ImageIcon className="w-12 h-12 text-gray-800" />
           </div>

           {/* Header Placeholder */}
           <div className="p-4 border-b border-gray-800 space-y-3">
             <div className="h-6 bg-gray-800 rounded w-1/2"></div>
             <div className="h-3 bg-gray-800/60 rounded w-1/4"></div>
           </div>

           {/* Body */}
           <div className="p-5 space-y-6">
              <div className="space-y-2">
                <div className="h-2 bg-gray-800 rounded w-full"></div>
                <div className="h-2 bg-gray-800 rounded w-5/6"></div>
              </div>
              
              <div className="flex justify-center">
                  <div className="h-8 w-32 bg-gray-900 rounded-full"></div>
              </div>
           </div>
           
           <div className="p-4 flex justify-center items-center gap-2 text-xs text-gr-accent font-mono uppercase tracking-widest opacity-80 mt-auto border-t border-gray-800/50">
               {i === 0 ? (
                 <>
                   <span className="animate-spin">⟳</span> Developing Recipe...
                 </>
               ) : (
                 <>
                    <Camera className="w-3 h-3 animate-ping" /> Printing Sample...
                 </>
               )}
           </div>
        </div>
      ))}
    </div>
  );
};