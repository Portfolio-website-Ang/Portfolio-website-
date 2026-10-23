import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, VolumeX, FastForward } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'studio' | 'title' | 'ready'>('studio');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Auto transition timeline
  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('title');
    }, 2400);

    const t2 = setTimeout(() => {
      setPhase('ready');
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Keyboard shortcut: Space, Enter, or Escape skips intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(16px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07040d] text-[#f7f4ee] overflow-hidden select-none"
    >
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e50914] rounded-full blur-[140px] opacity-15 pointer-events-none" />

      {/* Skip button in top right */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider text-[#9e9aa8] hover:text-white uppercase transition-colors rounded-full border border-white/10 hover:border-white/30 backdrop-blur-md"
      >
        <span>Skip Intro</span>
        <FastForward className="w-3.5 h-3.5" />
      </button>

      {/* Phase 1: Studio Opening Card */}
      <AnimatePresence mode="wait">
        {phase === 'studio' && (
          <motion.div
            key="studio"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center px-4"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-[#e5b452] opacity-25 blur-xl animate-pulse" />
              <img
                src={portfolioData.profile.logoImage}
                alt="Al Nibras Group"
                className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover border-2 border-[#e5b452]/40 shadow-glow"
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 font-serif tracking-[0.45em] text-xs sm:text-sm text-[#e5b452] uppercase font-bold"
            >
              {portfolioData.profile.originalLabel}
            </motion.p>
          </motion.div>
        )}

        {/* Phase 2: Title Card */}
        {phase === 'title' && (
          <motion.div
            key="title"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center px-6 max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#e50914] text-white font-bold text-[11px] px-2 py-0.5 rounded font-sans tracking-widest">
                N
              </span>
              <span className="text-[#e5b452] text-xs font-mono tracking-[0.35em] uppercase">
                {portfolioData.profile.seriesBadge}
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-none font-serif text-[#f7f4ee]">
              {portfolioData.profile.name}
            </h1>
            <p className="mt-4 text-[#e5b452] text-sm sm:text-base font-medium tracking-wide">
              {portfolioData.profile.headline}
            </p>
          </motion.div>
        )}

        {/* Phase 3: Ready to Stream */}
        {phase === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center px-6"
          >
            <div className="relative mb-6">
              <img
                src={portfolioData.profile.portraitImage}
                alt={portfolioData.profile.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-[#e50914] shadow-brand"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-[#e5b452] tracking-widest uppercase font-mono mb-2">
              <span>{portfolioData.profile.location}</span>
              <span>·</span>
              <span>HD 4K</span>
              <span>·</span>
              <span>5 SEASONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-6 text-white">
              Watch The Series
            </h2>
            <button
              onClick={onComplete}
              className="group flex items-center gap-3 px-8 py-3.5 bg-white text-[#0a0612] hover:bg-[#e5b452] hover:text-[#0a0612] font-semibold text-base rounded-md transition-all duration-300 shadow-xl cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
              <span>▶ PLAY SERIES</span>
            </button>
            <p className="mt-4 text-xs text-[#9e9aa8]">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">Enter</kbd> to start
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
