import React from 'react';
import { Lock, Construction, Rocket } from 'lucide-react';

export function ComingSoonOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm select-none overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-lg w-full mx-4">
        {/* Main Card */}
        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden group">
          
          {/* Cyberpunk Border Effects */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg"></div>

          <div className="flex flex-col items-center text-center relative z-10">
            {/* Icon Container */}
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
              <div className="relative w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <Rocket className="w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
              </div>
              <div className="absolute -top-2 -right-2 bg-background border border-white/10 rounded-full p-1.5">
                <Lock className="w-4 h-4 text-white/60" />
              </div>
            </div>

            {/* Typography */}
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mb-2 uppercase drop-shadow-sm">
              Coming Soon
            </h2>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50"></div>
              <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">System Under Construction</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50"></div>
            </div>

            <p className="text-white/60 text-sm md:text-base max-w-xs leading-relaxed">
              We are crafting a next-generation experience. This module is currently locked for development.
            </p>

            {/* Progress Bar Simulation */}
            <div className="w-full max-w-[200px] h-1.5 bg-white/5 rounded-full mt-8 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary w-[60%] animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%]"></div>
            </div>
            <p className="text-xs text-white/30 mt-2 font-mono">Development in progress...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
