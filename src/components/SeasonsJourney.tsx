import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Tv, Clock } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const SeasonsJourney: React.FC = () => {
  return (
    <section id="seasons" className="mx-auto max-w-7xl scroll-mt-24 px-5 sm:px-10 py-20">
      <div className="mb-10 sm:mb-12">
        <p className="font-mono text-xs tracking-[0.4em] text-[#e5b452] uppercase font-bold">
          EPISODE 02 · THE JOURNEY
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight">
            Seasons &amp; Milestones
          </h2>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9e9aa8]">
            <Clock className="w-3.5 h-3.5 text-[#e50914]" />
            <span>4 Complete Seasons · Ongoing Story</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {portfolioData.seasons.map((season, idx) => (
          <motion.div
            key={season.seasonLabel}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-[#130d1e] p-6 hover:border-[#e5b452]/40 transition-all duration-300 shadow-lg"
          >
            {/* Huge watermarked season number in background */}
            <span className="absolute -right-3 -top-6 font-serif text-8xl font-black text-[#e5b452]/8 pointer-events-none select-none transition-transform group-hover:scale-105">
              0{season.seasonNumber}
            </span>

            <div>
              {/* Season tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#e0245e] uppercase">
                  {season.seasonLabel.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-[#e5b452]/80">
                  Ep. 0{season.seasonNumber}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#e5b452] transition-colors">
                {season.title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#9e9aa8]">
                {season.description}
              </p>

              {/* Key Highlights */}
              {season.keyMilestones && (
                <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                  {season.keyMilestones.map((milestone, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2 text-xs text-[#f7f4ee]/75">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Progress Bar Footer */}
            <div className="mt-8 pt-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#9e9aa8] mb-1.5">
                <span>Progress</span>
                <span className="text-[#e5b452] font-semibold">{season.progressPercent}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#e50914] to-[#e5b452] transition-all duration-700 rounded-full"
                  style={{ width: `${season.progressPercent}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
