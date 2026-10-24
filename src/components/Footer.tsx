import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { handleImageError } from '../utils/assets';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#07040d] py-12 px-5 sm:px-10 text-center text-xs text-[#9e9aa8]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Brand note */}
        <div className="flex items-center gap-3">
          <img
            src={portfolioData.profile.logoImage}
            onError={(e) => handleImageError(e, 'assets/faizan/alnibras-logo.jpg')}
            alt="Al Nibras Group"
            className="w-6 h-6 rounded-full object-cover ring-1 ring-[#e5b452]/40"
          />
          <span className="font-serif font-bold text-white tracking-wider uppercase text-sm">
            {portfolioData.profile.name}
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[11px] text-[#e5b452]">
            {portfolioData.profile.seriesBadge}
          </span>
        </div>

        {/* Center Legal / Motto */}
        <p className="font-mono text-[11px] tracking-widest text-[#9e9aa8] uppercase">
          INNOVATE · EMPOWER · EXECUTE · ELEVATE — &copy; {new Date().getFullYear()} AL NIBRAS GROUP
        </p>

        {/* Right Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/5"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#e50914]" />
        </button>
      </div>
    </footer>
  );
};
