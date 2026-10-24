import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Users, Compass, TrendingUp, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { handleImageError } from '../utils/assets';

export const AboutSection: React.FC = () => {
  const pillarIcons: Record<string, React.ReactNode> = {
    Innovate: <Lightbulb className="w-5 h-5 text-[#e5b452]" />,
    Empower: <Users className="w-5 h-5 text-[#e50914]" />,
    Execute: <Compass className="w-5 h-5 text-emerald-400" />,
    Elevate: <TrendingUp className="w-5 h-5 text-[#f4d48a]" />,
  };

  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-5 sm:px-10 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: Cinematic Portrait with Ambient Aura */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="relative max-w-md mx-auto lg:max-w-none w-full"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#e50914]/30 via-[#e5b452]/20 to-transparent blur-2xl" />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#130d1e] shadow-2xl">
            <img
              src={portfolioData.profile.portraitImage}
              onError={(e) => handleImageError(e, 'assets/faizan/faizan-portrait.jpg')}
              alt={portfolioData.profile.name}
              loading="lazy"
              className="w-full aspect-square sm:aspect-[4/5] object-cover object-top hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl glass">
              <p className="font-serif font-bold text-white text-base">
                {portfolioData.profile.name}
              </p>
              <p className="text-xs text-[#e5b452] font-mono mt-0.5">
                {portfolioData.profile.headline}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: Narrative & 4 Pillars */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.4em] text-[#e5b452] uppercase font-bold">
              EPISODE 01 · ABOUT
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight">
              The Man Behind the Vision
            </h2>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-[#f7f4ee]/85 font-sans">
            {portfolioData.profile.bio}
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-[#9e9aa8]">
            {portfolioData.profile.extendedBio}
          </p>

          {/* 4 Pillars Grid */}
          <div className="pt-4">
            <h3 className="text-xs font-mono tracking-widest text-[#9e9aa8] uppercase mb-4">
              Core Principles &amp; Methodology
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioData.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-white/5 bg-[#130d1e] p-5 hover:border-[#e5b452]/40 transition-colors shadow-sm group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                      {pillarIcons[pillar.title] || <CheckCircle className="w-5 h-5 text-[#e5b452]" />}
                    </span>
                    <p className="font-serif font-bold text-lg text-white group-hover:text-[#e5b452] transition-colors">
                      {pillar.title}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9e9aa8] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
