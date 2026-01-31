import React from 'react';

export function ComingSoonOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-[2px] select-none">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
        
        <div className="relative bg-black/80 border border-white/10 px-8 py-4 rounded-xl shadow-2xl backdrop-blur-md">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wider uppercase">
            Coming Soon
          </h2>
          <p className="text-center text-white/60 mt-2 text-sm">
            This feature is currently under development
          </p>
        </div>
      </div>
    </div>
  );
}
