import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Flame } from 'lucide-react';
import { portfolioData, OriginalItem } from '../data/portfolio';
import { handleImageError } from '../utils/assets';

interface OriginalsRailProps {
  onSelectOriginal: (original: OriginalItem) => void;
  focusedIndex?: number | null;
}

export const OriginalsRail: React.FC<OriginalsRailProps> = ({ onSelectOriginal, focusedIndex }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="originals" className="scroll-mt-24 py-20 bg-gradient-to-b from-transparent via-[#130d1e]/40 to-transparent">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-xs tracking-[0.4em] text-[#e5b452] uppercase font-bold">
              EPISODE 03 · AL NIBRAS ORIGINALS
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight flex items-center gap-3">
              <span>What We Build</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-sans font-medium px-2.5 py-1 rounded-full bg-[#e50914]/20 border border-[#e50914]/40 text-[#e50914]">
                <Flame className="w-3.5 h-3.5 fill-current" />
                Originals
              </span>
            </h2>
          </div>

          {/* Desktop Rail Scroll Buttons & Keyboard Hints */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#9e9aa8] mr-1 hidden md:inline">
              Use keys <kbd className="px-1 py-0.5 rounded bg-white/10 text-[#e5b452] font-mono">←</kbd> <kbd className="px-1 py-0.5 rounded bg-white/10 text-[#e5b452] font-mono">→</kbd>
            </span>
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 transition-colors cursor-pointer"
              aria-label="Previous originals (Left Arrow)"
              title="Scroll Left (← Arrow Key)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 transition-colors cursor-pointer"
              aria-label="Next originals (Right Arrow)"
              title="Scroll Right (→ Arrow Key)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Snap Rail */}
        <div
          id="originals-rail-container"
          ref={scrollRef}
          className="no-scrollbar flex snap-x gap-5 overflow-x-auto pb-4 scroll-smooth"
        >
          {portfolioData.originals.map((original, idx) => {
            const isFocused = focusedIndex === idx;
            return (
              <motion.article
                key={original.id}
                id={`original-card-${idx}`}
                tabIndex={0}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => onSelectOriginal(original)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSelectOriginal(original);
                }}
                className={`group relative h-84 w-68 sm:w-72 shrink-0 snap-start overflow-hidden rounded-2xl border transition-all duration-300 bg-[#130d1e] shadow-xl cursor-pointer ${
                  isFocused
                    ? 'border-[#e50914] ring-2 ring-[#e50914] shadow-glow scale-[1.02]'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
              {/* Background Art */}
              <img
                src={portfolioData.profile.bannerImage}
                onError={(e) => handleImageError(e, 'assets/faizan/alnibras-banner.jpg')}
                alt={original.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                style={{ objectPosition: `${12 + idx * 18}% 50%` }}
              />

              {/* Ambient Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Top N Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-[#e50914] text-white flex items-center justify-center font-bold text-[10px]">
                  N
                </span>
                <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                  ORIGINAL
                </span>
              </div>

              {/* Bottom Card Copy */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <p className="text-[11px] font-mono font-bold tracking-widest text-[#e5b452] uppercase">
                  {original.genre}
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-white group-hover:text-[#e5b452] transition-colors">
                  {original.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#f7f4ee]/80 line-clamp-2">
                  {original.description}
                </p>
                {original.impactMetrics && (
                  <p className="mt-3 text-[11px] text-[#e0245e] font-mono font-semibold">
                    {original.impactMetrics}
                  </p>
                )}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white group-hover:text-[#e5b452]">
                  <span>Explore Initiative</span>
                  <span className="text-[#e50914] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.article>
          );
        })}
        </div>
      </div>
    </section>
  );
};
