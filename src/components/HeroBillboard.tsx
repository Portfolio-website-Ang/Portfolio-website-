import React from 'react';
import { motion } from 'motion/react';
import { Play, Info, Sparkles, MapPin, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { handleImageError } from '../utils/assets';

interface HeroBillboardProps {
  onPlayStory: () => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({ onPlayStory }) => {
  return (
    <section id="top" className="relative min-h-[92vh] lg:min-h-screen flex items-end overflow-hidden pb-16 sm:pb-24 pt-28">
      {/* Background Hero Image with Cinema Parallax Scale */}
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        <img
          src={portfolioData.profile.heroImage}
          onError={(e) => handleImageError(e, 'assets/faizan/faizan-hero.jpg')}
          alt={portfolioData.profile.name}
          className="h-full w-full object-cover object-[75%_25%] md:left-auto md:w-[68%] md:ml-auto"
        />
      </motion.div>

      {/* Atmospheric Gradients */}
      <div className="absolute inset-0 bg-side pointer-events-none" />
      <div className="absolute inset-0 bg-fade pointer-events-none" />

      {/* Subtle particle glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e5b452] opacity-10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Series badge */}
          <div className="flex items-center gap-2.5 text-xs tracking-[0.35em] text-[#e5b452] font-mono uppercase mb-3">
            <span className="rounded bg-[#e50914] text-white px-1.5 py-0.5 text-[10px] font-sans font-bold tracking-normal shadow-sm">
              N
            </span>
            <span>{portfolioData.profile.seriesBadge}</span>
          </div>

          {/* Series Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white font-serif leading-[1.05]">
            Syed Muhammad <br />
            <span className="text-[#e50914] drop-shadow-md">
              Faizan Gillani
            </span>
          </h1>

          {/* Streaming Metadata Bar */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-[#9e9aa8]">
            <span className="font-semibold text-[#e5b452]">
              Founder &amp; CEO, Al Nibras Group
            </span>
            <span className="text-white/30">•</span>
            <span>Full-Stack Developer &amp; Agency Lead</span>
            <span className="text-white/30">•</span>
            <span className="inline-flex items-center gap-1 text-white/80">
              <MapPin className="w-3 h-3 text-[#e50914]" />
              Lahore, PK
            </span>
            <span className="rounded border border-[#e5b452]/40 bg-black/40 px-1.5 py-0.5 text-[11px] font-mono text-[#e5b452]">
              HD 4K
            </span>
            <span className="text-emerald-400 font-medium text-xs">
              99% Match
            </span>
          </div>

          {/* Narrative Pitch */}
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#f7f4ee]/85 font-sans font-normal max-w-xl">
            {portfolioData.profile.tagline}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onPlayStory}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#0a0612] hover:bg-[#e5b452] hover:text-[#0a0612] font-semibold text-sm rounded-md transition-all duration-200 shadow-xl cursor-pointer"
              title="Play highlight reel (or press Space key)"
            >
              <Play className="w-4 h-4 fill-current text-[#e50914] group-hover:scale-110 transition-transform" />
              <span>Play Story</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/10 text-[10px] font-mono font-bold tracking-tight text-[#0a0612]/70 group-hover:bg-[#0a0612]/15">
                Space
              </kbd>
            </button>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-md backdrop-blur-md transition-all border border-white/10"
            >
              <Info className="w-4 h-4 text-[#e5b452]" />
              <span>More Info</span>
            </a>
          </div>

          {/* Social Proof Strip */}
          <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <p className="text-xl sm:text-2xl font-bold font-serif text-[#e5b452] tabular-nums">
                1,000+
              </p>
              <p className="text-xs text-[#9e9aa8]">Students Reached</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold font-serif text-white tabular-nums">
                4+
              </p>
              <p className="text-xs text-[#9e9aa8]">Shipped Platforms</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold font-serif text-[#e50914] tabular-nums">
                12+
              </p>
              <p className="text-xs text-[#9e9aa8]">Agency Capabilities</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold font-serif text-emerald-400 tabular-nums">
                100%
              </p>
              <p className="text-xs text-[#9e9aa8]">Execution &amp; Sharia</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
