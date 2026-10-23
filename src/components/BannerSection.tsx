import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const BannerSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-10 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#130d1e] shadow-2xl"
      >
        <img
          src={portfolioData.profile.bannerImage}
          alt="Al Nibras Group — empowering students across Pakistan"
          loading="lazy"
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-center brightness-90 hover:scale-102 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/60 to-transparent" />

        <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end max-w-2xl">
          <Quote className="w-8 h-8 text-[#e5b452] opacity-60 mb-2" />
          <h3 className="font-serif text-xl sm:text-3xl font-extrabold text-white leading-snug">
            &ldquo;Building tomorrow&rsquo;s entrepreneurs today — giving every ambitious student the launchpad to lead.&rdquo;
          </h3>
          <p className="mt-3 text-xs sm:text-sm font-mono text-[#e5b452] tracking-wider uppercase">
            — Syed Muhammad Faizan Gillani · Founder &amp; CEO, Al Nibras Group
          </p>
        </div>
      </motion.div>
    </section>
  );
};
